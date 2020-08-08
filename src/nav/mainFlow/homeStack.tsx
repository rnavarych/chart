import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../containers/main/home';
import MenuScreen from '../../containers/main/home/menu';
import WeightInput from '../../containers/main/home/weight';
import CarbsInput from '../../containers/main/home/carbs';
import MedicationsInput from '../../containers/main/home/medications';
import BloobGlucoseInput from '../../containers/main/home/bloodGlucose';
import BloobPressureInput from '../../containers/main/home/bloodPressure';
import ActivityInput from '../../containers/main/home/activity';

import * as routes from '../routes';
import { headerWithNav, headerWithLogo } from '../../configs/headerOptions';

const Stack = createStackNavigator();
const HomeStack = () => (
  <Stack.Navigator screenOptions={headerWithNav}>
    <Stack.Screen name={routes.HOME} component={HomeScreen} options={headerWithLogo} />
    <Stack.Screen
      name={routes.MENU}
      component={MenuScreen}
      options={{ headerTitle: 'Add Data' }}
    />
    <Stack.Screen
      name={routes.WEIGHT_INPUT}
      component={WeightInput}
      options={{ headerTitle: 'Weight' }}
    />
    <Stack.Screen
      name={routes.CARBS_INPUT}
      component={CarbsInput}
      options={{ headerTitle: 'Carbohydrates' }}
    />
    <Stack.Screen
      name={routes.MEDICATIONS_INPUT}
      component={MedicationsInput}
      options={{ headerTitle: 'Medications' }}
    />
    <Stack.Screen
      name={routes.ACTIVITY_INPUT}
      component={ActivityInput}
      options={{ headerTitle: 'Activity' }}
    />
    <Stack.Screen
      name={routes.BLOOD_GLUCOSE_INPUT}
      component={BloobGlucoseInput}
      options={{ headerTitle: 'Blood Glucose' }}
    />
    <Stack.Screen
      name={routes.BLOOD_PRESSURE_INPUT}
      component={BloobPressureInput}
      options={{ headerTitle: 'Blood Pressure' }}
    />
  </Stack.Navigator>
);

export default HomeStack;
