import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 24,
    height: 24,
    backgroundColor: '#f4f5f8',
    borderRadius: 12,
    shadowColor: "#899198",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    marginHorizontal: 10
  },
  container: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 40,
    alignItems: 'center'
  },
  description: {
    fontSize: 16,
    color:'#31425d'
  }
});

export default styles;
