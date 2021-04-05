import TranslationApi from './../api/TranslationApi';

export default {
	namespaced: true,
	state: {
		isLoading: false,
		error: null,
		success: null
	},
	getters: {
		isLoading: (state) => state.isLoading,
		hasError: (state) => state.error !== null,
		getError: (state) => state.error,
		getSuccess: (state) => state.success,
		isSuccess: (state) => state.success !== null
	},
	mutations: {
		['TRANSLATION_UPDATING'](state) {
			state.isLoading = true;
			state.error = null;
			state.success = null;
		},
		['TRANSLATION_UPDATING_SUCCESS'](state, message) {
			state.isLoading = false;
			state.error = null;
			state.success = message;
		},
		['TRANSLATION_UPDATING_ERROR'](state, message) {
			state.isLoading = false;
			state.error = message;
			state.success = null;
		}
	},
	actions: {
		async updateKeyValue({ commit }, params) {
			commit('TRANSLATION_UPDATING');

			try {
				let response = await TranslationApi.updateKeyValue(params);

				const { data } = response.data;

				console.log(data);

				commit('TRANSLATION_UPDATING_SUCCESS', 'Màj Success');
			} catch (e) {
				const { response } = e;

				console.log(response);

				commit('TRANSLATION_UPDATING_ERROR', 'Màj Error');
			}
		}
	}
};
