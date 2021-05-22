const state = {
  lessons: []
};

const getters = {
  allLessons: state => state.lessons
};

const actions = {
  async fetchLessons({ commit }) {
    const response = await fetch(`${process.env.VUE_APP_URL}/lessons`, {
      method: "GET"
    }).then(res => res.json());
    commit("setLessons", response.lessons);
  },

  async deleteLesson({}, id) {
    await fetch(`${process.env.VUE_APP_URL}/lessons/${id}`, {
      method: "DELETE"
    });
  },

  async updateLesson({ commit }, lesson) {
    const url = `${process.env.VUE_APP_URL}/lessons/${lesson.id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lesson: lesson.payload })
    }).then(res => res.json());

    commit("updatePayment", response);
  }
};

const mutations = {
  setLessons: (state, lessons) => (state.lessons = lessons),
  updateLesson: (state, lesson) =>
    state.lessons.forEach(element => {
      if (element._id === lesson._id) {
        element.date = payment.date;
        element.lessonLength = payment.lessonLength;
      }
    })
};

export default {
  state,
  getters,
  actions,
  mutations
};
