import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../Screens/Home/Index';
import Notifications from '../../Screens/Notifications';
import Menu from '../../Screens/Menu/MainMenu/index';
import TabIcon from './TabIcon';
import bottomTabNavigatorStyles from './style';

import { ImageSourcePropType, Pressable } from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarButton = (props: any) => (
  <Pressable android_ripple={{ color: 'transparent' }} {...props} />
);

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const createIcon = (iconSource: ImageSourcePropType) => {
  return ({ color, focused }: TabBarIconProps) => (
    <TabIcon focused={focused} color={color} iconSource={iconSource} />
  );
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        ...bottomTabNavigatorStyles,
        tabBarButton: TabBarButton,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: createIcon(
            require('../../Assets/Images/ClipboardText.png')
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: createIcon(require('../../Assets/Images/Bell.png')),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: createIcon(require('../../Assets/Images/List.png')),
        }}
      />
    </Tab.Navigator>
  );
}