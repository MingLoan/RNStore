// @flow

import React from 'react';
import type { Node } from 'react';
import { SectionList, View } from 'react-native';
import styles from './InfiniteList.style';
import type Row from '../flow-types/types';

type Props = {
  sections: Array<Object>,
  renderItem: Row,
  onEndReached: Function,
  renderSectionFooter: Function,
};

const renderSectionSeparator = (): Node => {
  return <View style={styles.sectionSeparator} />;
};

const renderItemSeparator = (): Node => {
  return <View style={styles.itemSeparator} />;
};

const InfiniteList = ({ sections, renderItem, onEndReached, renderSectionFooter }: Props) => (
  <SectionList
    contentInsetAdjustmentBehavior="always"
    contentContainerStyle={styles.sectionListContentContainer}
    renderItem={renderItem}
    sections={sections}
    SectionSeparatorComponent={renderSectionSeparator}
    ItemSeparatorComponent={renderItemSeparator}
    onEndReachedThreshold={0.2}
    onEndReached={onEndReached}
    keyExtractor={item => item.id}
    renderSectionFooter={renderSectionFooter}
    keyboardDismissMode="on-drag"
  />
);

export default InfiniteList;
