import lessonForm from '../pages/LessonsAndPayments/AddLessonForm'
import { shallowMount } from "@vue/test-utils";
import { assert, expect } from "chai";

let component = shallowMount(lessonForm);

describe("Testing AddLessonForm methods", () => {

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
})