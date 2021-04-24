const state = {
    payments: []
};

const getters = {
    allPayments: (state) => state.payments
};

const actions = {
    async fetchPayments({commit}) {
        const response = await fetch(`${process.env.VUE_APP_URL}payments`, {method: 'GET'})
                            .then(res => res.json());
        commit('setPayments', response.payments);
    },

    async deletePayment(id) {
        await fetch(`${process.env.VUE_APP_URL}payments/${id}`, {method: 'DELETE'});
    }
};

const mutations = {
    setPayments: (state, payments) => state.payments = payments
};

export default {
    state,
    getters,
    actions,
    mutations
}