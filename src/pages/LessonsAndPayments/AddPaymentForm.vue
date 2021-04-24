<template>
  <card>
    <h5 slot="header" class="title">Add Payment</h5>
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
                    typeable="true"
                    monday-first="true"
                    placeholder="Enter Date"
                    v-model="model.paymentDate">
                    </datepicker>
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <!-- <base-input label="Payment Amount"
                  v-model="model.paymentAmount"
                  placeholder="Enter Payment Amount"
                  > -->
        <label for="amount">Payment Amount</label>
        <select class="form-control" name="amount" v-model="model.paymentAmount">
                                <option value="15">15 Eur</option>
                                <option value="20">20 Eur</option>
                                <option value="25">25 Eur</option>
                                <option value="30">30 Eur</option>
                                <option value="35">35 Eur</option>
                                <option value="40">40 Eur</option>
                                <option value="45">45 Eur</option>
                                <option value="50">50 Eur</option>
                                <option value="55">55 Eur</option>
                                <option value="60">60 Eur</option>
        </select>
      </div>
    </div>
    <base-button slot="footer" type="primary" fill @click="savePaymentToDatabase()">Save</base-button>
  </card>
</template>
<script>
  import FillDateOrPaymentNotification from '../Notifications/FillDateOrPaymentNotification'
  import FillNameNotification from '../Notifications/FillNameNotification'
  import NewPaymentSubmitNotification from '../Notifications/NewPaymentSubmitNotification'
  import ServerErrorNotification from '../Notifications/ServerErrorNotification'

  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';

  export default {
    name: 'AddPaymentForm',
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

      isValidYear(date) {
        const currentYear = new Date().getFullYear();
        return currentYear <= Number(date.split('-')[0]) && currentYear > Number(date.split('-')[0]) - 1;
      },

      async sendPaymentData(data) {
        const url = `${process.env.VUE_APP_URL}/payments`

        const method = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };

        const response = await fetch(url, method);

        return response;
      },

      async savePaymentToDatabase() {
        const studentId = this.model.studentId;
        const firstName = this.model.firstName;
        const paymentAmount = this.model.paymentAmount;
        const date = this.formatDate(this.model.paymentDate);

        const data = {
          payment: {
            student_id: studentId,
            date: date,
            payment_amount: paymentAmount
          }
        };

        if(!this.isFilled(firstName)) {
          this.notifyVue(FillNameNotification, 4);
        } else if (!this.isFilled(this.model.paymentAmount) || !this.isValidYear(date) ) {
          this.notifyVue(FillDateOrPaymentNotification, 4);
        } else {
          const response = await this.sendPaymentData(data)
                                .then(res => {
                                  if(res.status == '201') {
                                    this.notifyVue(NewPaymentSubmitNotification, 2);
                                  } else {
                                    this.notifyVue(ServerErrorNotification, 4);
                                  }
                                });
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
