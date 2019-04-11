import * as actions from './appActions';

describe('top grossing actions', () => {
  it('should create an action to request top grossing apps', () => {
    const expectedAction = {
      type: actions.REQUEST_TOP_GROSSING_APPS,
    };
    expect(actions.requestTopGrossingApps()).toEqual(expectedAction);
  });

  it('should create an action to receive top grossing apps response', () => {
    const model = {};
    const topGrossing = [model];
    const expectedAction = {
      type: actions.RECEIVE_TOP_GROSSING_APPS_RESP,
      topGrossing,
    };
    expect(actions.receiveTopGrossingAppsResponse(topGrossing)).toEqual(expectedAction);
  });

  it('should create an action to receive top grossing apps error', () => {
    const error = {};
    const expectedAction = {
      type: actions.RECEIVE_TOP_GROSSING_APPS_ERR,
      error,
    };
    expect(actions.receiveTopGrossingAppsError(error)).toEqual(expectedAction);
  });
});

describe('top free actions', () => {
  it('should create an action to request top free apps', () => {
    const expectedAction = {
      type: actions.REQUEST_TOP_FREE_APPS,
    };
    expect(actions.requestTopFreeApps()).toEqual(expectedAction);
  });

  it('should create an action to receive top free apps response', () => {
    const model = {};
    const topFree = [model];
    const limit = 10;
    const expectedAction = {
      type: actions.RECEIVE_TOP_FREE_APPS_RESP,
      topFree,
      limit,
    };
    expect(actions.receiveTopFreeAppsResponse(topFree, limit)).toEqual(expectedAction);
  });

  it('should create an action to receive top free apps error', () => {
    const error = {};
    const expectedAction = {
      type: actions.RECEIVE_TOP_FREE_APPS_ERR,
      error,
    };
    expect(actions.receiveTopFreeAppsError(error)).toEqual(expectedAction);
  });
});

describe('search actions', () => {
  it('should create an action to search apps', () => {
    const searchText = 'Gogovan';
    const expectedAction = {
      type: actions.SEARCH_APPS,
      searchText,
    };
    expect(actions.searchApps(searchText)).toEqual(expectedAction);
  });

  it('should create an action to receive search results', () => {
    const model = {};
    const grossing = [model];
    const free = [model];
    const payload = {
      grossing,
      free,
    };
    const expectedAction = {
      type: actions.SEARCH_APPS_RESULTS,
      payload,
    };
    expect(actions.receiveSearchResults(grossing, free)).toEqual(expectedAction);
  });
});
