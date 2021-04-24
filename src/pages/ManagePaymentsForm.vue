<template>
  <div class="row">
    <div class="col-md-8">
      <table>
        <thead>
          <tr class="payment-header">
            <td>Name</td>
            <td>Payment Date</td>
            <td>Payment Amount</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          <table-line-container
            v-for="payment in this.paymentsList"
            :key="payment._id"
            :payment="payment"
            @delete-payment="deletePaymentById"
            @edit-finished="editPaymentById"
          ></table-line-container>
        </tbody>
      </table>
    </div>
    <div class="col-md-4">
      <student-list
        v-on:studentSelected="filterStudentData"
        v-on:studentList="printStudentList"
      >
      </student-list>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import PaymentDeletedNotification from "./Notifications/PaymentDeletedNotification";
import PaymentUpdatedNotification from "./Notifications/PaymentUpdatedNotification";
import PaymentHasMissingFieldsNotification from "./Notifications/PaymentHasMissingFieldsNotification";

import StudentList from "./LessonsAndPayments/StudentList";
import TableLineContainer from "./Dashboard/TableLineContainer";

export default {
  name: "ManageLessonPayment",
  components: {
    StudentList,
    PaymentDeletedNotification,
    TableLineContainer,
  },
  computed: mapGetters(["allPayments", "allStudents"]),
  methods: {
    ...mapActions([
      "fetchPayments",
      "fetchStudents",
      "deletePayment",
      "updatePayment",
    ]),

    printStudentList(studentList) {
      this.studentList = studentList;
    },

    filterStudentData(name) {
      this.paymentsList = this.allPayments;
      this.model.studentId = this.studentList.filter(
        (student) => student.name === name
      )[0].id;
      this.paymentsList = this.paymentsList.filter(
        (student) => student.studentId === this.model.studentId
      );
    },

    deletePaymentById(id) {
      //this.deletePayment(id);
      this.fetchPayments();
      this.paymentsList = this.paymentsList.filter(
        (payment) => payment._id !== id
      );
      this.notifyVue(PaymentDeletedNotification, 2);
    },

    editPaymentById(data) {
      const payment = {
        id: data._id,
        payload: {
          student_id: data.studentId,
          date: data.date,
          payment_amount: Number(data.paymentAmount),
        },
      };

      console.log(data);

      if (payment.payload.payment_amount && payment.payload.date) {
        this.updatePayment(payment);
        this.notifyVue(PaymentUpdatedNotification, 2);
      } else {
        this.notifyVue(PaymentHasMissingFieldsNotification, 4);
      }
    },

    notifyVue(component, notificationType) {
      this.$notify({
        component: component,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: this.notificationType[notificationType],
        timeout: 2000,
      });
    },
  },
  async created() {
    await this.fetchPayments();
    await this.fetchStudents();
    this.paymentsList = this.allPayments;
  },
  data() {
    return {
      paymentsList: [],
      model: {
        studentId: "",
      },
      notificationType: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false,
      },
    };
  },
};
</script>
<style>
table {
  width: 100%;
}

.payment-header td {
  color: #c8cdd1;
  font-weight: 600;
  padding: 15px 0;
}

.payment-row,
.payment-header td {
  border-top: 1px solid #3c4247;
}

.payment {
  display: flex;
  padding: 20px 0px;
  color: #6c757d;
}

.edit-btn:hover,
.delete-btn:hover {
  color: white;
  cursor: pointer;
}
</style>
