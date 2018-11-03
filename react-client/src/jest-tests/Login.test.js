import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Login from '../components/Login.jsx';
import Adapter from 'enzyme-adapter-react-16';
import {fetch as fetchPolyfill} from 'whatwg-fetch';

configure({adapter: new Adapter()});

let component
beforeEach(() => {
  component = mount(<Login />);
});

test('It should test something', () => {
  component.instance().handleChange = jest.fn((e) => { console.log(e) });
  let test = component.find('form').childAt(0);
  test.simulate('change', { target: { name: 'username', value: 'john.doe' } });
  // component.instance().handleChange({ target: { name: 'username', value: 'john.doe' } });
  expect(component.instance().handleChange).toHaveBeenCalledTimes(1);
});