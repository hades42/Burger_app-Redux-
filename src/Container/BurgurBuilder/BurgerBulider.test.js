import React from "react";
import {BurgerBuilder} from "./BurgerBuilder"
import { configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../Components/Buger/BuildControl/BuildControl";
configure({adapter: new Adapter()});

describe("<BurgerBuilder>", ()=> {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}></BurgerBuilder>);
    });

    it("it should render <BuildControls> when receiving the ingredients", () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})