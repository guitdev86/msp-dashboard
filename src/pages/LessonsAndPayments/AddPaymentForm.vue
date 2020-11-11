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
        <base-input label="Payment Amount"
                  v-model="model.lastName"
                  placeholder="Last Name"
                  >
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" fill>Save</base-button>
  </card>
</template>
<script>
  import Datepicker from 'vuejs-datepicker';
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
    }
  }
</script>
<style>
</style>
