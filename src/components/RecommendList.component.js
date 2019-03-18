import React, { Component } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import styles from './RecommendList.style';

class RecommendList extends Component {
  render() {
    const { data, renderItem, isLoading } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.titleLabel}>Recommend</Text>
        {isLoading ? (
          <ActivityIndicator style={styles.activityIndicator} size="small" color="#888" />
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
  }
}

export default RecommendList;
