/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/redux/stores/configureStore';
import AppLandingScreen from './src/containers/AppLandingScreen';

const store = configureStore();

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppLandingScreen style={{ flex: 1 }} />
      </Provider>
    );
  }
}

export default App;
