import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icon library for apps and buttons

// Sample list of apps
const appList = [
  { id: '1', name: 'Facebook', icon: 'facebook', blocked: false },
  { id: '2', name: 'Instagram', icon: 'instagram', blocked: false },
  { id: '3', name: 'Twitter', icon: 'twitter', blocked: false },
  { id: '4', name: 'YouTube', icon: 'youtube', blocked: false },
];

const BlockScreen = ({ navigation }) => {
  const [apps, setApps] = useState(appList);

  // Function to show the confirmation alert
  const showConfirmation = (id, currentStatus) => {
    Alert.alert(
      'Confirm Action',
      currentStatus ? 'Are you sure you want to unblock this app?' : 'Are you sure you want to block this app?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => toggleBlock(id),
        },
      ]
    );
  };

  // Toggle the block/unblock state
  const toggleBlock = (id) => {
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === id ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  const renderAppItem = ({ item }) => (
    <View style={styles.appItem}>
      <Icon name={item.icon} size={40} color="#0aa2d1" />
      <Text style={styles.appName}>{item.name}</Text>
      <TouchableOpacity
        style={[styles.blockButton, item.blocked ? styles.blocked : styles.unblocked]}
        onPress={() => showConfirmation(item.id, item.blocked)}
      >
        <Text style={styles.buttonText}>{item.blocked ? 'Unblock' : 'Block'}</Text>
        <Icon
          name={item.blocked ? 'unlock' : 'lock'}
          size={20}
          color={item.blocked ? '#0be5a4' : '#ff5b63'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* John Doe Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
      </View>

      <Text style={styles.title}>Manage App Blocking</Text>
      <FlatList
        data={apps}
        renderItem={renderAppItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Button to go back */}
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30, // Adjusted for spacing
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontFamily:"Poppins-medium",
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
  },
  appName: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  blockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  blocked: {
    backgroundColor: '#ff5b63',
  },
  unblocked: {
    backgroundColor: '#009485',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5,
    fontFamily:"Poppins"
  },
  goBackButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#FFC0CB',
    borderRadius: 8,
    alignItems: 'center',
  },
  goBackText: {
    fontSize: 16,
    color: '#000',
    fontFamily:"Poppins"
  },
});

export default BlockScreen;
