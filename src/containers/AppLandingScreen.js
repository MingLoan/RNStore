// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash/debounce';
import * as appActions from '../redux/actions/appActions';
import SearchContext from '../components/SearchContext.component';
import InfiniteList from '../components/InfiniteList.component';
import AppItem from '../components/AppItem.component';
import RecommendList from '../components/RecommendList.component';
import RecommendAppItem from '../components/RecommendAppItem.component';
import AppActivityIndicator from '../components/AppActivityIndicator.component';
import EmptyView from '../components/EmptyView.component';
import type { Dispatch, State, Section, Row } from '../flow-types/types';

type Props = {
  actions: Object,
  data: State,
};

class AppLandingScreen extends Component<Props> {
  componentDidMount() {
    this.fetchTopGrossingApps();
    this.fetchTopFreeApps();
  }

  onEndReached = () => {
    const { data } = this.props;
    const { isFetchingTopFree, isSearching } = data;
    if (!isFetchingTopFree && !isSearching) {
      const { actions } = this.props;
      const { getTopFreeApps } = actions;
      getTopFreeApps();
    }
  };

  onSearchTextChanged = debounce(
    searchText => {
      const { actions } = this.props;
      const { getSearchAppsResult } = actions;
      getSearchAppsResult(searchText);
    },
    300,
    { leading: true, trailing: false }
  );

  fetchTopGrossingApps = () => {
    const { actions } = this.props;
    const { getTopGrossingApps } = actions;
    getTopGrossingApps();
  };

  fetchTopFreeApps = () => {
    const { actions } = this.props;
    const { getTopFreeApps } = actions;
    getTopFreeApps();
  };

  renderAppItem = ({ item, index }: Row): Node => <AppItem key={index} order={index} item={item} />;

  renderRecommendItem = ({ item, index }: Row): Node => (
    <RecommendAppItem key={index} item={item} />
  );

  renderSectionFooter = ({ section }): ?Node => {
    const { data } = this.props;
    const { limit, isSearching } = data;
    if (!isSearching && section.index === 1 && limit < 100) {
      return <AppActivityIndicator />;
    }
    return null;
  };

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
    const overrideTopGrossingRenderItem = (): Node => (
      <RecommendList
        renderItem={this.renderRecommendItem}
        data={isSearching ? grossingAppsSearchResults : topGrossingApps}
        isLoading={isFetchingTopGrossing}
      />
    );
    const freeApps = topFreeApps.slice(0, limit);

    const section0: Section = {
      index: 0,
      title: 'Top Grossing',
      data: [{ key: 1 }],
      renderItem: overrideTopGrossingRenderItem,
    };
    const section1: Section = {
      index: 1,
      title: 'Top Free',
      data: isSearching ? freeAppsSearchResults : freeApps,
    };
    const sections: Array<Section> = [];
    if (isSearching && grossingAppsSearchResults.length === 0) {
      // do nothing
    } else {
      sections.push(section0);
    }
    if (isSearching && freeAppsSearchResults.length === 0) {
      // do nothing
    } else {
      sections.push(section1);
    }

    return (
      <SearchContext searchPlaceholder="Search" onSearchTextChanged={this.onSearchTextChanged}>
        {sections.length === 0 ? (
          <EmptyView />
        ) : (
          <InfiniteList
            sections={sections}
            renderItem={this.renderAppItem}
            onEndReached={this.onEndReached}
            renderSectionFooter={this.renderSectionFooter}
          />
        )}
      </SearchContext>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { data } = state;
  return { data };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators(appActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLandingScreen);
