<template>
  <div class="row">
    <div class="col-md-8">
      <edit-student-form :model="model" @student-submit="saveStudentToDatabase">
      </edit-student-form>
    </div>
  </div>
</template>
<script>
  import EditStudentForm from './StudentProfile/EditStudentForm';
  import FillNameNotification from "@/pages/Notifications/FillNameNotification";
  import FillPaymentRateNotification from "@/pages/Notifications/FillPaymentRateNotification";
  import StudentAlreadyExistsNotification from "@/pages/Notifications/StudentAlreadyExistsNotification";
  import NewStudentSubmitNotification from "@/pages/Notifications/NewStudentSubmitNotification";

  export default {
    name: 'StudentProfile',
    components: {
      EditStudentForm
    },
    methods: {
      async sendStudentData(data) {
        const url = `${process.env.VUE_APP_URL}/students`;

        const method = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };

        return await fetch(url, method);
      },

      isFilled(text) {
        return !!text;
      },

      async studentExists(name, surname) {
        const url = `${process.env.VUE_APP_URL}/name?name=${name}&surname=${surname}`;

        let student = await fetch(url).then(res => res.json());

        console.log(student);
        console.log(!!student.student);

        return !!student;
      },

      saveStudentToDatabase() {
        let studentName = this.model.firstName;
        let studentSurname = this.model.lastName;
        let paymentRate = this.model.paymentRate;

        if(!this.isFilled(studentName) || !this.isFilled(studentSurname)) {

          this.notifyVue(FillNameNotification, 4);

        } else if (!this.isFilled(paymentRate)) {

          this.notifyVue(FillPaymentRateNotification, 4);

        } else if (!this.studentExists(studentName, studentSurname)) {

          this.notifyVue(StudentAlreadyExistsNotification, 4);

        } else {
          let student = {
            name: this.model.firstName,
            surname: this.model.lastName,
            payment_rate: this.model.paymentRate
          }

          this.sendStudentData({student});
          this.notifyVue(NewStudentSubmitNotification,2);
        }

      },

      notifyVue(component, notificationIndex) {
        this.$notify({
          component: component,
          icon: "tim-icons icon-bell-55",
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: this.notificationType[notificationIndex],
          timeout: 3000
        });
      }
    },
    data() {
      return {
        model: {
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          address: '',
          paymentRate: String,
          instrument: String
        },
        notificationType: ["", "info", "success", "warning", "danger"]
      }
    }
  }
</script>
<style>
</style>
