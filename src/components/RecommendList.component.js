import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './RecommendList.style';
import AppActivityIndicator from './AppActivityIndicator.component';

class RecommendList extends Component {
  render() {
    const { data, renderItem, isLoading } = this.props;
    return (
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
  }
}

export default RecommendList;
