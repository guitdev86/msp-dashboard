import studentManagementForm from '../pages/ManageStudentsForm'
import { shallowMount } from "@vue/test-utils";
import { assert, expect } from "chai";

let component = shallowMount(studentManagementForm);

describe("Testing ManageStudentForm component methods", () => {
    it("isFilled('sample text') should return true", () => {
        assert.isTrue(component.vm.isFilled('sample text'));
    });

    it("isFilled('') should return false", () => {
        assert.isFalse(component.vm.isFilled(''));
    });

    it("isLetter('abcd') should return true", () => {
        assert.isTrue(component.vm.isLetter('abcd'));
    })

    it("isLetter('abcd1') should return false", () => {
        assert.isFalse(component.vm.isLetter('abcd1'));
    })

    it("isLetter('/1abcd1?') should return false", () => {
        assert.isFalse(component.vm.isLetter('/1abcd1?'));
    })

    it("isNumber('12') should return true", () => {
        assert.isTrue(component.vm.isNumber('12'));
    })

    it("isNumber('abc') should return false", () => {
        assert.isFalse(component.vm.isNumber('abc'));
    })

    it("isNumber('abc1') should return false", () => {
        assert.isFalse(component.vm.isNumber('abc1'));
    })

});