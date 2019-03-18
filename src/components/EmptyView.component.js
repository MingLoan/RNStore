import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './EmptyView.style';

class EmptyView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.messageLabel} numberOfLines={2}>
          No results
        </Text>
      </View>
    );
  }
}

export default EmptyView;
