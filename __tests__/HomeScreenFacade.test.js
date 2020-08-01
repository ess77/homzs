import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreenFacade from '../components/HomeScreenFacade2';

test('Home Screen Test', () => {
    const snap = renderer.create(
        <HomeScreenFacade />
    ).toJSON();

    expect(snap).toMatchSnapshot();
});
