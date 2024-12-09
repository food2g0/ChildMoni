import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, TextInput, Modal, AppState } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppLimitScreen = ({ navigation }) => {
  const [apps, setApps] = useState([
    { id: '1', name: 'Facebook', icon: 'facebook', timer: null, remainingTime: 0 },
    { id: '2', name: 'Instagram', icon: 'instagram', timer: null, remainingTime: 0 },
    { id: '3', name: 'YouTube', icon: 'youtube', timer: null, remainingTime: 0 },
    { id: '4', name: 'Twitter', icon: 'twitter', timer: null, remainingTime: 0 },
  ]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [time, setTime] = useState('');
  const [appState, setAppState] = useState(AppState.currentState); 

  // Timer for countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setApps(prevApps => prevApps.map(app => {
        if (app.remainingTime > 0) {
          return { ...app, remainingTime: app.remainingTime - 1 }; // Decrease time every second
        }
        return app;
      }));
    }, 1000); // Update every second

    // Cleanup interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const handleTimeSet = (appId) => {
    const timeInSeconds = parseInt(time) * 60; // Convert minutes to seconds
    setApps(prevApps => 
      prevApps.map(app => 
        app.id === appId ? { ...app, remainingTime: timeInSeconds } : app
      )
    );
    setTime('');
    setModalVisible(false);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const renderApp = ({ item }) => (
    <View style={styles.appItem}>
      <Icon name={item.icon} size={40} color="#007BFF" />
      <Text style={styles.appName}>{item.name}</Text>
      
      {item.remainingTime > 0 ? (
        <Text style={styles.timerText}>Time Left: {formatTime(item.remainingTime)}</Text>
      ) : (
        <TouchableOpacity
          style={styles.clockButton}
          onPress={() => {
            setSelectedApp(item.id);
            setModalVisible(true);
          }}
        >
          <Icon name="clock-o" size={20} color="#fff" />
          <Text style={styles.clockButtonText}>Set Time</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Limit Screen</Text>
      <Text style={styles.text}>Set time limits for each application:</Text>
      
      <FlatList
        data={apps}
        renderItem={renderApp}
        keyExtractor={(item) => item.id}
      />

      {/* Time setting modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Set Time Limit</Text>
            <TextInput
              style={styles.timeInput}
              keyboardType="numeric"
              placeholder="Enter time in minutes"
              value={time}
              onChangeText={setTime}
            />
            <Button 
              title="Set Time"
              onPress={() => handleTimeSet(selectedApp)}
            />
            <Button 
              title="Cancel"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Button to go back */}
      <Button 
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  appName: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  clockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  clockButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  timerText: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeInput: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AppLimitScreen;
