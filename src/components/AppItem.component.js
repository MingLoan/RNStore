import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
import styles from './AppItem.style';

class AppItem extends Component {
  render() {
    const { item, order } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={() => {}}>
        <Text style={styles.orderLabel}>{order + 1}</Text>
        <Image
          borderRadius={order % 2 === 0 ? 16 : 35}
          style={styles.appIcon}
          source={{ uri: item.mediumImage }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.nameLabel} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.categoryLabel} numberOfLines={1}>
            {item.category}
          </Text>
          <View style={styles.ratingContainer}>
            <Rating imageSize={10} readonly startingValue={item.averageUserRating} />
            <Text style={styles.ratingLabel} numberOfLines={1}>
              ({item.userRatingCount})
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default AppItem;
