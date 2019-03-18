import React, { Component } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import styles from './RecommendAppItem.style';

class RecommendAppItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={() => {}}>
        <Image borderRadius={24} style={styles.appIcon} source={{ uri: item.largeImage }} />
        <Text style={styles.nameLabel} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.categoryLabel} numberOfLines={1}>
          {item.category}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default RecommendAppItem;
