import Hello from "./hello";

function testHello(testName, name, expected){
    it(testName, () => {
        const wrapper = shallow(<Hello name={name}/>);
        expect(wrapper.text()).toEqual(expected);
    })
}

testHello('Hello empty name', '', 'Hey, stranger');
testHello('Hello a name', 'Jenny', 'Hello, Jenny!');
testHello('Hello another name', 'Margaret', 'Hello, Margaret!');
testHello('Hello korean utf-8 name', '김태희', 'Hello, 김태희!');