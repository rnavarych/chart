import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BrowseStack from './browseStack';
import HomeStack from './homeStack';

import TabButton from '../../components/buttons/tabButton';

import * as routes from '../routes';
import * as I18n from '../../I18n';
import { DEFAULT_TABBAR_HEIGHT } from '../../constants';
import Colors from '../../configs/colors';
import images from '../../configs/images';
import EStyleSheet from 'react-native-extended-stylesheet';

const Tab = createBottomTabNavigator();

interface TabIconOptions {
  focused: boolean;
  color: string;
  size: number;
}

// TODO: replace png icons with SVG
const HomeTabIcon = (props: TabIconOptions) => {
  return TabButton(
    props,
    I18n.strings('tab.home'),
    images.tab_summary,
    images.tab_summary_selected,
  );
};

const BrowseTabIcon = (props: TabIconOptions) => {
  return TabButton(
    props,
    I18n.strings('tab.browse'),
    images.tab_browse,
    images.tab_browse_selected,
  );
};

function MainFlow() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.accent1,
        inactiveTintColor: Colors.black,
        showLabel: false,
        tabStyle: {
          justifyContent: 'center',
          height: DEFAULT_TABBAR_HEIGHT,
        },
        style: {
          height: DEFAULT_TABBAR_HEIGHT + insets.bottom,
          backgroundColor: EStyleSheet.value('$screenBackground'),
        },
      }}>
      <Tab.Screen
        name={routes.HOME_STACK}
        component={HomeStack}
        options={{
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name={routes.BROWSE_STACK}
        component={BrowseStack}
        options={{
          tabBarIcon: BrowseTabIcon,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainFlow;
