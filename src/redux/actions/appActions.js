// @flow

import { fetchTopGrossingApps, fetchTopFreeApps, getRatingsFromApps } from '../../apis/api';
import { searchModel } from '../../dataModels/appModel';
import type { AppModel, Action, GetState, Dispatch } from '../../flow-types/types';

export const REQUEST_TOP_GROSSING_APPS = 'REQUEST_TOP_GROSSING_APPS';
export const RECEIVE_TOP_GROSSING_APPS_RESP = 'RECEIVE_TOP_GROSSING_APPS_RESP';
export const RECEIVE_TOP_GROSSING_APPS_ERR = 'RECEIVE_TOP_GROSSING_APPS_ERR';
export const REQUEST_TOP_FREE_APPS = 'REQUEST_TOP_FREE_APPS';
export const RECEIVE_TOP_FREE_APPS_RESP = 'RECEIVE_TOP_FREE_APPS_RESP';
export const RECEIVE_TOP_FREE_APPS_ERR = 'RECEIVE_TOP_FREE_APPS_ERR';
export const SEARCH_APPS = 'SEARCH_APPS';
export const SEARCH_APPS_RESULTS = 'SEARCH_APPS_RESULTS';

type GetSearchResult = (dispatch: Dispatch, getState?: GetState) => void;

// actions creator
export const requestTopGrossingApps = (): Action => ({
  type: REQUEST_TOP_GROSSING_APPS,
});

export const receiveTopGrossingAppsResponse = (topGrossing: Array<AppModel>): Action => ({
  type: RECEIVE_TOP_GROSSING_APPS_RESP,
  topGrossing,
});

export const receiveTopGrossingAppsError = (error: Object): Action => ({
  type: RECEIVE_TOP_GROSSING_APPS_ERR,
  error,
});

export const requestTopFreeApps = (): Action => ({
  type: REQUEST_TOP_FREE_APPS,
});

export const receiveTopFreeAppsResponse = (topFree: Array<AppModel>, limit: number): Action => ({
  type: RECEIVE_TOP_FREE_APPS_RESP,
  topFree,
  limit,
});

export const receiveTopFreeAppsError = (error: Object): Action => ({
  type: RECEIVE_TOP_FREE_APPS_ERR,
  error,
});

export const searchApps = (searchText: string): Action => ({
  type: SEARCH_APPS,
  searchText,
});

export const receiveSearchResults = (grossing: Array<AppModel>, free: Array<AppModel>): Action => ({
  type: SEARCH_APPS_RESULTS,
  payload: {
    grossing,
    free,
  },
});

// redux-trunks

export const getTopGrossingApps = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(requestTopGrossingApps());
    try {
      const entry = await fetchTopGrossingApps();
      dispatch(receiveTopGrossingAppsResponse(entry));
    } catch (error) {
      dispatch(receiveTopGrossingAppsError(error));
    }
  };
};

export const getTopFreeApps = () => {
  return async (dispatch: Dispatch, getState: GetState): Promise<void> => {
    const { topFreeApps, limit } = getState().data;
    if (topFreeApps.length === 0) {
      dispatch(requestTopFreeApps());
      try {
        const entry = await fetchTopFreeApps();
        const entrySliceHead = entry.slice(0, limit);
        const entrySliceTail = entry.slice(limit);
        const results = await getRatingsFromApps(entrySliceHead);
        const fullList = results.concat(entrySliceTail);
        dispatch(receiveTopFreeAppsResponse(fullList, limit));
      } catch (error) {
        dispatch(receiveTopFreeAppsError(error));
      }
    } else {
      const newLimit = Math.min(100, limit + 10);
      const entrySliceHead = topFreeApps.slice(0, limit);
      const entrySliceMiddle = topFreeApps.slice(limit, newLimit);
      const entrySliceTail = topFreeApps.slice(newLimit);
      const results = await getRatingsFromApps(entrySliceMiddle);
      const fullList = entrySliceHead.concat(results).concat(entrySliceTail);
      dispatch(receiveTopFreeAppsResponse(fullList, newLimit));
    }
  };
};

export const getSearchAppsResult = (searchText: string): GetSearchResult => {
  if (searchText.length === 0) {
    return (dispatch: Dispatch): void => {
      dispatch(searchApps(searchText));
    };
  }

  return (dispatch: Dispatch, getState: GetState): void => {
    dispatch(searchApps(searchText));
    const { topGrossingApps, topFreeApps, limit } = getState().data;
    const grossing = searchModel(topGrossingApps, searchText);
    const free = searchModel(topFreeApps.slice(0, limit), searchText);
    dispatch(receiveSearchResults(grossing, free));
  };
};
