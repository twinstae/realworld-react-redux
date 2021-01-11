import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom';
import {act} from 'react-dom/test-utils';
import { click } from './Practice/toggle.test'
import Form from './Form';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

function renderCP(component){
    act(()=>{ render(component, container); });
}

function expectAttr(component, attr, value) {
    expect(component.getAttribute(attr)).toEqual(value);
}

function expectValue(component, value) {
    expectAttr(component, 'value', value);
}

const select = (id) => document.querySelector(`[data-testid=${id}]`);

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
    const field = select('form_field_'+name);
    expectAttr(field, 'name', name)
    expectValue(field, value);
    expectAttr(field, 'type', type)
}

it("render Field",()=>{
    const name = 'body';
    renderCP(form.Field(name, '', 'text'));
    testFieldByName(name, '', 'text');
});

it("render FormBody auto Fields",()=>{
    renderCP(form.FormBody());
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
    const field = select('form_field_'+name);
    act(()=>{
        field.setAttribute('value', value);
    })
    return field
}

it('handle input Change', ()=>{
    renderCP(<SomeForm />)
    const str = 'tamjungrabbit';
    const titleField = findSetForm('title', str)
    expectValue(titleField, str);
})

it("render submitButton with cutom message", ()=>{
    renderCP(form.SubmitButton(customMessage));
    expect(select('submit').innerHTML).toEqual(customMessage);
})

it('input and submit Form', ()=>{
    renderCP(<SomeForm onSubmit={
        ({title, content})=>{
            expect({title, content}).toEqual(expected)
        }}/>)

    const expected = {
        title: '제목',
        content: '내용'
    }

    findSetForm('title', expected.title)
    findSetForm('content', expected.content)
    click(select('submit'));
})