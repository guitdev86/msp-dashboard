<template>
  <card>
    <h5 slot="header" class="title">Add Lesson</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="First Name"
                  v-model="model.firstName"
                  placeholder="First Name"
                  disabled>
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="Last Name"
                  v-model="model.lastName"
                  placeholder="Last Name"
                  disabled>
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="Date">
        <datepicker input-class="form-control"
                    calendar-class="calendar"
                    typeable="true"
                    monday-first=true
                    placeholder="Enter Date"
                    v-model="model.lessonDate">
                    </datepicker>
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" fill @click="saveLessonToDataBase()">Save</base-button>
  </card>
</template>
<script>
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';
  import FillNameNotification from '../Notifications/FillNameNotification'
  import FillLessonDateNotification from '../Notifications/FillLessonDateNotification';
  import NewPaymentSubmitNotification from '../Notifications/NewPaymentSubmitNotification';
  import NewLessonSubmitNotification from '../Notifications/NewLessonSubmitNotification';

  export default {
    name: 'AddLessonForm',
    components: {
      Datepicker
    },
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    methods: {
      formatDate(date) {
        return moment(date).format('YYYY-MM-DD');
      },

      isFilled(text) {
        return text ? true : false;
      },

      async sendLessonData(data) {
        const url = `${process.env.VUE_APP_URL}/lessons`

        const method = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };

        const confirmation = await fetch(url, method)
          .then(res => res.json());
      },

      saveLessonToDataBase() {
        const studentId = this.model.studentId;
        const firstName = this.model.firstName;
        const lastName = this.model.lastName;
        const date = this.formatDate(this.model.lessonDate);

        const data = {
          lesson: {
            student_id: studentId,
            date: date,
            lesson_length: 45
          }
        };

        

        if(!this.isFilled(firstName)) {
          this.notifyVue(FillNameNotification, 4);
        } else if (!this.isFilled(this.model.lessonDate)) {
          this.notifyVue(FillLessonDateNotification, 4);
        } else {
          this.notifyVue(NewLessonSubmitNotification, 2);
          console.log(data);
        }
      },

      notifyVue(component, notificationType) {
        this.$notify({
          component: component,
          icon: "tim-icons icon-bell-55",
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: this.notificationType[notificationType],
          timeout: 3000
        });
      }
    },
    data() {
      return {
        notificationType: ["", "info", "success", "warning", "danger"],
        notifications: {
          topCenter: false
        }
      };
    }
  }
</script>
<style>
</style>
