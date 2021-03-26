import React from "react";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavItem from "./NavItem";
import Item from "./Item/Item";
configure({ adapter: new Adapter() });

describe("<NavItem />", () => {
    let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<NavItem></NavItem>);
    }) 

  it("should render two <Item></Item> elements if not authenticated", () => {
    expect(wrapper.find(Item)).toHaveLength(2);
  });
  it("should render three <Item></Item> elements if authenticated", () => {
    wrapper.setProps({isAuthenticated: true}); 
    expect(wrapper.find(Item)).toHaveLength(3);
  });
 it("should render three Logout if authenticated", () => {
    wrapper.setProps({isAuthenticated: true}); 
    expect(wrapper.contains(<Item LinkTo="/logout">Logout</Item>)).toEqual(true);
  });
});
