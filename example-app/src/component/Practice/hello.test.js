import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Hello from "./hello";

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

function expectContentToBe(expected){
    expect(container.textContent).toBe(expected);
}

function testHello(testName, name, message){
    it(testName, () => {
        renderCP(<Hello name={name}/>);
        expectContentToBe(message);
    })
}

testHello('Hello empty name', '', 'Hey, stranger');
testHello('Hello a name', 'Jenny', 'Hello, Jenny!');
testHello('Hello another name', 'Margaret', 'Hello, Margaret!');
testHello('Hello korean utf-8 name', '김태희', 'Hello, 김태희!');