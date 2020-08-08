import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthVideo from '../containers/auth/authVideo';
import ProfileScreen from '../containers/main/profile';
import RewardsIntroScreen from '../containers/auth/rewardsIntro';

import * as routes from './routes';
import { headerWithLogo } from '../configs/headerOptions';
import * as I18n from '../I18n';
import videos from '../configs/videos';

const Stack = createStackNavigator();
const CreateProfileStack = () => (
  <Stack.Navigator screenOptions={headerWithLogo}>
    <Stack.Screen
      name={routes.DATA_SECURITY_VIDEO}
      component={AuthVideo}
      initialParams={{
        title: I18n.strings('screens.securityIntro.title'),
        rightText: I18n.strings('buttons.createProfile'),
        nextScreen: routes.CREATE_PROFILE,
        source: videos.dataSecurity,
      }}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.CREATE_PROFILE}
      component={ProfileScreen}
      initialParams={{
        editMode: false,
      }}
    />
    <Stack.Screen name={routes.REWARDS_INTRO} component={RewardsIntroScreen} />
  </Stack.Navigator>
);

export default CreateProfileStack;
