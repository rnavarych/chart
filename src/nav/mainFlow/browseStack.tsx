import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseScreen from '../../containers/main/browse';
import DataHistoryScreen from '../../containers/main/browse/dataHistory';
import GoalsScreen from '../../containers/main/browse/goals';
import RewardsScreen from '../../containers/main/browse/rewards';
import LibraryScreen from '../../containers/main/browse/library';
import ExercisesScreen from '../../containers/main/browse/exercises';
import ExerciseDetails from '../../containers/main/browse/exerciseDetails';
import TipsScreen from '../../containers/main/browse/tips';
import ProfileScreen from '../../containers/main/profile';
import DevicesScreen from '../../containers/main/browse/devices';
import AddDeviceScreen from '../../containers/main/browse/addDevice';
import FAQScreen from '../../containers/main/browse/faq';
import TempScreen from '../../containers/main/browse/temp';

import * as routes from '../routes';
import { headerWithLogo, headerWithNav } from '../../configs/headerOptions';

const Stack = createStackNavigator();
const BrowseStack = () => (
  <Stack.Navigator screenOptions={headerWithNav}>
    <Stack.Screen
      name={routes.BROWSE}
      component={BrowseScreen}
      options={headerWithLogo}
    />
    <Stack.Screen
      name={routes.GOALS}
      component={GoalsScreen}
      options={{ headerTitle: 'Goals' }}
    />
    <Stack.Screen
      name={routes.REWARDS}
      component={RewardsScreen}
      options={{ headerTitle: 'Rewards' }}
    />
    <Stack.Screen
      name={routes.LIBRARY}
      component={LibraryScreen}
      options={{ headerTitle: 'Library' }}
    />
    <Stack.Screen
      name={routes.EXERCISES}
      component={ExercisesScreen}
      options={{ headerTitle: 'Exercises' }}
    />
    <Stack.Screen
      name={routes.EXERCISE_DETAILS}
      component={ExerciseDetails}
      options={{ headerTitle: 'Exercise Details' }}
    />
    <Stack.Screen
      name={routes.TIPS}
      component={TipsScreen}
      options={{ headerTitle: 'Tips' }}
    />
    <Stack.Screen
      name={routes.PROFILE}
      component={ProfileScreen}
      initialParams={{
        editMode: true,
      }}
      options={{ headerTitle: 'Profile' }}
    />
    <Stack.Screen
      name={routes.DEVICES}
      component={DevicesScreen}
      options={{ headerTitle: 'Devices' }}
    />
    <Stack.Screen
      name={routes.ADD_DEVICE}
      component={AddDeviceScreen}
      options={{ headerTitle: 'Add Device' }}
    />
    <Stack.Screen
      name={routes.FAQ}
      component={FAQScreen}
      options={{ headerTitle: 'FAQ' }}
    />
    <Stack.Screen
      name={routes.TEST}
      component={TempScreen}
      options={{ headerTitle: 'FAQ' }}
    />
  </Stack.Navigator>
);

export default BrowseStack;
