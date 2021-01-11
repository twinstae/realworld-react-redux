import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Toggle from './toggle';

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

it("changes value when clicked", () => {
    const onChange = jest.fn();
    act(() => {
      render(<Toggle />, container);
    });
  
    // get ahold of the button element, and trigger some clicks on it
    const button = document.querySelector("[data-testid=toggle]");
    expect(button.innerHTML).toBe("Turn on");
    act(() => {
        click(button);
    });

    innerToBe(button, "Turn off");
  
    act(() => {
        for (let i = 0; i < 5; i++) { click(button); }
    });
  
    innerToBe(button, "Turn on");
  });

function innerToBe(component, expected) {
    expect(component.innerHTML).toBe(expected);
}

function click(component) {
    component.dispatchEvent(new MouseEvent("click", { bubbles: true }));
}

export { click, innerToBe };