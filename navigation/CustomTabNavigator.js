import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CustomTabBar from '../components/BottomTabBar';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/Settings';

const Tab = createBottomTabNavigator();

export default function CustomTabNavigator() {
    const [selectedTab, setSelectedTab] = useState('home');

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
            tabBar={(props) => (
                <CustomTabBar {...props} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            )}
        >
            <Tab.Screen name="Home">
                 {(props) => <HomeScreen {...props} setSelectedTab={setSelectedTab} />}
            </Tab.Screen>
            <Tab.Screen name="Profile">
                {(props) => <ProfileScreen {...props} setSelectedTab={setSelectedTab} />}
            </Tab.Screen>
            <Tab.Screen name="Settings">
                {(props) => <SettingsScreen {...props} setSelectedTab={setSelectedTab} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
