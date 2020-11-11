<template>
  <card>
    <h5 slot="header" class="title">Register New Student</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="First Name"
                  v-model="model.firstName"
                  placeholder="First Name">
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="Last Name"
                  v-model="model.lastName"
                  placeholder="Last Name">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <base-input label="Address"
                  v-model="model.address"
                  placeholder="Home Address">
        </base-input>
      </div>
      <div class="col-md-4">
        <base-input label="Email address"
                  type="email"
                  v-model="model.email"
                  placeholder="mike@email.com">
        </base-input>
      </div>
      <div class="col-md-4">
        <base-input label="Phone Number"
                  type="mobile"
                  v-model="model.mobile"
                  placeholder="+3706xxxxxxx">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <label for="select">Payment Rate</label>
        <select class="form-control" v-model="model.paymentRate">
                  <option value="15" selected>15 EUR / hour</option>
                  <option value="20">20 EUR / hour</option>
                  <option value="25">25 EUR / hour</option>
        </select>
      </div>
      <div class="col-md-6 pr-md-1">
        <label for="select">Instrument</label>
        <select class="form-control" v-model="model.instrument">
                  <option selected value="classical">Classical Guitar</option>
                  <option value="electric">Electric Guitar</option>
                  <option value="acoustic">Acoustic Guitar</option>
        </select>
      </div>
    </div>
    <base-button slot="footer" type="primary" fill>Save</base-button>
  </card>
</template>
<script>
  export default {
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
  option {
    background-color: #1e1e2f;
  }

  select {
    background-color: chartreuse;
  }
</style>
