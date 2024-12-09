import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icon library for Add button
import MapView, { Marker } from 'react-native-maps'; // Map view for showing location
import { useNavigation } from '@react-navigation/native'; // Hook to access navigation

const childrenList = [
  { id: '1', name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '3', name: 'Mary Johnson', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
];

const activitiesList = [
  { id: '1', activity: 'Facebook', timeSpent: '2 hours' },
  { id: '2', activity: 'Youtube', timeSpent: '1.5 hours' },
  { id: '3', activity: 'Tiktok', timeSpent: '1 hour' },
  { id: '4', activity: 'Instagram', timeSpent: '3 hours' },
];

export default function HomeScreen() {
  const [children, setChildren] = useState(childrenList);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const navigation = useNavigation(); // Accessing navigation

  const addChild = () => {
    const newChild = { id: (children.length + 1).toString(), name: `Child ${children.length + 1}`, image: 'https://randomuser.me/api/portraits/men/2.jpg' };
    setChildren([...children, newChild]); 
  };

  const renderHeader = () => (
    <View style={styles.container}>
      {/* "Your Children" text at the top */}
      <Text style={styles.headerTextOutside}>Your Children</Text>

      {/* Header with child list */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addChild}>
          <Icon name="plus" size={20} color="#DAECF2" />
        </TouchableOpacity>

        {/* Add a button to open the drawer */}
       

        <FlatList
          data={children}
          renderItem={({ item }) => (
            <View style={styles.childItemContainer}>
              <Image source={{ uri: item.image }} style={styles.childImage} />
              <Text style={styles.childName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Map view */}

      <Text style={styles.headerTextOutside}>Location</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChangeComplete={setMapRegion}
        >
      
          <Marker coordinate={mapRegion} />
        </MapView>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <View style={styles.activitySection}>
      <Text style={styles.activityText}>
        {item.activity} - <Text style={styles.timeSpent}>{item.timeSpent}</Text>
      </Text>
    </View>
  );

  return (
    <FlatList
      data={activitiesList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.flatListContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatListContent: {
    flexGrow: 1, // Ensure the FlatList takes all available space
  },
  headerTextOutside: {
    fontSize: 14,
    color: '#14213d',
    fontFamily: 'Poppins-medium',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  headerContainer: {
    backgroundColor: '#DAECF2',
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  childItemContainer: {
    alignItems: 'center',
    marginRight: 30,
  },
  childImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  childName: {
    fontSize: 10,
    color: '#14213d',
    fontFamily: 'Poppins',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  drawerButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  map: {
    height: 300, 
  },
  activitySection: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
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
