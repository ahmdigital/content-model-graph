import { act } from 'react-test-utils';
import { mount } from 'enzyme';
import React from 'react';
import Viz from 'viz.js';

import { types } from '../fixtures';
import ContentModelGraph from '.';

const SwitchMock = () => <div />;

// jest.mock('viz.js/full.render');
jest.mock('viz.js'); // this happens automatically with automocking

const mMock = jest.fn();
Viz.mockImplementation(() => {
  return {
    renderString: mMock,
  };
});

it('transforms types to edges', async () => {
  const promise = Promise;
  mMock.mockReturnValue(promise);
  const wrapper = mount(<ContentModelGraph types={types} Switch={SwitchMock} />);
  act(await promise.resolve('<svg/>'));
  console.log(wrapper.debug());
  expect(wrapper).toMatchSnapshot();
});
