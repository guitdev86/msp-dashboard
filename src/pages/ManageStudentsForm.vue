<template>
  <div class="row">
    <div class="col-md-8">
      <task-list @edit-finished="editTableDataObject"></task-list>
      <div class="">
        <base-button slot="footer" type="primary" fill @click="saveChangesToDb"
          >Save</base-button
        >
        <base-button class="ml-2" slot="footer" type="primary" fill
          >Delete</base-button
        >
      </div>
    </div>
    <div class="col-md-4">
      <student-list
        v-on:studentSelected="readData"
        v-on:studentList="printStudentList"
      >
      </student-list>
    </div>
  </div>
</template>
<script>
import StudentList from "./LessonsAndPayments/StudentList";
import TaskList from "./Dashboard/TaskList";
import EmptyFieldNotification from "./Notifications/EmptyFieldNotification";
import InvalidSymbolsNotification from "./Notifications/InvalidSymbolsNotification";
import InformationSuccessfullySavedNotification from "./Notifications/InformationSuccessfullySavedNotification";
import FinishEditingNotification from "./Notifications/FinishEditingNotification";
import ServerErrorNotification from "./Notifications/ServerErrorNotification";

export default {
  name: "ManageStudentForm",
  components: {
    StudentList,
    TaskList,
    EmptyFieldNotification,
    InvalidSymbolsNotification,
    InformationSuccessfullySavedNotification,
    FinishEditingNotification,
    ServerErrorNotification,
  },
  methods: {
    printStudentList(studentList) {
      this.studentList = studentList;
    },

    editTableDataObject(string, line) {
      if (line === "First Name") {
        this.model.firstName = string;
      } else if (line === "Last Name") {
        this.model.lastName = string;
      } else if (line === "Hourly Rate") {
        this.model.hourlyRate = string;
      }

      this.tableData.forEach((element) => {
        if (element.title === line) {
          element.description = string;
        }
      });
    },

    isFilled(text) {
      return text ? true : false;
    },

    isLetter(text) {
      return !/[^a-zA-Zą-ž]/.test(text);
    },

    isNumber(number) {
      return /^\d+$/.test(number);
    },

    editIsFinished() {
      let paragraphContainers = this.$children[0].$children[0].$children;
      let componentsNames = [];
      let isFinished = true;

      paragraphContainers.forEach((paragraphContainer) =>
        paragraphContainer.$children.forEach((container) =>
          componentsNames.push(container.$vnode.tag)
        )
      );

      componentsNames.forEach((name) => {
        if (name.includes("EditLine")) {
          isFinished = false;
        }
      });

      return isFinished;
    },

    async updateStudentInDatabase(id, student) {
      let url = `${process.env.VUE_APP_URL}/students/${id}`;

      const method = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student: student }),
      };

      let response = await fetch(url, method);

      return response;
    },

    async saveChangesToDb() {
      let firstName = this.model.firstName;
      let lastName = this.model.lastName;
      let studentId = this.model.studentId;
      let hourlyRate = this.model.hourlyRate;

      if (
        !this.isFilled(firstName) ||
        !this.isFilled(lastName) ||
        !this.isFilled(hourlyRate)
      ) {
        this.notifyVue(EmptyFieldNotification, 4);
      } else if (
        !this.isLetter(firstName) ||
        !this.isLetter(lastName) ||
        !this.isNumber(hourlyRate)
      ) {
        this.notifyVue(InvalidSymbolsNotification, 4);
      } else if (!this.editIsFinished()) {
        this.notifyVue(FinishEditingNotification, 4);
      } else {
        let response = await this.updateStudentInDatabase(studentId, {
          name: this.model.firstName,
          surname: this.model.lastName,
          payment_rate: this.model.hourlyRate,
        });

        if (response.status === 500) {
          this.notifyVue(ServerErrorNotification, 4);
        } else {
          this.notifyVue(InformationSuccessfullySavedNotification, 2);
        }
      }
    },

    async getStudentObject(firstName, lastName) {
      let url = `${process.env.VUE_APP_URL}/name?name=${firstName}&surname=${lastName}`;

      let response = await fetch(url, { method: "GET" }).then((res) =>
        res.json()
      );

      return response;
    },

    async readData(data) {
      this.model.firstName = data.split(" ")[0];
      this.model.lastName = data.split(" ")[1];
      this.model.studentId = this.studentList.filter(
        (student) => student.name === data
      )[0].id;

      let studentObject = await this.getStudentObject(
        this.model.firstName,
        this.model.lastName
      );

      let tableData = [
        {
          title: "First Name",
          description: studentObject.student.name,
        },
        {
          title: "Last Name",
          description: studentObject.student.surname,
        },
        {
          title: "Hourly Rate",
          description: studentObject.student.payment_rate,
        },
      ];

      this.model.hourlyRate = studentObject.student.payment_rate;

      this.$t("dashboard.manageInfo").length = 0;
      tableData.forEach((element) =>
        this.$t("dashboard.manageInfo").push(element)
      );
      this.tableData = tableData;
    },

    notifyVue(component, notificationType) {
      this.$notify({
        component: component,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: this.notificationType[notificationType],
        timeout: 3000,
      });
    },
  },
  data() {
    return {
      studentList: [],
      tableData: [],
      model: {
        studentId: "",
        firstName: "",
        hourlyRate: "",
        lastName: "",
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
</style>
