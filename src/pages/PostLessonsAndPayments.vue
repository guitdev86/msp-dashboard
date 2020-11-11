<template>
  <div class="row">
    <div class="col-md-8">
      <add-payment-form :model="model">
      </add-payment-form>
      <add-lesson-form :model="model">
      </add-lesson-form>
    </div>
    <div class="col-md-4">
      <student-list :user="user" 
                    v-on:studentSelected="readData" 
                    v-on:studentList="printStudentList"
                    >
      </student-list>
    </div>
  </div>
</template>
<script>
  import AddPaymentForm from './LessonsAndPayments/AddPaymentForm';
  import AddLessonForm from './LessonsAndPayments/AddLessonForm';
  import StudentList from './LessonsAndPayments/StudentList';

  export default {
    name: 'AddPaymentLesson',
    components: {
      AddPaymentForm,
      AddLessonForm,
      StudentList
    },
    methods: {

      printStudentList(studentList) {
        this.studentList = studentList;
      },
           
      readData(data) {
        this.model.firstName = data.split(' ')[0];
        this.model.lastName = data.split(' ')[1];
        this.model.studentId = this.studentList.filter(student => student.name === data)[0].id;
      }
    },
    data() {
      return {
        studentList: [],
        model: {
          studentId: '',
          firstName: '',
          lastName: '',
          lessonDate: '',
          paymentDate: '',
          paymentAmount: ''
        }
      }
    }
  }
</script>
<style>
</style>
