import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Keychain from 'react-native-keychain';

import { CommonActions } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';

import Text from '../../../components/text';
import Input from '../../../components/inputNeomorph';
import Button from '../../../components/buttons/buttonNeomorph';

import {
  passwordValidation,
  emailValidation,
  codeValidation,
} from '../../../utils/validation';
import { credentialsDeleted } from '../../../actions/auth';
import { FORGOT_PASSWORD, REDEEM_FORGOT_PASSWORD } from '../../../requests/authQL';
import { useShallowSelector } from '../../../hooks';
import log from '../../../utils/log';

import { validatePasswordAndConfirmation } from '../../../utils/validation';
import * as I18n from '../../../I18n';
import * as routes from '../../../nav/routes';
import styles from './styles';

interface Props {
  navigation: any;
  route: any;
}

const FORGOT_TOKEN_LENGTH = 12;

function ResetPasswordScreen(props: Props) {
  const { navigation, route } = props;
  const [resetToken, setResetToken] = useState('');
  const [email, setEmail] = useState('');
  const [passValid, setPassValid] = useState(false);
  const [emailValid, setEvailValid] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [passConfValid, setPassConfValid] = useState(false);
  const [newPassword, updateNewPassword] = useState('');
  const [confirmPassword, updateConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [forgotQL, { loading: fetchingRequestEmail }] = useMutation(FORGOT_PASSWORD);
  const [redeemForgotQL, { loading: fetchingRedeem }] = useMutation(
    REDEEM_FORGOT_PASSWORD,
  );

  const { isCredentialsSaved } = useShallowSelector(({ auth: { credentialsSaved } }) => ({
    isCredentialsSaved: credentialsSaved,
  }));

  useEffect(() => {
    if (route.params?.token) {
      setResetToken(route.params.token);
      // Check code if some code passed initially to the screen
      setTokenValid(codeValidation({ text: route.params.token, required: true }).isValid);
    }
    if (route.params?.email) {
      setEmail(route.params.email);
      // Check email if some email passed initially to the screen
      setEvailValid(
        emailValidation({ text: route.params.email, required: true }).isValid,
      );
    }
  }, [route.params]);

  const redeemPassword = (password: string) => {
    setError('');
    redeemForgotQL({
      variables: {
        email: email,
        forgot_token: resetToken,
        password: password,
      },
    })
      .then((responce) => {
        if (isCredentialsSaved) {
          // TODO: Or check if email saved is equal to the currently forgotten
          // and update creds if so (otherwise resetGenericPassword)
          Keychain.resetGenericPassword();
          credentialsDeleted();
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: routes.LOGIN,
                params: { email: email },
              },
            ],
          }),
        );
      })
      .catch((error) => setError(`${error.message}`));
  };

  const forgotPassword = (email: string) => {
    setError('');
    forgotQL({
      variables: { email: email },
    })
      .then(() => Alert.alert('The email with a link was sent', 'Please check you inbox'))
      .catch((error) => setError(`${error.message}`));
  };

  const onSendCodePressed = () => {
    forgotPassword(email);
  };

  const onConfirmPressed = () => {
    validatePasswordAndConfirmation(newPassword, confirmPassword, setError) &&
      redeemPassword(newPassword);
  };

  const checkValid = () => {
    if (tokenValid && emailValid && passConfValid && passValid) {
      return true;
    }
    return false;
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      style={styles.scrollView}>
      <Input
        required={true}
        notShowRequired={true}
        layoutType="full-line"
        label={I18n.strings('labels.email')}
        text={email}
        onChange={(input, isValid) => {
          setEvailValid(isValid);
          setEmail(input);
        }}
        autoCapitalize="none"
        placeholder={I18n.strings('labels.email')}
        isValid={emailValid}
        validationRule={emailValidation}
      />
      <Button
        buttonType="regular"
        containerStyle={styles.sendCodeButton}
        fetching={fetchingRequestEmail}
        text={I18n.strings('buttons.sendCode')}
        onPress={onSendCodePressed}
        disabled={!emailValid}
      />
      <Input
        required={true}
        notShowRequired={true}
        layoutType="full-line"
        label={I18n.strings('labels.verificationCode')}
        text={resetToken}
        onChange={(input, isValid) => {
          setTokenValid(isValid);
          setResetToken(input);
        }}
        autoCapitalize="characters"
        placeholder={I18n.strings('labels.verificationCode')}
        maxLength={FORGOT_TOKEN_LENGTH}
        isValid={tokenValid}
        validationRule={codeValidation}
      />
      <Input
        required={true}
        notShowRequired={true}
        layoutType="full-line"
        label={I18n.strings('labels.newPassword')}
        text={newPassword}
        onChange={(input, isValid) => {
          setPassValid(isValid);
          updateNewPassword(input);
        }}
        containerStyle={styles.inputMargin}
        autoCapitalize="none"
        secure={true}
        isValid={passValid}
        placeholder={I18n.strings('labels.newPassword')}
        validationRule={passwordValidation}
        maxLength={20}
      />
      <Input
        required={true}
        notShowRequired={true}
        layoutType="full-line"
        label={I18n.strings('labels.confirmPassword')}
        text={confirmPassword}
        onChange={(input, isValid) => {
          setPassConfValid(isValid);
          updateConfirmPassword(input);
        }}
        containerStyle={styles.inputMargin}
        autoCapitalize="none"
        secure={true}
        isValid={passConfValid}
        placeholder={I18n.strings('labels.confirmPassword')}
        validationRule={passwordValidation}
        maxLength={20}
      />
      <Text style={styles.error}>{error}</Text>
      <Button
        containerStyle={styles.mainButton}
        fetching={fetchingRedeem}
        text={I18n.strings('buttons.confirm')}
        onPress={onConfirmPressed}
        disabled={!checkValid()}
      />
    </KeyboardAwareScrollView>
  );
}

export default ResetPasswordScreen;
