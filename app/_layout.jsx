import React from 'react';
import { TouchableOpacity, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import ProfileScreen from './screen/profileScreen';
import ChooseScreen from './screen/chooseScreen';
import LoginScreen from './login/login';
import HomeScreen from './home';
import SignupScreen from './login/signup';
import Index from './index';
import ChildDetailsScreen from './screen/ChildDetailsScreen';
import BlockScreen from './screen/BlockScreen';
import AppLimitsScreen from './screen/AppLimitsScreen';
import GPSScreen from './screen/GpsScreen';
import ChildLogin from './login/childLogin';
import ChildHome from './childHome';


// Screens for Tabs
import AddChildScreen from './(tabs)/addChild';
import ChildUsersScreen from './(tabs)/childUser';

// Create Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Custom Drawer Content
function CustomDrawerContent(props) {
  const handleLogout = () => {
    // Implement logout logic here
    props.navigation.navigate('login/login');
  };

  return (
    <SafeAreaView style={[styles.drawerContainer, { backgroundColor: '#FFC0CB' }]}>
      {/* Home */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('home')}
      >
        <Text style={styles.drawerText}>Home</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Profile')} 
      >
        <Text style={styles.drawerText}>Profile</Text>
      </TouchableOpacity>

      {/* Tabs */}

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Tabs')}
      >
        <Text style={styles.drawerText}>Child Management</Text>
      </TouchableOpacity>
      
      {/* Logout */}

      <TouchableOpacity
        style={[styles.drawerItem, { backgroundColor: '#FF6B6B' }]} 
        onPress={handleLogout} 
      >
        <Text style={[styles.drawerText, { color: '#FFF' }]}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


function ChildManagementTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#ADD8E6' },
        tabBarActiveTintColor: '#14213d',
        tabBarInactiveTintColor: '#6c757d',
      }}
    >
      <Tab.Screen
        name="Add Child"
        component={AddChildScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon name="user-plus" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Child Users"
        component={ChildUsersScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon name="users" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Home Navigator with Drawer
function HomeWithDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 240,
          backgroundColor: '#FFC0CB',
        },
      }}
    >
      <Drawer.Screen
        name="home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'My Family',
          headerStyle: { backgroundColor: '#FFC0CB' },
          headerTintColor: '#14213d',
          headerTitleStyle: { fontFamily: 'Poppins-medium', fontSize: 16 },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Icon name="bars" size={20} color="#14213d" />
            </TouchableOpacity>
          ),
        })}
      />
         <Drawer.Screen
        name="Profile"
        component={ProfileScreen} // Use ProfileScreen from screen folder
        options={{
          headerTitle: 'Profile',
          headerStyle: { backgroundColor: '#FFC0CB' },
          headerTintColor: '#14213d',
          headerTitleStyle: { fontFamily: 'Poppins-medium', fontSize: 18 },
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Tabs"
        component={ChildManagementTabs} // Tab Navigator for "Add Child" and "Child Users"
        options={{
          headerShown: false,
        }}
      />
       
    </Drawer.Navigator>
  );
}

// Main Stack Navigator
export default function RootLayout() {

  useFonts({
    'Poppins': require('./../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-medium': require('./../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-bold': require('./../assets/fonts/Poppins-Bold.ttf'),
  });

  return (
    <Stack.Navigator   screenOptions={{
      headerStyle: {
        backgroundColor: '#FFC0CB', // Change header background color here
      },
      headerTintColor: '#000', // Change header text color here
      headerTitleStyle: {
        fontFamily:"Poppins-medium",
        fontSize:18
      },
    }}>
      <Stack.Screen
        name="Index"
        component={Index}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chooseScreen"
        component={ChooseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login/login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="childLogin"
        component={ChildLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="childHome"
      component={ChildHome}
      options={{
      headerShown: true,
      title: "Child Account", 
      headerLeft: () => null,
       headerTitleAlign: "center", 
       gestureEnabled: false, 
  }}
/>


       
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      {/* Use HomeWithDrawer here */}
      <Stack.Screen
        name="home"
        component={HomeWithDrawer} // Wrap Home with Drawer
        options={{ headerShown: false }} // Drawer will handle the header
      />
       <Stack.Screen name="ChildDetails" component={ChildDetailsScreen} options={{ title: 'Child Details' }} />
       <Stack.Screen name="BlockScreen" component={BlockScreen} />
  <Stack.Screen name="AppLimitsScreen" component={AppLimitsScreen} />
  <Stack.Screen name="GPSScreen" component={GPSScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight:10,
  },
  drawerItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  drawerText: {
    fontSize: 14,
    color: '#14213d',
    fontFamily: 'Poppins-medium',
  },
});
