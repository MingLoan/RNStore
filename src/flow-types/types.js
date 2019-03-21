// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import {
  REQUEST_TOP_GROSSING_APPS,
  RECEIVE_TOP_GROSSING_APPS_RESP,
  REQUEST_TOP_FREE_APPS,
  RECEIVE_TOP_FREE_APPS_RESP,
  SEARCH_APPS,
  SEARCH_APPS_RESULTS,
} from '../redux/actions/appActions';

// Styles
type _Style = { [key: string]: Object };
export type Style = _Style | Array<_Style>;

// Components
export type Row = {
  item?: Object,
  index?: number,
  section?: Object,
};

export type Section = {
  index: number,
  title: string,
  +data: Array<Object>,
  renderItem?: Row => Node,
};

export type AppModel = {
  id: string,
  title: string,
  name: string,
  category: string,
  smallImage: string,
  mediumImage: string,
  largeImage: string,
  summary: string,
  author: string,
  averageUserRating: number,
  userRatingCount: number,
};

// Redux

export type State = {
  isSearching: boolean,
  isFetchingTopGrossing: boolean,
  isFetchingTopFree: boolean,
  topGrossingApps: Array<AppModel>,
  topFreeApps: Array<AppModel>,
  limit: number,
  grossingAppsSearchResults: Array<AppModel>,
  freeAppsSearchResults: Array<AppModel>,
};

type RequestTopGrossingAction = { type: REQUEST_TOP_GROSSING_APPS };
type ReceiveTopGrossingAction = {
  type: RECEIVE_TOP_GROSSING_APPS_RESP,
  topGrossing: Array<AppModel>,
};
type ErrorAction = {
  type: string,
  error: Object,
};
type RequestTopFeeAction = { type: REQUEST_TOP_FREE_APPS };
type ReceiveTopFreeAction = {
  type: RECEIVE_TOP_FREE_APPS_RESP,
  topFree: Array<AppModel>,
  limit: number,
};
type SearchAppsAction = {
  type: SEARCH_APPS,
  searchText: string,
};
type ReceiveSearchResultsAction = {
  type: SEARCH_APPS_RESULTS,
  payload: {
    grossing: Array<AppModel>,
    free: Array<AppModel>,
  },
};

export type Action =
  | RequestTopGrossingAction
  | ReceiveTopGrossingAction
  | ErrorAction
  | RequestTopFeeAction
  | ReceiveTopFreeAction
  | SearchAppsAction
  | ReceiveSearchResultsAction;

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: ReduxDispatch, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type Store = ReduxStore<State, Action>;
