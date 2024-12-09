import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './home'; // Assuming you have a HomeScreen component
import OtherScreen from './(tabs)/addChild'; // Other screen if you want to add more to the drawer

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          gestureEnabled: true, // Enable swipe gestures
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Other" component={OtherScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}