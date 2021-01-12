import Toggle from './toggle';

let wrapper;
let button;
beforeEach(()=>{
  wrapper = mount(<Toggle />);
  button = wrapper.find('button');
})

it('render withoutError', ()=>{
  expect(button.text()).toEqual('Turn off')
})

it('click after text', ()=>{
  wrapper.find('button').simulate('click');
  expect(button.text()).toEqual('Turn on')
})

it('on off on off...', ()=>{
  wrapper.find('button').simulate('click');
  expect(button.text()).toEqual('Turn on')
  wrapper.find('button').simulate('click');
  expect(button.text()).toEqual('Turn off')
  wrapper.find('button').simulate('click');
  expect(button.text()).toEqual('Turn on')
})