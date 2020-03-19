import Api from '@/Api';

const state = {
    file: null, // Current uploaded file
    extension: null,
    loading: false,
};

const getters = {};

const actions = {
    analyze({commit}, file) {
        commit('loading');
        var formData = new FormData();
        formData.append("file", file);
        formData.append("subscription_key", "d1097c4c28ba4b09accd006d1162ad78");

        return Api.post(`/analyze`, formData)
        .then(res => {
            commit('loaded');
            return { succeed: true, result: res.data.result };
        })
        .catch(err => {
            commit('loaded');
            return { succeed: false, message: err.message || 'Unknown Error Occured.'};
        })
    },
};

const mutations = {
    loading(state) {
        state.loading = true;
    },
    loaded(state) {
        state.loading = false;
    },
    updateDocument(state, result) {
        state.file = result;
    },
    updateExtension(state, result) {
        state.extension = result;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
