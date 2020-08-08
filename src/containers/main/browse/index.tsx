import React, { useLayoutEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import Button from '../../../components/buttons/buttonNeomorph';
import AppInfo from '../../../components/appInfo';

import { useLazyQuery } from '@apollo/react-hooks';
import { FETCH_PROFILE } from '../../../requests/profileQL';

import { ProfileBody } from 'src/requests/profile';
import { useShallowSelector } from '../../../hooks';
import { signOut } from '../../../actions/auth';
import * as routes from '../../../nav/routes';
import * as I18n from '../../../I18n';
import styles from './styles';
import { log } from '../../../utils';
import images from '../../../configs/images';
import { ApolloError } from 'apollo-boost';

interface Props {
  navigation: any; // TODO: add proper navigation type
}

function HomeScreen(props: Props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { userId } = useShallowSelector(({ auth: { userId } }) => ({
    userId,
  }));

  // FETCHING AND OPENING PROFILE
  const [fetchProfile, { loading: fetchingProfile }] = useLazyQuery(FETCH_PROFILE, {
    variables: { user_id: userId },
    fetchPolicy: 'no-cache',
    onCompleted: (profileResult) => {
      log.debug('fetchProfile result: ', profileResult);
      onProfileLoaded(profileResult.fetchProfile);
    },
    onError: (error: ApolloError) => {
      log.debug('getDevices error:', error);
      Alert.alert('Error fetching profile:', error.message);
    },
  });

  const onProfileLoaded = (profile: ProfileBody) => {
    log.debug('On profile loaded:', profile);
    navigation.navigate(routes.PROFILE, {
      profile: profile,
    });
  };

  useLayoutEffect(() => {
    // TODO: CVS-110: this call, somehow, fixes it (?!)
    navigation.setParams({});
  }, [navigation]);

  const showLogoutAlert = () =>
    Alert.alert(
      I18n.strings('logout.title'),
      I18n.strings('logout.description'),
      [
        { text: I18n.strings('buttons.cancel'), onPress: () => {} },
        {
          text: I18n.strings('buttons.confirm'),
          style: 'destructive',
          onPress: () => dispatch(signOut()),
        },
      ],
      { cancelable: true },
    );

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.buttonsGrid}>
          <Button
            text={'Test APIs'}
            onPress={() => navigation.navigate(routes.TEST)}
            buttonType={'navigation'}
            leftIcon={images.browseFaq}
          />
          <Button
            text={I18n.strings('browse.buttons.dataHistory')}
            leftIcon={images.browseDataHistory}
            buttonType={'navigation'}
            onPress={() => navigation.navigate(routes.DATA_HISTORY)}
          />
          <Button
            text={I18n.strings('browse.buttons.goals')}
            leftIcon={images.browseGoals}
            buttonType={'navigation'}
            onPress={() => navigation.navigate(routes.GOALS)}
          />
          <Button
            text={I18n.strings('browse.buttons.rewards')}
            leftIcon={images.browseRewards}
            buttonType={'navigation'}
            onPress={() => navigation.navigate(routes.REWARDS)}
          />
          <Button
            text={I18n.strings('browse.buttons.library')}
            leftIcon={images.browseLibrary}
            buttonType={'navigation'}
            onPress={() => navigation.navigate(routes.LIBRARY)}
          />
          <Button
            text={I18n.strings('browse.buttons.profile')}
            leftIcon={images.browseProfile}
            buttonType={'navigation'}
            onPress={fetchProfile}
          />
          <Button
            text={I18n.strings('browse.buttons.devices')}
            leftIcon={images.browseDevices}
            buttonType={'navigation'}
            onPress={() => navigation.navigate(routes.DEVICES)}
          />
          <Button
            text={I18n.strings('browse.buttons.faq')}
            leftIcon={images.browseFaq}
            buttonType={'navigation'}
            onPress={() => navigation.navigate(routes.FAQ)}
          />
          <Button
            text={I18n.strings('buttons.logout')}
            onPress={showLogoutAlert}
            buttonType={'navigation'}
            leftIcon={images.browseLogout}
          />
        </View>
      </View>
      <AppInfo />
    </ScrollView>
  );
}

export default HomeScreen;
