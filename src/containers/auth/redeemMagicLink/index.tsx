import React, { useState } from 'react';
import { Text, View, Switch } from 'react-native';
import Button from '../../../components/buttons/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import { signIn, saveToken, saveUserId } from '../../../actions/auth';
import { decodeUserId } from '../../../utils/auth';
import { REDEEM_MAGIC_LINK } from '../../../requests/authQL';

import * as I18n from '../../../I18n';
import styles from './styles';
import { log } from '../../../utils';

interface Props {
  navigation: any;
  route: any;
}

function RedeemMagicLinkScreen(props: Props) {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const [redeemMagicQL, { loading: fetching }] = useMutation(REDEEM_MAGIC_LINK);

  const redeemMagicLink = () => {
    setError('');
    redeemMagicQL({
      variables: {
        email: route.params.email,
        code: route.params.code,
        remember_me: remember,
      },
    })
      .then((responce) => {
        saveTokenAndUserId(responce.data.redeemMagicLink.token) &&
          dispatch(signIn(route.params.email));
      })
      .catch((error) => setError(`${error.message}`));
  };

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

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        style={styles.scrollView}>
        <Text>Congratulations! Now you can log in!</Text>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.buttonsContainer}>
          <Button
            fetching={fetching}
            text={I18n.strings('buttons.login')}
            onPress={() => redeemMagicLink()}
          />
        </View>
        <View style={styles.rememberMeContainer}>
          <Text>Remember me: </Text>
          <Switch onValueChange={setRemember} value={remember} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default RedeemMagicLinkScreen;
