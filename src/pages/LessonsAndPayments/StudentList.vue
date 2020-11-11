<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <student-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary"
                        @studentSelected="selectStudent">
            </student-table>
          </div>
        </card>
      </div>

    </div>
</template>
<script>
import StudentTable from "../../components/StudentTable";

export default {
  components: {
    StudentTable
  },
  methods: {
    selectStudent: function(name) {
      this.$emit('studentSelected', name);
    },
    async fetchStudentsList() {
      const  url = `${process.env.VUE_APP_URL}/students`

      const response = await fetch(url, {method: 'GET'})
                        .then(res => res.json())
                        .catch(err => console.error(err));

      return response;
    },

    async fillTable() {
      const studentList = await this.fetchStudentsList();

      const nameList = await studentList.students.map(student => Object.create(student, {
          id: {value: student._id},
          name: {value: student.name + " " + student.surname}
        }));

      return nameList;
    }

  },

  async mounted() {
    const tableData = await this.fillTable();
    this.table1.data = tableData;
    this.$emit('studentList', tableData);
  },

  data() {
    return {
      table1: {
        title: "Current Students",
        columns: ["Name"],
        data: []
      }
    };
  }
};
</script>
<style>
</style>
