import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Alert } from 'react-native';

import { useQuery, useMutation } from '@apollo/react-hooks';

import { useShallowSelector, usePrevious } from '../../../hooks';
import ActivityIndicator from '../../../components/activityIndicator';

import { signOut, saveToken, saveUserId } from '../../../actions/auth';
import { updateUserBlockedStatus } from '../../../actions/app';
import * as routes from '../../../nav/routes';
import { log } from '../../../utils';
import styles from './styles';
import * as errorCodes from '../../../constants/errorCodes';

import { decodeUserId } from '../../../utils/auth';
import { FETCH_PROFILE } from '../../../requests/profileQL';
import { RENEW_AUTH_TOKEN } from '../../../requests/authQL';
import { PROVISION_USER, REFRESH_PROVISIONED_USER } from '../../../requests/deviceQL';

import * as GQL_TYPES from '../../../interfaces/graphQL';

interface Props {
  navigation: any;
}

function StartupLoadingScreen(props: Props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { userId, token } = useShallowSelector(({ auth: { userId, token } }) => ({
    userId,
    token,
  }));

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

  const {
    loading: checkingProfile,
    error: errorCheckProfile,
    data: profileData,
  } = useQuery(FETCH_PROFILE, {
    variables: { user_id: userId },
    fetchPolicy: 'no-cache',
  });

  const [
    renewAuthToken,
    { data: tokenData, loading: renewingToken, error: errorRenew },
  ] = useMutation<GQL_TYPES.RenewParams>(RENEW_AUTH_TOKEN, { variables: { token } });

  // TODO: delete PROVISION_USER - temp thing
  const [provisionUser, { loading: provisioningUser }] = useMutation<
    GQL_TYPES.ProvisionUserParams
  >(PROVISION_USER, {
    variables: {
      user_id: userId,
    },
  });

  const [refreshProvisionedUser, { loading: refreshProvisioningUser }] = useMutation<
    GQL_TYPES.RefreshProvisionedUserParams
  >(REFRESH_PROVISIONED_USER, {
    variables: {
      user_id: userId,
    },
  });

  useEffect(() => {
    !checkingProfile && renewAuthToken();
  }, [checkingProfile]);

  const onProfileLoaded = () => {
    log.debug('profile loaded');
    provisionUser()
      .then(() => navigation.replace(routes.MAIN_FLOW))
      .catch(() => navigation.replace(routes.MAIN_FLOW));
    // refreshProvisionedUser()
    //   .then(() => navigation.replace(routes.MAIN_FLOW))
    //   .catch(() => navigation.replace(routes.MAIN_FLOW));
  };

  const prevRenewingToken = usePrevious(renewingToken);
  useEffect(() => {
    if (prevRenewingToken === true && renewingToken === false) {
      if (errorRenew) {
        log.debug(`Cannot renew token: ${errorRenew}`);
      } else if (tokenData) {
        saveTokenAndUserId(tokenData.renew.token);
      }
      if (errorCheckProfile) {
        log.debug(errorCheckProfile);
        // if there's a 404 error - open create profile stack
        if (
          errorCheckProfile.graphQLErrors[0] &&
          errorCheckProfile.graphQLErrors[0].extensions
        ) {
          const code = errorCheckProfile?.graphQLErrors[0].extensions.response.status;
          if (code === errorCodes.NOT_FOUND) {
            log.debug(
              `Error ${code}: No user profile found. Redirect to create profile screen`,
            );
            navigation.replace(routes.CREATE_PROFILE_STACK);
          } else {
            Alert.alert(`${errorCheckProfile.message}`);
            dispatch(signOut());
            setTimeout(() => dispatch(updateUserBlockedStatus(false)), 200);
          }
        }
      } else {
        if (profileData) {
          log.debug('StartupLoadingScreen: User profile: ', profileData);
          onProfileLoaded();
        }
      }
    }
  }, [renewingToken]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default StartupLoadingScreen;
