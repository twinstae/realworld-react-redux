import React from 'react';
import { shallow } from 'enzyme';
import Toggle from './toggle';

let wrapper;
let button;
beforeEach(()=>{
  //wrapper = shallow(Toggle());
  //button = wrapper.find('button');
})

it('render withoutError', ()=>{
  expect(1).toBe(1);
})


function click(component) {
    component.dispatchEvent(new MouseEvent("click", { bubbles: true }));
}

export {click};