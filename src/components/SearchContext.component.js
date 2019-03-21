// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import { SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from './SearchContext.style';

type Props = {
  onSearchTextChanged: Function,
  children: Node,
  searchPlaceholder?: string,
};

type State = {
  searchText: string,
};

class SearchContext extends Component<Props, State> {
  static defaultProps = {
    searchPlaceholder: 'Search',
  };

  state = {
    searchText: '',
  };

  onChangeText = (searchText: string) => {
    const { onSearchTextChanged } = this.props;
    this.setState({ searchText });
    onSearchTextChanged(searchText);
  };

  render() {
    const { children, searchPlaceholder } = this.props;
    const { searchText } = this.state;
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior="padding" enabled>
          <SearchBar
            placeholder={searchPlaceholder}
            onChangeText={this.onChangeText}
            value={searchText}
            lightTheme
            round
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
          />
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default SearchContext;
