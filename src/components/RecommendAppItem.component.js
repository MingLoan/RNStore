// @flow

import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import styles from './RecommendAppItem.style';
import type AppModel from '../flow-types/types';

type Props = {
  item: AppModel,
};

const RecommendAppItem = ({ item }: Props) => (
  <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={() => {}}>
    <Image style={styles.appIcon} source={{ uri: item.largeImage }} />
    <Text style={styles.nameLabel} numberOfLines={2}>
      {item.name}
    </Text>
    <Text style={styles.categoryLabel} numberOfLines={1}>
      {item.category}
    </Text>
  </TouchableOpacity>
);

export default RecommendAppItem;
