const state = {
  payments: []
};

const getters = {
  allPayments: state => state.payments
};

const actions = {
  async fetchPayments({ commit }) {
    const response = await fetch(`${process.env.VUE_APP_URL}/payments`, {
      method: "GET"
    }).then(res => res.json());
    commit("setPayments", response.payments);
  },

  async deletePayment({}, id) {
    await fetch(`${process.env.VUE_APP_URL}/payments/${id}`, {
      method: "DELETE"
    });
  },

  async updatePayment({ commit }, payment) {
    const url = `${process.env.VUE_APP_URL}/payments/${payment.id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ payment: payment.payload })
    }).then(res => res.json());

    commit("updatePayment", response);
  }
};

const mutations = {
  setPayments: (state, payments) => (state.payments = payments),
  updatePayment: (state, payment) =>
    state.payments.forEach(element => {
      if (element._id === payment._id) {
        element.date = payment.date;
        element.paymentAmount = payment.paymentAmount;
      }
    })
};

export default {
  state,
  getters,
  actions,
  mutations
};
