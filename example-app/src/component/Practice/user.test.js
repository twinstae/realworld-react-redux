import User from "./user";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const fakeStore = {
  123: {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue"
  },
  124: {
    name: "TaeHee",
    age: "25",
    address: "124, 경기도 파주시"
  }  
}

function expectContent(selector){
    return expect(container.querySelector(selector).textContent);
}

function expectUser(user){
  expectContent("summary").toBe(user.name);
  expectContent("strong").toBe(user.age);
  expectContent("details").toContain(user.address);
}

async function renderUserById(id){
  await act(async () => {
    render(<User id={id} />, container);
  });
}

function testUserByID(id){
  it("renders user data "+id, async () => {
    jest.spyOn(global, "fetch").mockImplementation((url) =>
      Promise.resolve({
        json: () => Promise.resolve(fakeStore[url.slice(1)])
      })
    );

    await renderUserById(id);
    expectUser(fakeStore[id]);
    global.fetch.mockRestore();
  });
}

testUserByID("123")
testUserByID("124")