import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: 200,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  touchArea: {
    height: 40,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonLine: {
    height: 4,
    width: 80,
    backgroundColor: '#009fc7',
    borderRadius: 3
  },
  separator: {
    height: 2,
    backgroundColor: '#f4f5f8',
    flex: 1
  }
});

export default styles;
