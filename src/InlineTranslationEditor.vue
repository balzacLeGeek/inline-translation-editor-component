<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

const TYPE_STRING = "string";
const TYPE_TEXT = "text";

export default {
  name: "InlineTranslationEditor",
  props: {
    transKey: {
      type: String,
      default: null,
    },
    transDomain: {
      type: String,
      default: null,
    },
    transValue: {
      type: String,
      default: null,
    },
    transLocale: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: TYPE_STRING,
    },
  },
  data: () => {
    return {
      TYPE_STRING,
      TYPE_TEXT,
      pageX: 0,
      pageY: 0,
      showEditor: false,
      showErrorHelper: false,
    };
  },
  computed: {
    editContainerStyle() {
      return {
        top: `${this.pageY}px`,
        left: `${this.pageX}px`,
      };
    },
    getUpdateMessage() {
      return this.getError ?? this.getSuccess;
    },
    ...mapGetters("InlineTranslationEditorStore", [
      "isLoading",
      "hasError",
      "getError",
      "getSuccess",
      "isSuccess",
    ]),
  },
  created: function () {
    window.addEventListener("click", this.onWindowClick);
  },
  methods: {
    ...mapActions("InlineTranslationEditorStore", ["updateKeyValue"]),
    editTranslation(event) {
      this.showEditor = !this.showEditor;

      if (!this.showEditor) {
        return;
      }

      this.pageX = event.clientX;
      this.pageY = event.clientY + 25;
    },
    closeEditor() {
      this.showEditor = false;
    },
    async updateTranslation() {
      if (this.transValue === "") {
        this.showErrorHelper = true;

        return;
      }

      await this.$store.dispatch(
        "InlineTranslationEditorStore/updateKeyValue",
        {
          transKey: this.transKey,
          transDomain: this.transDomain,
          transValue: this.transValue,
          transLocale: this.transLocale,
        }
      );
    },
    /* onWindowClick(event) {
      const elementClassList = event.target.classList;

      console.log(elementClassList);

      if (
        this.showEditor &&
        (elementClassList.contains("edit-container") ||
          elementClassList.contains("editable-preview"))
      ) {
        this.showEditor = false;
      }
    }, */
  },
};
</script>

<template>
  <div>
    <span class="editable-preview">{{ transValue }}</span
    ><span
      class="editable-mark"
      :class="{ editing: showEditor }"
      @click="editTranslation"
    ></span>
    <transition name="fade">
      <div
        class="edit-container"
        v-show="showEditor"
        :style="editContainerStyle"
      >
        <form @submit.prevent @submit="updateTranslation">
          <div class="mb-3">
            <label for="transDomain" class="form-label"
              >Domaine de traduction</label
            >
            <input
              type="text"
              id="transDomain"
              class="form-control"
              :value="transDomain"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="transKey" class="form-label">Clé de traduction</label>
            <input
              type="text"
              id="transKey"
              class="form-control"
              :value="transKey"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="transLocale" class="form-label">Langue</label>
            <input
              type="text"
              id="transLocale"
              class="form-control"
              :value="transLocale"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="transValue" class="form-label">Valeur</label>
            <input
              type="text"
              id="transValue"
              class="form-control"
              aria-describedby="transKeyHelp"
              v-if="type === TYPE_STRING"
              :value="transValue"
            />
            <textarea
              id="transValue"
              class="form-control"
              rows="5"
              v-else
              :value="transValue"
            ></textarea>
            <div
              v-if="showErrorHelper"
              id="transValueHelper"
              class="field-helper form-text"
            >
              Veuillez remplir ce champ s'il vous plaît
            </div>
            <div
              v-if="!isLoading && (hasError || isSuccess)"
              id="transValueHelper"
              class="field-helper form-text"
              :class="{ error: hasError, success: isSuccess }"
            >
              {{ getUpdateMessage }}
            </div>
          </div>
          <div class="md-3 d-flex justify-content-around">
            <button class="btn btn-secondary" @click="closeEditor">
              Annuler
            </button>
            <button type="submit" class="btn btn-primary">Mettre à jour</button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editable-preview,
.editable-mark {
  cursor: pointer;
}

.editable-mark:before {
  content: "🖊️";
  font-size: 15px;
  position: relative;
  top: -20px;
  left: 5px;
  opacity: 0.5;
  transition: all linear 0.3s;
  background: #ffffff;
  border-radius: 50%;
  padding: 5px;
}

.editable-mark.editing:before {
  opacity: 1;
  transition: all linear 0.3s;
  background: #698ddc;
}

.edit-container {
  z-index: 20000;
  position: absolute;
  width: 300px;
  height: auto;
  border: 1px solid #d6dde3;
  border-radius: 5px;
  background: #ffffff;
  padding: 10px;
  font-size: 12px;

  -webkit-box-shadow: 2px 7px 33px -12px rgba(204, 204, 204, 1);
  -moz-box-shadow: 2px 7px 33px -12px rgba(204, 204, 204, 1);
  box-shadow: 2px 7px 33px -12px rgba(204, 204, 204, 1);
}
</style>
