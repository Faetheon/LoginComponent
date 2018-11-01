import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import App from '../components/App.jsx';
import Adapter from 'enzyme-adapter-react-16';
import {fetch as fetchPolyfill} from 'whatwg-fetch';
const fetch = require('node-fetch');

configure({adapter: new Adapter()});
let component;
beforeEach(() => {
  component = mount(<App />);
});

test('It makes sure window.fetch is the one from the polyfill', () => {
  expect(window.fetch.polyfill).toBe(true);
});

test('The left arrow button calls handleArrowButtonClick with false when clicked', () => {
  component.instance().handleArrowButtonClick = jest.fn((bool) => {});
  component.find('.product-left-arrow').simulate('click');
  expect(component.instance().handleArrowButtonClick).toHaveBeenCalledTimes(1);
  expect(component.instance().handleArrowButtonClick).toHaveBeenCalledWith(false);
});

test('The right arrow button calls handleArrowButtonClick with true when clicked\nNote: items end value is dependant on items start value', () => {
  component.instance().handleArrowButtonClick = jest.fn((bool) => {});
  component.find('.product-right-arrow').simulate('click');
  expect(component.instance().handleArrowButtonClick).toHaveBeenCalledTimes(1);
  expect(component.instance().handleArrowButtonClick).toHaveBeenCalledWith(true);
});

test('It tests that itemStart is not being decreased when it is less than five and the left arrow button was clicked', () => {
  component.find('.product-left-arrow').simulate('click');
  expect(component.state().itemStart).toBe(1);
});

test('It tests that itemStart is being decreased when it is greater than five and the left arrow button was clicked', () => {
  component.state().data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
  component.state().itemStart = 6;
  expect(component.state().itemStart).toBe(6);
  component.find('.product-left-arrow').simulate('click');
  expect(component.state().itemStart).toBe(1);
});

test('It tests that itemStart increases when there are more than five items and the right arrow button was clicked', () => {
  component.state().data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}];
  expect(component.state().itemStart).toBe(1);
  component.find('.product-right-arrow').simulate('click');
  expect(component.state().itemStart).toBe(6);
});

test('It tests that itemStart does not increase when there are less than five items and the right arrow button was clicked', () => {
  component.state().data = [{id: 1}, {id: 2}, {id: 3}];
  expect(component.state().itemStart).toBe(1);
  component.find('.product-right-arrow').simulate('click');
  expect(component.state().itemStart).toBe(1);
});

test('It tests that itemEnd does not increase when there are five or fewer items and the right arrow button was clicked', () => {
  component.state().data = [{id: 1}, {id: 2}, {id: 3}];
  // Note: itemEnd is updated in the fetch call so in here it will always start out at one even after adding items to data
  component.find('.product-right-arrow').simulate('click');
  expect(component.state().itemEnd).toBe(component.state().data.length);
});

test('It tests that itemEnd does increase when there are more than five items and the right arrow button was clicked', () => {
  component.state().data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
  component.find('.product-right-arrow').simulate('click');
  expect(component.state().itemEnd).toBe(component.state().data.length);
});

test('It tests that itemEnd does decrease when it is greater than five and the left arrow button was clicked', () => {
  component.state().data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
  component.state().itemEnd = 6;
  expect(component.state().itemEnd).toBe(6);
  component.find('.product-left-arrow').simulate('click');
  expect(component.state().itemEnd).toBe(5);
});

test('It tests that itemEnd does not decrease when it is less than or equal to five and the left arrow button was clicked', () => {
  component.state().data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
  component.find('.product-left-arrow').simulate('click');
  expect(component.state().itemEnd).toBe(4);
});
