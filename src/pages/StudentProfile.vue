<template>
  <div class="row">
    <div class="col-md-8">
      <edit-student-form :model="model">
      </edit-student-form>
    </div>
  </div>
</template>
<script>
  import EditStudentForm from './StudentProfile/EditStudentForm';
  export default {
    name: 'StudentProfile',
    components: {
      EditStudentForm
    },
    data() {
      return {
        model: {
          firstName: '',
          lastName: '',
          address: '',
          paymentRate: String,
          instrument: String
        }
      }
    }
  }
</script>
<style>
</style>
