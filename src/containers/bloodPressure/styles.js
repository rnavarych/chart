import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'violet',
  },
  card: {
    height: 360,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  cardHeader: {
    height: 40,
    width: '100%',
    backgroundColor: '#f4f5f8',
  },
  cardHeaderWorkaround: {
    position: 'absolute',
    width: '100%',
    height: 10,
    backgroundColor: '#f4f5f8',
    top: 40,
  },
  cardFooterWorkaround: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    fontSize: 10,
    color: '#f4f5f8',
    backgroundColor: '#f4f5f8',
    paddingTop: Platform.OS === 'ios' ? 4 : 1,
    paddingBottom: 20,
  },
  chart: {
    height: 300,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 10,
    color: '#8093b0',
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 4,
    right: 50,
  },
});
