import React from 'react';
import { View } from 'react-native';

import Button from '../../../../components/buttons/buttonNeomorph';

import images from '../../../../configs/images';
import * as routes from '../../../../nav/routes';
import styles from './styles';

interface MenuScreenProps {
  navigation: any; // TODO: add proper navigation type
}

const OPTIONS = [
  'Weight',
  'Blood Pressure',
  'Blood Glucose',
  'Carbs',
  'Activity',
  'Medications',
];

const ROUTES = [
  routes.WEIGHT_INPUT,
  routes.BLOOD_PRESSURE_INPUT,
  routes.BLOOD_GLUCOSE_INPUT,
  routes.CARBS_INPUT,
  routes.ACTIVITY_INPUT,
  routes.MEDICATIONS_INPUT,
];

const ICONS = [
  images.icNavWeight,
  images.icNavHeartRate,
  images.icNavGlucose,
  images.icNavCarbs,
  images.icNavActivity,
  images.icNavMeds
]

const MenuScreen = (props: MenuScreenProps) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      {OPTIONS.map((item, i) => (
        <Button
          key={i}
          text={item}
          leftIcon={ICONS[i]}
          buttonType={'navigation'}
          onPress={() => navigation.navigate(ROUTES[i])}
        />
      ))}
    </View>
  );
};

export default MenuScreen;
