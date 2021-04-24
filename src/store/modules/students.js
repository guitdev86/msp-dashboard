const state = {
    students: []
};

const getters = {
    allStudents: (state) => state.students
};

const actions = {
    async fetchStudents({commit}) {
        const response = await fetch(`${process.env.VUE_APP_URL}/students`, {method: 'GET'})
                            .then(res => res.json());
        commit('setStudents', response.students);
    }
};

const mutations = {
    setStudents: (state, students) => state.students = students
};

export default {
    state,
    getters,
    actions,
    mutations
}