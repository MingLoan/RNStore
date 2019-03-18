import React, { Component } from 'react';
import { SectionList, View } from 'react-native';
import styles from './InfiniteList.style';

class InfiniteList extends Component {

  renderSectionSeparator = (highlighted, section, item) => {
    return <View style={styles.sectionSeparator}/>;
  };

  renderItemSeparator = (highlighted, section, item) => {
    return <View style={styles.itemSeparator}/>;
  };

  render() {
    const { sections, renderItem, onEndReached, renderSectionFooter } = this.props;
    return (
      <SectionList
        contentInsetAdjustmentBehavior="always"
        contentContainerStyle={styles.sectionListContentContainer}
        renderItem={renderItem}
        sections={sections}
        SectionSeparatorComponent={this.renderSectionSeparator}
        ItemSeparatorComponent={this.renderItemSeparator}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        keyExtractor={item => item.id}
        renderSectionFooter={renderSectionFooter}
      />
    );
  }
}

export default InfiniteList;
