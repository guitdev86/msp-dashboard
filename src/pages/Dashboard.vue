<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{$t('dashboard.totalPayments')}}</h5>
                <h2 class="card-title">{{$t('dashboard.yearSummary')}}</h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: bigLineChart.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initBigChart(index)"
                           name="options" autocomplete="off"
                           :checked="bigLineChart.activeIndex === index">
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.totalPayments')}} in {{getMonth}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-coins text-primary "></i>{{totalPaymentsThisMonth()}}€</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="purple-line-chart"
                        :chart-data="purpleLineChart.chartData"
                        :gradient-colors="purpleLineChart.gradientColors"
                        :gradient-stops="purpleLineChart.gradientStops"
                        :extra-options="purpleLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.totalLessons')}} in {{getMonth}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i>{{totalLessonsThisMonth()}}</h3>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>
      <!-- <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="green-line-chart"
                        :chart-data="greenLineChart.chartData"
                        :gradient-stops="greenLineChart.gradientStops"
                        :extra-options="greenLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div> -->
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <!-- <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <base-dropdown menu-on-right=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           :class="{'float-left': isRTL}">
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card> -->
      </div>
      <div class="col-lg-0 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">{{$t('dashboard.studentSummary')}}</h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';

  export default {
    name: 'Dashboard',
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable
    },
    data() {
      return {
        bigLineChart: {
          allData: [
            [],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },

        purpleLineChart: {
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels: [],
            datasets: [{  }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },

        // greenLineChart: {
        //   extraOptions: chartConfigs.greenChartOptions,
        //   chartData: {
        //     labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
        //     datasets: [{
        //       label: "My First dataset",
        //       fill: true,
        //       borderColor: config.colors.danger,
        //       borderWidth: 2,
        //       borderDash: [],
        //       borderDashOffset: 0.0,
        //       pointBackgroundColor: config.colors.danger,
        //       pointBorderColor: 'rgba(255,255,255,0)',
        //       pointHoverBackgroundColor: config.colors.danger,
        //       pointBorderWidth: 20,
        //       pointHoverRadius: 4,
        //       pointHoverBorderWidth: 15,
        //       pointRadius: 4,
        //       data: [90, 27, 60, 12, 80],
        //     }]
        //   },
        //   gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
        //   gradientStops: [1, 0.4, 0],
        // },
        
        blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: [],
            datasets: [{ }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      },
      getMonth() {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[new Date().getMonth()];
      },

    },
    methods: {

      totalPaymentsThisMonth() {
        return this.bigLineChart.allData[0][9]//new Date().getMonth()];
      },

      totalLessonsThisMonth() {
        return this.blueBarChart.chartData.datasets[0].data.reduce((a, b) => a + b, 0);
      },    

      async fetchAllPayments() {
        const url = process.env.VUE_APP_URL + '/payments'

        const response = await fetch(url, {method: 'GET'})
                      .then(res => res.json())
                      .catch(err => console.error);

        return response;
      },

      async fetchAllLessons() {
        const url = process.env.VUE_APP_URL + '/lessons'

        const response = await fetch(url, {method: 'GET'})
                      .then(res => res.json())
                      .catch(err => console.error);

        return response;
      },

      async fetchAllStudents() {
        const url = process.env.VUE_APP_URL + '/students';

        const response = await fetch(url, {method: 'GET'})
                            .then(res => res.json())
                            .catch(err => console.error(err));

        return response;
      },
      
      async fetchPaymentsDataFromApi() {
        const payments = [];

        const response = await this.fetchAllPayments();

        const months = this.bigLineChart.chartData.labels;
        let data = [];
        let monthCounter = 0;
        months.forEach(() => {
          let amountThisMonth = 0;
          response.payments.forEach(payment => {
            if(monthCounter === Number(payment.date.split("-")[1])-1) {
              amountThisMonth += payment.paymentAmount;
            }
          })
          data.push(amountThisMonth);
          monthCounter++;
        })

        return data;
      },  

      async fetchStudentsNames() {
        
        const response = await this.fetchAllStudents();

        let names = [];      
        response.students.forEach(student => names.push(student.name + " " + student.surname));
        return names;
      },

      async fetchCurrentMonthPayments() {
        
        const paymentsList = await this.fetchAllPayments();
        const studentList = await this.fetchAllStudents();
        let currentMonth = 10; //new Date().getMonth() + 1;

        let currentMonthPayments = paymentsList.payments.filter(payment => payment.date.split('-')[1] == currentMonth);

        let paymentsSummaryByStudent = {};

        studentList.students.forEach(student => {
          let name = student.name + ' ' + student.surname;
          let totalPayments = 0;
          currentMonthPayments.forEach(payment => {
            if(payment.studentId === student._id) {
              totalPayments += payment.paymentAmount;
            }
          })
          paymentsSummaryByStudent[name] = totalPayments;
        })

        return paymentsSummaryByStudent;

      },

      async fetchCurrentMonthAttendance() {
        const lessonsList = await this.fetchAllLessons();
        const studentList = await this.fetchAllStudents();
        let currentMonth = 10;//new Date().getMonth() + 1;

        let currentMonthLessons = lessonsList.lessons.filter(lesson => lesson.date.split('-')[1] == currentMonth);

        let lessonsSummaryByStudent = {};

        studentList.students.forEach(student => {
          let name = student.name + ' ' + student.surname;
          let totalLessons = 0;
          currentMonthLessons.forEach(lesson => {
            if(lesson.studentId === student._id) {
              totalLessons += 1;
            }
          })
          lessonsSummaryByStudent[name] = totalLessons;
        })

        return lessonsSummaryByStudent;
      },

      async initPurpleChart() {

        let studentNamesAndPaymentsThisMonth = await this.fetchCurrentMonthPayments();

        let chartData = {
            labels: Object.keys(studentNamesAndPaymentsThisMonth),
            datasets: [{
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: Object.values(studentNamesAndPaymentsThisMonth),
            }]
        };
        this.purpleLineChart.chartData = chartData;
      },

      async initBlueChart() {

        let studentNamesAndLessonsThisMonth = await this.fetchCurrentMonthAttendance();

        let chartData = {
          labels: Object.keys(studentNamesAndLessonsThisMonth),
          datasets: [{
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: Object.values(studentNamesAndLessonsThisMonth),
            }]
        }

        this.blueBarChart.chartData = chartData;
      },

      async initBigChart(index, data) {

        let response = await this.fetchPaymentsDataFromApi();
        this.bigLineChart.allData[0] = response;
        
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index]
          }],
          labels: this.bigLineChart.chartData.labels,
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
        
      },

      async getDataFromUrl(url) {
        let response = await fetch(url, {method: 'GET'})
                                  .then(res => res.json())
                                  .catch(err => console.error(err));

        return response;
      },

      async getTotalPaymentsAndLessonsArray(studentId) {

        let url_payments = `${process.env.VUE_APP_URL}/students/${studentId}/total-payments`;
        let url_lessons = `${process.env.VUE_APP_URL}/students/${studentId}/total-lessons`;
        
        let totalPayments = await this.getDataFromUrl(url_payments);
        let totalLessons = await this.getDataFromUrl(url_lessons);

        return [totalPayments.totalPayments, totalLessons.totalLessons];
      },

      async getLastPayment(studentId) {
        let url = `${process.env.VUE_APP_URL}/payments`;
        
        let paymentsById = await this.getDataFromUrl(url);

        return paymentsById.payments.filter(payment => payment.studentId === studentId).reverse()[0];
      },

      async initTableData() {

        let response = await this.fetchAllStudents();

        let tableColumns = [
          "Name",
          "Last Payment",
          "Lessons Attended",
          "lessons left"
        ];

        let tableData = [];

        response.students.forEach(async student => {
          let lessonsAndPaymentsArray = await this.getTotalPaymentsAndLessonsArray(student._id);
          let getLastPayment = await this.getLastPayment(student._id);
          tableData.push({
            "id": student._id,
            "name": student.name + " " + student.surname,
            "last payment": getLastPayment.date,
            "lessons attended": lessonsAndPaymentsArray[1].total_lessons,
            "lessons left": (lessonsAndPaymentsArray[0].total_payments / student.payment_rate) - lessonsAndPaymentsArray[1].total_lessons
          })
        })
        
        this.$t('dashboard.usersTable').columns = tableColumns;
        this.$t('dashboard.usersTable').data = tableData;
      
      }
    },

    mounted() {    
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.initTableData();
      this.initBlueChart();
      this.initPurpleChart();
      this.initBigChart(0);
      
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>
