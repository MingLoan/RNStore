import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash/debounce';
import * as appActions from '../redux/actions/appActions';
import SearchContext from '../components/SearchContext.component';
import InfiniteList from '../components/InfiniteList.component';
import AppItem from '../components/AppItem.component';
import RecommendList from '../components/RecommendList.component';
import RecommendAppItem from '../components/RecommendAppItem.component';

class AppLandingScreen extends Component {

  componentDidMount() {
    this.fetchTopGrossingApps();
    this.fetchTopFreeApps();
  }
  
  fetchTopGrossingApps = () => {
    let { getTopGrossingApps } = this.props.actions;
    getTopGrossingApps();
  };

  fetchTopFreeApps = () => {
    let { getTopFreeApps } = this.props.actions;
    getTopFreeApps();
  };

  // info: {distanceFromEnd: number}
  onEndReached = (info) => {
    const { data } = this.props;
    const { 
      isFetchingTopFree,
      isSearching
    } = data;
    if (!isFetchingTopFree && !isSearching) {
      let { getTopFreeApps } = this.props.actions;
      getTopFreeApps();
    }
  };
  
  onSearchTextChanged = debounce(searchText => {
    let { getSearchAppsResult } = this.props.actions;
    getSearchAppsResult(searchText);
  }, 300, { leading: true, trailing: false });

  renderAppItem = ({ item, index, section }) => (
    <AppItem key={index} order={index} item={item} />
  );

  renderRecommendItem = ({ item, index, section }) => (
    <RecommendAppItem key={index} item={item} />
  );

  render() {
    const { data } = this.props;
    const { 
      topGrossingApps, 
      isFetchingTopGrossing,
      topFreeApps,
      limit,
      isSearching, 
      grossingAppsSearchResults,
      freeAppsSearchResults,
    } = data;
    const overrideTopGrossingRenderItem = ({ item, index, section }) => (
      <RecommendList 
        renderItem={this.renderRecommendItem} 
        data={isSearching ? grossingAppsSearchResults : topGrossingApps} 
        isLoading={isFetchingTopGrossing}
      />
    );
    const freeApps = topFreeApps.slice(0, limit);
    const sections = [
      { title: 'Top Grossing', data: [{ key: 1 }], renderItem: overrideTopGrossingRenderItem },
      { title: 'Top Free', data: isSearching ? freeAppsSearchResults : freeApps },
    ];

    return (
      <SearchContext 
        searchPlaceholder="Search"
        onSearchTextChanged={this.onSearchTextChanged}
      >
        <InfiniteList 
          sections={sections} 
          renderItem={this.renderAppItem} 
          onEndReached={this.onEndReached}
        />
      </SearchContext>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state;
  return { data };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(appActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLandingScreen);
