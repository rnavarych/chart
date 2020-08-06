import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  intervalContainer: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  typeContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'white',
  },
  containerSelected: {
    borderColor: 'purple',
  },
  text: {
    color: 'white',
  },
  textSelected: {
    color: 'purple',
  },
});
