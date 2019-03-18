import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import styles from './AppActivityIndicator.style';

class AppActivityIndicator extends Component {
  render() {
    return <ActivityIndicator style={styles.activityIndicator} size="small" color="#888" />;
  }
}

export default AppActivityIndicator;
