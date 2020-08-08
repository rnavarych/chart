import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../configs/colors';

export default EStyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
  },
  label: {
    paddingStart: 10,
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 15,
    marginBottom: 5,
    width: '100%',
  },
  required: {
    color: Colors.error,
  },
  notValid: {
    borderWidth: 0.5,
    borderColor: Colors.error,
  },
  inputContainer: {
    borderWidth: 0.5,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '$inputBg',
    borderRadius: 5,
  },
  inputWithEye: {
    height: 50,
    flex: 1,
    paddingStart: 10,
    fontSize: 16,
  },
  eyePadding: {
    padding: 10,
  },
  eyeIcon: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
});
