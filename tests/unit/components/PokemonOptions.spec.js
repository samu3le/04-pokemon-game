import { shallowMount } from "@vue/test-utils";
import PockemonOptions from "@/components/PokemonOptions.vue";

import { pokemons } from "../mocks/pockemons.mock";

describe("PokemonOptions Component", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(PockemonOptions, {
            props: {
                pokemons,
            },
        });
    });

    test("debe de hacer match con el snapshot", () => {
        //     expect(wrapper.html()).toMatchInlineSnapshot(`
        //   <div class="options-container">
        //     <ul>
        //       <li>bulbasaur</li>
        //       <li>ivysaur</li>
        //       <li>venusaur</li>
        //       <li>charmander</li>
        //     </ul>
        //   </div>
        // `);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("debe de mostrar las 4 opciones correctamente", () => {
        const liTags = wrapper.findAll("li");
        expect(liTags.length).toBe(4);

        expect(liTags[0].text()).toBe(pokemons[0].name);
        expect(liTags[1].text()).toBe(pokemons[1].name);
        expect(liTags[2].text()).toBe(pokemons[2].name);
        expect(liTags[3].text()).toBe(pokemons[3].name);
    });

    test('debe de emitir "selection" con sus respectivos parametros al hacer click', () => {
        const [li1, li2, li3, li4] = wrapper.findAll("li");
        li1.trigger("click");
        li2.trigger("click");
        li3.trigger("click");
        li4.trigger("click");

        expect(wrapper.emitted("selectedPokemon").length).toBe(4);
        expect(wrapper.emitted("selectedPokemon")[0]).toEqual([1]);
        expect(wrapper.emitted("selectedPokemon")[1]).toEqual([2]);
        expect(wrapper.emitted("selectedPokemon")[2]).toEqual([3]);
        expect(wrapper.emitted("selectedPokemon")[3]).toEqual([4]);
    });
});