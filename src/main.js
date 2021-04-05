import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import './styles/Main.scss';

import InlineTranslationEditor from './InlineTranslationEditor';
import InlineTranslationEditorStore from './store/InlineTranslationEditorStore';

// Globally register your component
// Vue.component('inline-translation-editor', InlineTranslationEditor);

if (document.body.classList.contains('translation-editable')) {
	console.log(InlineTranslationEditor);
	console.log(InlineTranslationEditorStore);

	Vue.use(Vuex);

	const store = new Vuex.Store({
		modules: {
			InlineTranslationEditorStore
		}
	});

	new Vue({
		store,
		components: {
			InlineTranslationEditor
		},
		delimiters: [ '${', '}' ]
	}).$mount('#ite');
}
