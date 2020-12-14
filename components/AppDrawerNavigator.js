import React, { Components } from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomSideBarMenu from './CustomSideBarMenu';
import { AppTabNavigator } from './AppTabNavigator';
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/MyDonationScreen';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
    },
    Settings: {
      screen: SettingScreen,
    },
    MyDonations: {
      screen: MyDonationScreen,
    },
  },
  { contentComponent: CustomSideBarMenu },
  { initialRouteName: 'Home' }
);
