<template>
    <tr class="payment-row">
        <td><div class="payment">{{getStudentNameById(payment.studentId)}}</div></td>
        <td><div class="payment"><list-paragraph-container :paragraphText="payment.date" :currentTabProp="currentTab" @edit-finished="switchToTextFromDate"></list-paragraph-container></div></td>
        <td><div class="payment"><list-paragraph-container :paragraphText="payment.paymentAmount" :currentTabProp="currentTab" @edit-finished="switchToTextFromPayment"></list-paragraph-container></div></td>            
        <td><i class="tim-icons icon-pencil edit-btn" @click="changeToEdit()"></i></td>
        <td><i class="tim-icons icon-trash-simple delete-btn" @click="$emit('delete-payment', payment._id)"></i></td>
    </tr>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import ListParagraphContainer from './ListParagraphContainer';

export default {
    name: 'TableLineContainer',
    components: {
      ListParagraphContainer
    },
    computed: mapGetters(['allStudents']),
    props: ['payment'],
    methods: {

        getStudentNameById(id) {
            let student = this.allStudents.filter(student => student._id === id)[0];
            if(student !== undefined) {
                return student.name + ' ' + student.surname;
            } else {
                return "! Deleted Student"
            }
        },

        changeToEdit() {
            return this.currentTab = 'EditLine'
        },

        switchToTextFromDate(date) {
            let updatedPayment = { 
                id: this.payment._id,
                studentId: this.payment.studentId,
                date,
                paymentAmount: this.payment.paymentAmount
                }
            this.$emit('edit-finished', updatedPayment);
            return this.currentTab = 'TextLine'
        },

        switchToTextFromPayment(paymentAmount) {
            let updatedPayment = { 
                _id: this.payment._id,
                studentId: this.payment.studentId,
                date: this.payment.date,
                paymentAmount
                }
            this.$emit('edit-finished', updatedPayment);
            return this.currentTab = 'TextLine'
        }

    },
    data() {
        return {
            currentTab: 'TextLine'
        }
    }
}
</script>

<style>

</style>