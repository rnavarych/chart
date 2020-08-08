import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, BackHandler } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ReactNativeBiometrics from 'react-native-biometrics';

import { useDispatch } from 'react-redux';
import { useShallowSelector } from '../../../hooks';
import { useMutation } from '@apollo/react-hooks';

import Input from '../../../components/input';
import Button from '../../../components/buttons/button';

import { signOut } from '../../../actions/auth';
import { updateUserBlockedStatus } from '../../../actions/app';
import { LOGIN_USER } from '../../../requests/authQL';

import * as I18n from '../../../I18n';
import styles from './styles';
import { log } from '../../../utils';

const LockScreen = () => {
  const dispatch = useDispatch();
  const [password, updatePassword] = useState('');
  const [error, setError] = useState('');

  const [loginQL, { loading }] = useMutation(LOGIN_USER);

  const { biometricsAvailable, email } = useShallowSelector(
    ({ settings: { biometricsAvailable }, auth: { email } }) => ({
      biometricsAvailable,
      email,
    }),
  );

  const handleTouchID = () => {
    // TODO: add don't allow action handling (set biometricsAvalability to false)
    ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm identity' })
      .then(
        ({ success }) => success && dispatch(updateUserBlockedStatus(false)),
      )
      .catch(() => log.debug('biometrics failed'));
  };

  useEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const loginUser = (email: string, password: string) => {
    setError('');
    loginQL({
      variables: {
        email,
        password,
        remember_me: true,
      },
    })
      .then((responce) => {
        dispatch(updateUserBlockedStatus(false));
      })
      .catch((error) => setError(`${error.message}`));
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        style={styles.scrollView}>
        <Text style={{ textAlign: 'center', marginBottom: 40, color: 'green' }}>
          For your safety we locked the app due to inactivity. Please identify
          yourself:{' '}
        </Text>
        <Input
          disabled={true}
          label={I18n.strings('labels.accountName')}
          text={email}
          onChange={() => {}}
          containerStyle={styles.inputMargin}
          autoCapitalize="none"
          placeholder={I18n.strings('labels.email')}
        />
        <Input
          secure={true}
          label={I18n.strings('labels.password')}
          text={password}
          onChange={(input) => updatePassword(input)}
          containerStyle={styles.inputMargin}
          autoCapitalize="none"
          placeholder={I18n.strings('labels.password')}
        />
        <Text style={styles.error}>{error}</Text>
        <View style={styles.buttonsContainer}>
          <Button
            fetching={loading}
            text={'Unlock'}
            onPress={() => loginUser(email, password)}
          />
          {biometricsAvailable && (
            <Button text={'Biometrics'} onPress={handleTouchID} />
          )}
        </View>
        <Button
          text={I18n.strings('buttons.logout')}
          onPress={() => {
            dispatch(signOut());
            setTimeout(() => dispatch(updateUserBlockedStatus(false)), 200);
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LockScreen;
