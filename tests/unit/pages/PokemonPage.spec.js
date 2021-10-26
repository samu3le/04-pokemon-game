import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pockemons.mock";

describe("PokemonPage Component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage);
    });

    test("debe de hacer match con el snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("debe de llamar mixPokemonArray al montar", () => {
        const mixPokemonArraySpy = jest.spyOn(
            PokemonPage.methods,
            "mixPokemonArray"
        );
        const wrapper = shallowMount(PokemonPage);
        expect(mixPokemonArraySpy).toHaveBeenCalled();
    });

    test("debe de hacer match con el snapshot con pokemons cargados", () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                };
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    test("debe de mostrar los componentes de PokemonPicture y PokemonOptions", () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                };
            },
        });
        const picture = wrapper.find("pokemon-picture-stub");
        const options = wrapper.find("pokemon-options-stub");

        expect(picture.exists()).toBeTruthy();
        expect(options.exists()).toBeTruthy();

        expect(picture.attributes("pokemonid")).toBe("1");

        expect(options.attributes("pokemons")).toBeTruthy();
    });

    test("prueba con checkAnswer", async() => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                };
            },
        });
        await wrapper.vm.checkAnswer(pokemons[0].id);
        expect(wrapper.find("h2").exists()).toBeTruthy();
        expect(wrapper.vm.showPokemon).toBe(true);
        expect(wrapper.find("h2").text()).toBe(
            `Correcto, el Pokemon es ${pokemons[0].name}`
        );

        await wrapper.vm.checkAnswer(10);
        expect(wrapper.vm.message).toBe(
            `Lo siento, el Pokemon era ${pokemons[0].name}`
        );
    });
});