import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';

import EStyleSheet from 'react-native-extended-stylesheet';

import IconButton from '../components/buttons/iconButton';
import PointsCounter from '../components/pointsCounter';

import images from './images';
import Colors from './colors';
import { Image } from 'react-native';

export const headerWithLogo: StackNavigationOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: Colors.bgLightGray },
  headerLeft: () => (
    <IconButton source={images.headerLogoCvs} imageStyle={styles.headerLogo} />
  ),
  headerRight: () => <PointsCounter containerStyle={styles.pointsCounter} />,
  headerTitle: '',
  headerTitleAlign: 'center',
  headerTintColor: Colors.white,
};

export const headerWithNav: StackNavigationOptions = {
  headerShown: true,
  headerBackImage: () => (
    <Image source={images.arrowBack} style={styles.backButton} resizeMode="contain" />
  ),
  headerBackTitle: ' ',
  headerStyle: { backgroundColor: Colors.bgLightGray },
  headerTitleAlign: 'center',
  headerTintColor: Colors.blueWood,
};

const styles = EStyleSheet.create({
  headerLogo: {
    width: 60,
    height: 30,
    marginLeft: 30,
  },
  pointsCounter: {
    marginRight: 20,
  },
  backButton: {
    height: 20,
  },
});
