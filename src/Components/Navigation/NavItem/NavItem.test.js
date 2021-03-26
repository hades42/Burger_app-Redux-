import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavItem from "./NavItem";
import Item from "./Item/Item";
configure({adapter: new Adapter()});

describe("<NavItem />", () => {
    it("should render two <Item></Item> elements if not authenticated", () => {
        const wrapper = shallow(<NavItem></NavItem>);
        expect(wrapper.find(Item)).toHaveLength(2);
    });
});