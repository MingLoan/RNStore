// @flow

import React from 'react';
import { ActivityIndicator } from 'react-native';
import styles from './AppActivityIndicator.style';

const AppActivityIndicator = () => (
  <ActivityIndicator style={styles.activityIndicator} size="small" color="#888" />
);

export default AppActivityIndicator;
