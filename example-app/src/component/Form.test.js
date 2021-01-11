import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom';
import {act} from 'react-dom/test-utils';

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
    act(()=>{
        render(component, container);
    });
}


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

function expectValue(component, value) {
    expect(component.getAttribute('value')).toEqual(value);
}

const select = (id) => document.querySelector(`[data-testid=${id}]`);

function testFieldByName(name, value){
    const field = select('form_field_'+name);
    expectValue(field, value);
}

it("render Field",()=>{
    const name = 'body';
    renderCP(form.Field(name, '', 'text'));
    testFieldByName(name, '');
});

it("render FormBody auto Fields",()=>{
    renderCP(form.FormBody());
    for (const name of Object.keys(someTemplate)){
        testFieldByName(name, '');
    }
});

it("empty State", ()=>{
    const result = form.emptyState();
    expect(result).toEqual({
        'title' : '',
        'content' : '',
    })
})

it('handle input Change', ()=>{
    renderCP(<SomeForm />)
    const titleField = select('form_field_title');
    const str = 'tamjungrabbit';
    act(()=>{   
        titleField.setAttribute('value', str);
    })
    expectValue(titleField, str);
})

it("render submitButton with cutom message", ()=>{
    renderCP(form.SubmitButton(customMessage));
    const button = select('submit')
    expect(button.innerHTML).toEqual(customMessage);
})

