import React, { useState, useEffect } from 'react';
import { Text, View, Switch, Image, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';

import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import Input from '../../../components/inputNeomorph';
import Button from '../../../components/buttons/buttonNeomorph';
import AppInfo from '../../../components/appInfo';

import { emailValidation, loginPasswordValidation } from '../../../utils/validation';
import { LOGIN_USER } from '../../../requests/authQL';
import { saveToken, saveUserId, signIn } from '../../../actions/auth';
import { credentialsSaved, credentialsDeleted } from '../../../actions/auth';
import { hideGetStartedFlow } from '../../../actions/app';
import { decodeUserId } from '../../../utils/auth';
import { useShallowSelector } from '../../../hooks';

import * as GQL_TYPES from '../../../interfaces/graphQL';
import * as routes from '../../../nav/routes';
import * as I18n from '../../../I18n';
import styles from './styles';
import images from '../../../configs/images';
import log from '../../../utils/log';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../configs/colors';

interface Props {
  navigation: any; // TODO: add proper navigation type
  route: any;
}

function LoginScreen(props: Props) {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const [email, updateEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passValid, setPassValid] = useState(false);
  const [password, updatePass] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, updateSavedEmail] = useState('');

  const [loginQL, { loading: fetchingLogin }] = useMutation<GQL_TYPES.LoginParams>(
    LOGIN_USER,
  );

  const {
    biometricsAvailable,
    isCredentialsSaved,
    shouldHideGetStarted,
  } = useShallowSelector(
    ({
      settings: { biometricsAvailable },
      auth: { credentialsSaved },
      app: { shouldHideGetStarted },
    }) => ({
      biometricsAvailable,
      isCredentialsSaved: credentialsSaved,
      shouldHideGetStarted,
    }),
  );

  useEffect(() => {
    if (route.params?.email) {
      updateEmail(route.params.email);
      // Check email if some email passed initially to the screen
      setEmailValid(
        emailValidation({ text: route.params.email, required: true }).isValid,
      );
    }
  }, [route.params]);

  useEffect(() => {
    // DESC: On the first time getting to the login we hide getStarted flow
    !shouldHideGetStarted && dispatch(hideGetStartedFlow());
    // Used to pick up currently saved email for displaying to the user
    Keychain.getGenericPassword().then((credentials) => {
      if (credentials) {
        updateSavedEmail(credentials.username);
      } else {
        isCredentialsSaved && log.debug('Cannot get saved creds!');
      }
    });
  }, []);

  const saveTokenAndUserId = (token: string): boolean => {
    if (token) {
      const userId = decodeUserId(token);
      if (userId) {
        dispatch(saveToken(token));
        dispatch(saveUserId(userId));
        return true; // success, token is valid and will be saved
      }
    }
    return false;
  };

  const loginUser = (email: string, password: string, touchID: boolean) => {
    setError('');
    loginQL({
      variables: {
        email,
        password,
        remember_me: rememberMe,
      },
    })
      .then((responce) => {
        if (!touchID) {
          if (rememberMe) {
            Keychain.setGenericPassword(email, password);
            // TODO: check setGenericPassword success
            dispatch(credentialsSaved());
          } else {
            Keychain.resetGenericPassword();
            // TODO: check resetGenericPassword success
            dispatch(credentialsDeleted());
          }
        }
        saveTokenAndUserId(responce.data.login.token) && dispatch(signIn(email));
      })
      .catch((error) => {
        setError(`${error.message}`);
      });
  };

  const onSignupPress = () => {
    navigation.navigate(routes.SIGNUP, { email });
  };

  const handleTouchID = () => {
    // TODO: add don't allow action handling (set biometricsAvalability to false)
    ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm identity' })
      .then((resultObject) => {
        const { success } = resultObject;

        if (success) {
          log.debug('successful biometrics provided');
          Keychain.getGenericPassword().then((credentials) => {
            if (credentials) {
              loginUser(credentials.username, credentials.password, true);
            }
          });
        } else {
          log.debug('user cancelled biometric prompt');
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
        console.log('biometrics failed', error);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scren}
        style={styles.scrollView}>
        <View style={styles.loginHeader}>
          <Image
            source={images.loginLogoCvs}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Image
            source={images.lenaLogin}
            style={styles.lenaImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <Input
            required={true}
            notShowRequired={true}
            label={I18n.strings('labels.accountName')}
            text={email}
            onChange={(input, isValid) => {
              setEmailValid(isValid);
              updateEmail(input);
            }}
            containerStyle={styles.inputMargin}
            autoCapitalize="none"
            placeholder={I18n.strings('labels.email')}
            isValid={emailValid}
            validationRule={emailValidation}
            layoutType={'full-line'}
          />
          <Input
            required={true}
            notShowRequired={true}
            label={I18n.strings('labels.password')}
            text={password}
            onChange={(input, isValid) => {
              setPassValid(isValid);
              updatePass(input);
            }}
            containerStyle={styles.passwordInput}
            secure={true}
            autoCapitalize="none"
            placeholder={I18n.strings('labels.password')}
            isValid={passValid}
            validationRule={loginPasswordValidation}
            layoutType={'full-line'}
          />
          <Button
            text={I18n.strings('screens.login.forgotPassword')}
            onPress={() => navigation.navigate(routes.RESET_PASSWORD, { email })}
            buttonType="small"
          />
          {biometricsAvailable && (
            <View style={styles.touchIdRow}>
              <Switch
                value={rememberMe}
                onValueChange={(value) => setRememberMe(value)}
                trackColor={{ false: Colors.grayLight, true: Colors.accent1 }}
                thumbColor={Platform.OS === 'android' ? Colors.white : undefined}
              />
              <Text style={styles.useTouchIdLabel}>
                {I18n.strings('screens.login.useTouchIdNextTime')}
              </Text>
            </View>
          )}
          <Text style={styles.error}>{error}</Text>
          <View style={styles.buttonsContainer}>
            <Button
              fetching={fetchingLogin}
              text={I18n.strings('buttons.login')}
              onPress={() => loginUser(email, password, false)}
              disabled={!passValid || !emailValid}
            />
            <Button
              text={I18n.strings('buttons.signUp')}
              onPress={onSignupPress}
              forceDarkText={true}
            />
          </View>
          {isCredentialsSaved && biometricsAvailable && savedEmail !== '' && (
            <View style={styles.touchIdLoginRow}>
              <Text>
                You can login to{' '}
                {<Text style={{ color: Colors.accent1 }}>{savedEmail}</Text>} using:{' '}
              </Text>
              <Button text={'TouchID'} onPress={handleTouchID} />
            </View>
          )}
        </View>
        <AppInfo />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;
