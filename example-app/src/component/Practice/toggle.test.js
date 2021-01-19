import Toggle from './toggle';

const toggle_jsx = <Toggle />;
let wrapper;
let button;

describe('mount toggle test', ()=>{
  beforeEach(()=>{
    wrapper = mount(toggle_jsx);
    button = wrapper.find('button');
  })

  it('render withoutError', ()=>{
    expect(button.text()).toEqual('Turn off')
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
})