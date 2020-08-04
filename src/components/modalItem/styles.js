import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    marginLeft: 40,
    alignItems: 'center'
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 10
  },
  date:{
    color: '#31425d',
    fontSize: 14,
    marginLeft: 20,
    width: 75
  },
  unit:{
    color: '#31425d',
    fontSize: 14,
    marginLeft: 15
  },
  icon: {
    tintColor: '#009fc7',
    width: 10,
    height: 10,
    position: 'absolute',
    right: 40
  }
});

export default styles;
