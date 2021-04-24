import paymentForm from '../pages/LessonsAndPayments/AddLessonForm'
import { shallowMount } from "@vue/test-utils";
import { assert, expect } from "chai";

let component = shallowMount(paymentForm);

describe("Testing AddLessonForm methods", () => {
    it("formatDate() to be a function", () => {
        expect(component.vm.formatDate).to.be.a("function");
    });

    it("formatDate('Thu Nov 12 2020 11:58:05 GMT+0200 (Eastern European Standard Time)') should return '2020-11-12'", () => {
        assert.equal(component.vm.formatDate('Thu Nov 12 2020 11:58:05 GMT+0200 (Eastern European Standard Time)'), '2020-11-12');
    });

    it("isFilled('sample text') should return true", () => {
        assert.isTrue(component.vm.isFilled('sample text'));
    });

    it("isFilled('') should return false", () => {
        assert.isFalse(component.vm.isFilled(''));
    });

    it("isValidYear() to be a function", () => {
        expect(component.vm.isValidYear).to.be.a("function");
    });

    it("isValidYear('2020-10-10') should return true", () => {
        assert.isTrue(component.vm.isValidYear('2020-10-10'));
    });

    it("isValidYear('2017-10-10') should return false", () => {
        assert.isFalse(component.vm.isValidYear('2017-10-10'));
    });

    it("isValidYear('2021-10-10') should return false", () => {
        assert.isFalse(component.vm.isValidYear('2017-10-10'));
    });


});