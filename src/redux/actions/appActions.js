import { fetchTopGrossingApps, fetchTopFreeApps, getRatingsFromApps } from '../../apis/api';
import { searchModel } from '../../dataModels/appModel';

export const REQUEST_TOP_GROSSING_APPS = 'REQUEST_TOP_GROSSING_APPS';
export const RECEIVE_TOP_GROSSING_APPS_RESP = 'RECEIVE_TOP_GROSSING_APPS_RESP';
export const RECEIVE_TOP_GROSSING_APPS_ERR = 'RECEIVE_TOP_GROSSING_APPS_ERR';
export const REQUEST_TOP_FREE_APPS = 'REQUEST_TOP_FREE_APPS';
export const RECEIVE_TOP_FREE_APPS_RESP = 'RECEIVE_TOP_FREE_APPS_RESP';
export const RECEIVE_TOP_FREE_APPS_ERR = 'RECEIVE_TOP_FREE_APPS_ERR';
export const SEARCH_APPS = 'SEARCH_APPS';
export const SEARCH_APPS_RESULTS = 'SEARCH_APPS_RESULTS';

export const requestTopGrossingApps = () => ({
  type: REQUEST_TOP_GROSSING_APPS,
});

export const receiveTopGrossingAppsResponse = topGrossing => ({
  type: RECEIVE_TOP_GROSSING_APPS_RESP,
  topGrossing,
});

export const receiveTopGrossingAppsError = error => ({
  type: RECEIVE_TOP_GROSSING_APPS_ERR,
  payload: {
    error,
  },
});

export const getTopGrossingApps = () => {
  return async dispatch => {
    dispatch(requestTopGrossingApps());
    try {
      const entry = await fetchTopGrossingApps();
      dispatch(receiveTopGrossingAppsResponse(entry));
    } catch (error) {
      dispatch(receiveTopGrossingAppsError(error));
    }
  };
};

export const requestTopFreeApps = () => ({
  type: REQUEST_TOP_FREE_APPS,
});

export const receiveTopFreeAppsResponse = (topFree, limit) => ({
  type: RECEIVE_TOP_FREE_APPS_RESP,
  topFree,
  limit,
});

export const receiveTopFreeAppsError = error => ({
  type: RECEIVE_TOP_FREE_APPS_ERR,
  payload: {
    error,
  },
});

export const getTopFreeApps = () => {
  return async (dispatch, getState) => {
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

export const searchApps = searchText => ({
  type: SEARCH_APPS,
  searchText,
});

export const receiveSearchResults = (grossing, free) => ({
  type: SEARCH_APPS_RESULTS,
  payload: {
    grossing,
    free,
  },
});

export const getSearchAppsResult = searchText => {
  if (searchText.length === 0) {
    return dispatch => {
      dispatch(searchApps(searchText));
    };
  }

  return (dispatch, getState) => {
    dispatch(searchApps(searchText));
    const { topGrossingApps, topFreeApps, limit } = getState().data;
    const grossing = searchModel(topGrossingApps, searchText);
    const free = searchModel(topFreeApps.slice(0, limit), searchText);
    dispatch(receiveSearchResults(grossing, free));
  };
};
