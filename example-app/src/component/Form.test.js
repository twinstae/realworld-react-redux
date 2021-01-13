import { shallow, mount } from 'enzyme';
import React from 'react'
import Form from './Form';

let wrapper;

function expectAttr(component, attr, value) {
    const props = component.props();
    expect(props[attr]).toEqual(value);
}

function expectAttrs(component, json){
    Object.keys(json).map((key)=>{
        expectAttr(component, key, json[key]);
    });
}
const select = (selector) => wrapper.find(selector);
const selectTestId = (testId) => select(`[data-testid="${testId}"]`);

const someTemplate = {
    'title' : 'text',
    'content' : 'text',
};

const customMessage = 'sign';

class SomeForm extends Form {
    testid = 'SomeForm'
    template = someTemplate
    submitMessage = customMessage
}

const form = new SomeForm();

function testFieldByName(name, value, type=''){
    type = type ? type : name;
    const field = selectTestId('form_field_'+name);
    expectAttrs(field, {name, value, type});
}

it("render Field",()=>{
    const name = 'body';
    wrapper = shallow(form.Field(name, '', 'text'));
    testFieldByName(name, '', 'text');
});

it("render FormBody auto Fields",()=>{
    wrapper = shallow(
        form.FormBody(
            form.emptyState(form.template)
        )
    );
    for (const name of Object.keys(someTemplate)){
        testFieldByName(name, '', form.template[name]);
    }
});

it("empty State", ()=>{
    const result = form.emptyState();
    expect(result).toEqual({
        'title' : '',
        'content' : '',
    })
})

function findSetForm(name, value){
    const field = selectTestId('form_field_'+name);
    field.simulate('change', { target: { value: value } });
    return field
}

it("render submitButton with cutom message", ()=>{
    wrapper = shallow(form.SubmitButton(customMessage));
    expect(selectTestId('submit').text()).toEqual(customMessage);
})

it('input and submit Form', ()=>{
    const onSubmit = ({title, content})=>{
        expect({title, content}).toEqual(expected)
    }
    wrapper = shallow(<SomeForm onSubmit={onSubmit}/>)

    const expected = {
        title: '제목',
        content: '내용'
    }

    findSetForm('title', expected.title)
    findSetForm('content', expected.content)
    selectTestId('submit').simulate('click');
})