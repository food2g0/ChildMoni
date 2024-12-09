import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icon library for the buttons
import { useNavigation } from '@react-navigation/native'; // Hook to access navigation

const childrenList = [
  { id: '1', name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
];

const activitiesList = [
  { id: '1', activity: 'Facebook', timeSpent: '2 hours' },
  { id: '2', activity: 'Youtube', timeSpent: '1.5 hours' },
  { id: '3', activity: 'Tiktok', timeSpent: '1 hour' },
  { id: '4', activity: 'Instagram', timeSpent: '3 hours' },
];

const ChildDetailsScreen = () => {
  const [children] = useState(childrenList);
  const navigation = useNavigation(); // Hook to access navigation

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* John Doe Profile */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: children[0].image }} style={styles.childImage} />
        <Text style={styles.childName}>{children[0].name}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BlockScreen')}>
          <Icon name="ban" size={20} color="#14213d" />
          <Text style={styles.buttonText}>Block</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AppLimitsScreen')}>
          <Icon name="clock" size={20} color="#14213d" />
          <Text style={styles.buttonText}>App Limits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GPSScreen')}>
          <Icon name="location-arrow" size={20} color="#14213d" />
          <Text style={styles.buttonText}>GPS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderActivity = ({ item }) => (
    <View style={styles.activitySection}>
      <Text style={styles.activityText}>
        {item.activity} - <Text style={styles.timeSpent}>{item.timeSpent}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile and Buttons Section */}
      {renderHeader()}
      <Text>Activities</Text>
      {/* Activity Section */}
      <FlatList
        data={activitiesList}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.activitiesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start', // Align content at the top
    alignItems: 'center', // Center content horizontally
  },
  headerContainer: {
    width: '90%', // Limit width to 90% for spacing
    alignItems: 'center', // Center content
    marginTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20, // Add space between profile and buttons
  },
  childImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  childName: {
    fontSize: 18,
    color: '#14213d',
    fontFamily: 'Poppins-medium',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-evenly', // Space out buttons evenly
    alignItems: 'center', // Align items vertically centered
    marginBottom: 20, // Space between buttons and activity section
  },
  button: {
    backgroundColor: '#FFC0CB',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row', // Ensure icon and text are in a row
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-medium',
    color: '#14213d',
    marginLeft: 8, // Add space between icon and text
  },
  activitiesContainer: {
    width: '90%', // Limit width of activity list
    marginTop: 20,
  },
  activitySection: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    elevation: 3,
  },
  activityText: {
    fontSize: 14,
    color: '#14213d',
    fontFamily: 'Poppins',
  },
  timeSpent: {
    color: '#007BFF', // Style the time spent text
    fontWeight: 'bold',
  },
});

export default ChildDetailsScreen;
