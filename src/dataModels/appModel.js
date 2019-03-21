// @flow

import type AppModel from '../flow-types/types';

export const convertToModel = (originalData: Object): AppModel => {
  const model: AppModel = {
    id: originalData.id.attributes['im:id'],
    title: originalData.title.label,
    name: originalData['im:name'].label,
    category: originalData.category.attributes.label,
    smallImage: originalData['im:image'][0].label,
    mediumImage: originalData['im:image'][1].label,
    largeImage: originalData['im:image'][2].label,
    summary: originalData.summary.label,
    author: originalData['im:artist'].label,
    averageUserRating: 0.0,
    userRatingCount: 0,
  };
  return model;
};

export const searchModel = (models: Array<AppModel>, keyword: string): Array<AppModel> => {
  const filteredModels = models.filter((item: AppModel) => {
    return (
      item.name.includes(keyword) ||
      item.category.includes(keyword) ||
      item.summary.includes(keyword) ||
      item.author.includes(keyword)
    );
  });
  return filteredModels;
};
