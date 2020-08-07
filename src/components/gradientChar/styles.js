import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  chart: {
    height: 300,
    backgroundColor: 'transparent',
  },
  cardHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f5f8',
  },
  cardHeaderWorkaround: {
    position: 'absolute',
    width: '100%',
    height: 10,
    backgroundColor: '#f4f5f8',
    top: 40,
  },
  card: {
    height: 360,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
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
  }
});

export default styles;
