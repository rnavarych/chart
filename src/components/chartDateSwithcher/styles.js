import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#f4f5f8',
    borderRadius: 15,
    shadowColor: "#899198",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10
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
