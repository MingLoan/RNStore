import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  orderLabel: {
    marginRight: 16,
    fontSize: 18,
    color: '#999',
  },
  appIcon: { width: 70, height: 70, marginRight: 8 },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginRight: 16,
  },
  nameLabel: { flex: 1, fontSize: 15 },
  categoryLabel: {
    flex: 1,
    fontSize: 13,
    color: '#777',
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: { fontSize: 11, color: '#777', marginLeft: 4 },
});
