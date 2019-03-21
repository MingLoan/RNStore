// @flow

import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './RecommendList.style';
import AppActivityIndicator from './AppActivityIndicator.component';
import type { AppModel, Row } from '../flow-types/types';

type Props = {
  data: Array<AppModel>,
  renderItem: Row,
  isLoading: boolean,
};

const RecommendList = ({ data, renderItem, isLoading }: Props) => (
  <View style={styles.container}>
    <Text style={styles.titleLabel}>Recommend</Text>
    {isLoading ? (
      <AppActivityIndicator />
    ) : (
      <FlatList
        horizontal
        style={styles.flatList}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    )}
  </View>
);

export default RecommendList;
