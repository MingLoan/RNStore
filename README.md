# RNStore
React Native example to redesign iOS App Store

## Installation


Should be the simple installation flow as simple react native application.
```
# download npm
yarn install

# link react-native-vector-icons
react-native link react-native-vector-icons
```

## Supported Platform
iOS
Android (not test but cross-platform components used in the project)

## Issues

1. Search is not working well when typing fast.
Actions: Search methods/algorithm should be improved.

## Enhancements

1. Network error handling
2. Pull-to-refresh
3. Redesign search items UI
4. Unit testings
5. Align to best practices -> flow and eslint

## Constraints

1. iTunes RSS API has no pagination features, some tricks are done.
2. Data modeling is a bit tricky with aggregating APIs responses.
