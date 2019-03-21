// @flow

import type AppModel from '../flow-types/types';
import { convertToModel } from '../dataModels/appModel';

const TOP_GROSSING_ENDPOINT =
  'https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json';
const TOP_FREE_ENDPOINT = 'https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json';
const APP_LOOKUP_ENDPOINT = 'https://itunes.apple.com/hk/lookup?id=';

type AppModelPromise = Promise<Array<AppModel>>;

type AppLookUpPromise = Promise<{
  averageUserRating: number,
  userRatingCount: number,
}>;

export const fetchTopGrossingApps = async (): AppModelPromise => {
  try {
    const response = await fetch(TOP_GROSSING_ENDPOINT);
    const data = await response.json();
    const { feed } = data;
    const { entry } = feed;
    const models: Array<AppModel> = entry.map(x => convertToModel(x));
    return models;
  } catch (err) {
    throw Error(err);
  }
};

export const fetchTopFreeApps = async (): AppModelPromise => {
  try {
    const response = await fetch(TOP_FREE_ENDPOINT);
    const data = await response.json();
    const { feed } = data;
    const { entry } = feed;
    const models = entry.map(x => convertToModel(x));
    return models;
  } catch (err) {
    throw Error(err);
  }
};

export const fetchAppsLookup = async (id: number | string): AppLookUpPromise => {
  try {
    const response = await fetch(APP_LOOKUP_ENDPOINT + id);
    const data = await response.json();
    const { results } = data;
    const { averageUserRatingForCurrentVersion, userRatingCountForCurrentVersion } = results[0];
    return {
      averageUserRating: averageUserRatingForCurrentVersion || 0.0,
      userRatingCount: userRatingCountForCurrentVersion || 0,
    };
  } catch (err) {
    throw Error(err);
  }
};

export const getRatingsFromApps = async (apps: Array<AppModel>) => {
  return Promise.all(
    apps.map(
      async (app: AppModel): AppModel => {
        const result = await fetchAppsLookup(app.id);
        return { ...app, ...result };
      }
    )
  );
};
