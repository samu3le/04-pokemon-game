import { shallowMount } from "@vue/test-utils";
import App from "@/App";

describe("App", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(App);
    });

    test("Debe de coincidir con el snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});