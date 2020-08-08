import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';

import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  NavigationState,
  PartialState,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import rudderClient from '@rudderstack/rudder-sdk-react-native';

import AppGreetingScreen from '../containers/auth/appGreeting';
import LoginScreen from '../containers/auth/login';
import ResetPasswordScreen from '../containers/auth/resetPassword';
import AuthVideo from '../containers/auth/authVideo';
import SignupScreen from '../containers/auth/signup';

import StartupLoadingScreen from '../containers/main/startupLoading';
import CreateProfileStack from './createProfileStack';
import MainFlow from './mainFlow';

import { useShallowSelector } from '../hooks';
import * as routes from './routes';
import { log } from '../utils';
import * as I18n from '../I18n';
import { PREFIX } from '../configs';
import { headerWithNav } from '../configs/headerOptions';
import videos from '../configs/videos';
import Colors from '../configs/colors';
import DataHistoryScreen from '../containers/main/browse/dataHistory';

// TODO: it's only for auth flow
// (make another one and pass to linking prop if you need linking for main flow or other)
const config = {
  [routes.RESET_PASSWORD]: {
    path: 'reset-password',
  },
  [routes.SIGNUP]: {
    path: 'verify-email',
  },
};

// Gets the current screen from navigation state
const getActiveRouteName = (
  state?: NavigationState | PartialState<NavigationState>,
): string => {
  if (state && state.index !== undefined) {
    const route = state.routes[state.index];
    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }
    return route.name;
  }
  return routes.NO_ROUTE_NAME;
};

const Stack = createStackNavigator();

const Navigation = () => {
  const navRef = useRef<NavigationContainerRef>();
  const routeNameRef = useRef<any>();

  // TODO: types
  const { signedIn, internetConnected, shouldHideGetStarted } = useShallowSelector(
    ({
      auth: { signedIn },
      connectivity: { internetConnected },
      app: { shouldHideGetStarted },
    }) => ({
      signedIn,
      internetConnected,
      shouldHideGetStarted,
    }),
  );

  // TODO: remove this and handle no internet situation according to UI/UX docs when they're ready
  if (internetConnected !== true) {
    Alert.alert(
      I18n.strings('errors.noInternet.title'),
      I18n.strings('errors.noInternet.text'),
    );
  }

  useEffect(() => {
    log.debug('Navigation ref: ', navRef);
    // TODO: check initialization - it's not working now
    if (navRef.current === null || navRef.current === undefined) return;
    const state: NavigationState = navRef.current.getRootState();
    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, [navRef]);

  // navigation state change tracking
  const onNavigationStateChange = (state?: NavigationState) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);
    // track into analytics
    if (previousRouteName !== currentRouteName) {
      const screenEventData = {
        stubParam1: 'stubValue1',
        stubData: { data_1: 1, data_2: 2 },
      };
      log.trace('Rudder screen event:', currentRouteName, screenEventData);
      rudderClient.screen(currentRouteName, screenEventData);
    }
    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer
      ref={navRef}
      // TODO: add authFlow configs and main flow configs
      linking={!signedIn ? { prefixes: [PREFIX], config } : undefined}
      onStateChange={(state) => onNavigationStateChange(state)}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.statusBar} // background color only works on Android
        translucent={true}
      />
      <Stack.Navigator screenOptions={headerWithNav}>
        {!signedIn ? (
          // Auth flow - user not signed in
          <>
            {!shouldHideGetStarted && (
              <>
                <Stack.Screen
                  name={routes.APP_GREETING}
                  component={AppGreetingScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name={routes.LANDING}
                  component={AuthVideo}
                  options={{ headerShown: false }}
                  initialParams={{
                    title: I18n.strings('screens.landing.title'),
                    rightText: I18n.strings('buttons.signOrLogin'),
                    nextScreen: routes.LOGIN,
                    source: videos.landingVideo,
                  }}
                />
              </>
            )}
            <Stack.Screen
              name={routes.LOGIN}
              component={LoginScreen}
              options={{
                headerShown: false,
                animationTypeForReplace: shouldHideGetStarted ? 'pop' : undefined,
              }}
            />
            <Stack.Screen
              name={routes.SIGNUP}
              component={SignupScreen}
              options={{ headerTitle: I18n.strings('screens.signUp.title') }}
            />
            <Stack.Screen
              name={routes.RESET_PASSWORD}
              component={ResetPasswordScreen}
              options={{ headerTitle: I18n.strings('screens.forgotPassword.title') }}
            />
          </>
        ) : (
          // User signed in. We check if he has a profile on Loading screen..
          // ..and then either send him to CreateProfile stack, or into the MainFlow
          <>
            <Stack.Screen
              name={routes.STARTUP_LOADING}
              component={StartupLoadingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={routes.CREATE_PROFILE_STACK}
              component={CreateProfileStack}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={routes.MAIN_FLOW}
              component={MainFlow}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={routes.DATA_HISTORY}
              component={DataHistoryScreen}
              options={{ headerTitle: 'Data History' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
