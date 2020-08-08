import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import Text from '../../../components/text';
import Input from '../../../components/inputNeomorph';
import Button from '../../../components/buttons/buttonNeomorph';

import {
  passwordValidation,
  emailValidation,
  codeValidation,
} from '../../../utils/validation';
import {
  REGISTER_USER,
  REQUEST_VERIFICATION_EMAIL,
  VERIFY_USER_EMAIL,
} from '../../../requests/authQL';
import {
  saveToken,
  saveUserId,
  signIn,
  saveRegistrationEmail,
  deleteRegistrationEmail,
} from '../../../actions/auth';
import { decodeUserId } from '../../../utils/auth';
import {
  validatePasswordAndConfirmation,
  validateEmail,
} from '../../../utils/validation';
import { useShallowSelector } from '../../../hooks';

import * as I18n from '../../../I18n';
import styles from './styles';
import log from '../../../utils/log';
import * as errorCodes from '../../../constants/errorCodes';

interface Props {
  navigation: any; // TODO: add proper navigation type
  route: any;
}

function SignupScreen(props: Props) {
  const { navigation, route } = props;
  const { userId: savedUserId, regEmail } = useShallowSelector(
    ({ auth: { userId, regEmail } }) => ({
      userId,
      regEmail,
    }),
  );

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeValid, setCodeValid] = useState(false);
  const [passValid, setPassValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passConfValid, setPassConfValid] = useState(false);
  const [password, setPass] = useState('');
  const [passwordConfirm, setPassConfirm] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState(
    regEmail ? regEmail : '',
  );
  const [lastUserId, setLastUserId] = useState(savedUserId ? savedUserId : '');

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      setEmailValid(
        emailValidation({ text: route.params.email, required: true }).isValid,
      );
    }
    if (route.params?.code) {
      setCode(route.params.code);
      setCodeValid(codeValidation({ text: route.params.code, required: true }).isValid);
    }
    // log.debug('saved userId', savedUserId);
    // log.debug('last userId', lastUserId);
    // log.debug('reg email', regEmail);
    // log.debug('last registered email', lastRegisteredEmail);
  }, [route.params]);

  const VERIFICATION_CODE_LENGTH = 12;

  const [registerQL, { loading: fetchingRegister }] = useMutation(REGISTER_USER);
  // TODO import mutation
  const [requestEmailQL, { loading: fetchingRequestEmail }] = useMutation(
    REQUEST_VERIFICATION_EMAIL,
  );
  const [verifyUserQL, { loading: fetchingVerifyUser }] = useMutation(VERIFY_USER_EMAIL);

  const saveTokenAndUserId = (token: string): boolean => {
    if (token) {
      const userId = decodeUserId(token);
      if (userId) {
        dispatch(saveToken(token));
        dispatch(saveUserId(userId));
        setLastUserId(userId);
        setLastRegisteredEmail(email);
        return true; // success, token is valid and will be saved
      }
    }
    return false;
  };

  const registerUser = () => {
    setError('');
    registerQL({
      variables: { email },
    })
      .then((responce) => {
        saveTokenAndUserId(responce.data.register.token);
        dispatch(saveRegistrationEmail(email));
        Alert.alert('Verification code was sent', 'Please check your email');
      })
      .catch((error) => {
        log.debug(error);
        if (error.graphQLErrors[0] && error.graphQLErrors[0].extensions) {
          const errorCode = error?.graphQLErrors[0].extensions.response.status;
          if (errorCode === errorCodes.CONFLICT) {
            log.debug(`Error ${errorCode}: Email already exists`);
            setError('User with provided email already exists');
          } else {
            setError(`${error.message}`);
          }
        }
      });
  };

  // 409 -> user already verified
  // 401 -> unauthorized
  const requestVerificationEmail = () => {
    if (lastUserId) {
      setError('');
      requestEmailQL({
        variables: { user_id: lastUserId },
      })
        .then((responce) => {
          Alert.alert('Verification code was sent', 'Please check your email');
        })
        .catch((error) => {
          log.debug(error);
          if (error.graphQLErrors[0] && error.graphQLErrors[0].extensions) {
            const errorCode = error?.graphQLErrors[0].extensions.response.status;
            if (errorCode === errorCodes.CONFLICT) {
              log.debug(`Error ${errorCode}: Email already verified`);
            }
            setError(`${error.message}`);
          }
        });
    }
  };

  // 409 -> conflict
  const verifyUser = () => {
    setError('');
    verifyUserQL({
      variables: { user_id: lastUserId, email, password, code },
    })
      .then((responce) => {
        log.debug(responce);
        const success: boolean = saveTokenAndUserId(responce.data.verifyUserEmail.token);
        if (success) {
          dispatch(deleteRegistrationEmail());
          dispatch(signIn(email));
        }
      })
      .catch((error) => {
        setError(`${error.message}`);
      });
  };

  // TODO: Leave for now because it gives message if passwords not match
  const validateFieldsForRegister = (): boolean => {
    if (!validatePasswordAndConfirmation(password, passwordConfirm, setPasswordError)) {
      return false;
    }
    return true;
  };

  const onSendCodePress = () => {
    // TODO: could be deleted because we have checks in the input itself
    // I leave it by now
    if (validateEmail(email, setError)) {
      // log.debug('on "Send Code" Press');
      // log.debug('Last userId', lastUserId);
      // log.debug('Last email', lastRegisteredEmail);
      // log.debug('Email', email);
      if (lastUserId && lastRegisteredEmail && lastRegisteredEmail === email) {
        requestVerificationEmail();
      } else {
        registerUser();
      }
    }
  };

  const onRegisterPressed = () => {
    validateFieldsForRegister() && verifyUser();
  };

  const checkValid = () => {
    if (lastUserId && emailValid && passConfValid && passValid && codeValid) {
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
        label={I18n.strings('labels.email')}
        text={email}
        layoutType="full-line"
        onChange={(input, isValid) => {
          setEmailValid(isValid);
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
        fetching={fetchingRegister || fetchingRequestEmail}
        text={I18n.strings('buttons.sendCode')}
        onPress={onSendCodePress}
        disabled={!emailValid}
      />
      <Input
        layoutType="full-line"
        required={true}
        notShowRequired={true}
        label={I18n.strings('labels.verificationCode')}
        text={code}
        onChange={(input, isValid) => {
          setCodeValid(isValid);
          setCode(input);
        }}
        autoCapitalize="characters"
        placeholder={I18n.strings('labels.verificationCode')}
        maxLength={VERIFICATION_CODE_LENGTH}
        isValid={codeValid}
        validationRule={codeValidation}
      />
      <Input
        layoutType="full-line"
        required={true}
        notShowRequired={true}
        label={I18n.strings('labels.password')}
        text={password}
        onChange={(input, isValid) => {
          setPassValid(isValid);
          setPass(input);
        }}
        containerStyle={styles.inputMargin}
        secure={true}
        autoCapitalize="none"
        isValid={passValid}
        placeholder={I18n.strings('labels.password')}
        validationRule={passwordValidation}
        maxLength={20}
      />
      <Input
        layoutType="full-line"
        required={true}
        notShowRequired={true}
        label={I18n.strings('labels.confirmPassword')}
        text={passwordConfirm}
        onChange={(input, isValid) => {
          setPassConfValid(isValid);
          setPassConfirm(input);
        }}
        containerStyle={styles.inputMargin}
        secure={true}
        isValid={passConfValid}
        autoCapitalize="none"
        placeholder={I18n.strings('labels.confirmPassword')}
        validationRule={passwordValidation}
        maxLength={20}
      />
      <Text style={styles.error}>{passwordError}</Text>
      <Text style={styles.error}>{error}</Text>
      <Button
        containerStyle={styles.mainButton}
        fetching={fetchingVerifyUser}
        text={I18n.strings('buttons.register')}
        onPress={onRegisterPressed}
        disabled={!checkValid()}
      />
    </KeyboardAwareScrollView>
  );
}

export default SignupScreen;
