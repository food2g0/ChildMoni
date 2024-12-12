import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icon library for Add button
import MapView, { Marker } from 'react-native-maps'; // Map view for showing location
import { useNavigation } from '@react-navigation/native'; // Hook to access navigation
import { db } from '../firebaseConfig'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

const activitiesList = [
  { id: '1', activity: 'Facebook', timeSpent: '2 hours' },
  { id: '2', activity: 'Youtube', timeSpent: '1.5 hours' },
  { id: '3', activity: 'Tiktok', timeSpent: '1 hour' },
  { id: '4', activity: 'Instagram', timeSpent: '3 hours' },
];

export default function HomeScreen() {
  const [children, setChildren] = useState([]); // State to store children data
  const [loading, setLoading] = useState(true); // Loading state
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const navigation = useNavigation();

 
  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
       
        const auth = getAuth();
        const userId = auth.currentUser ? auth.currentUser.uid : null;

        if (!userId) {
          Alert.alert('Error', 'No user is logged in.');
          return;
        }

        const childCollectionRef = collection(db, 'Parent', userId, 'children');
        const snapshot = await getDocs(childCollectionRef);
        
       
        const childrenData = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name, 
        }));

      
        setChildren(childrenData);
      } catch (error) {
        console.error('Error fetching child users:', error);
        Alert.alert('Error', 'There was an issue fetching the child users.');
      } finally {
        setLoading(false); 
      }
    };

    fetchChildrenData();
  }, []); 

  const addChild = () => {
    navigation.navigate('addChild'); 
  };

  const renderHeader = () => (
    <View style={styles.container}>
   
      <Text style={styles.headerTextOutside}>Your Children</Text>

  
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addChild}>
          <Icon name="plus" size={20} color="#DAECF2" />
        </TouchableOpacity>


        <FlatList
          data={children}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.childItemContainer}
              onPress={() => navigation.navigate('ChildDetails')}
            >
              <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.childImage} /> {/* Static image */}
              <Text style={styles.childName}>{item.name}</Text> {/* Text inside the <Text> component */}
            </TouchableOpacity>
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
        {item.activity} - <Text style={styles.timeSpent}>{item.timeSpent}</Text> {/* Correct placement of text */}
      </Text>
    </View>
  );

  if (loading) {
    // Show loading spinner while fetching data
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFC0CB" />
        <Text style={styles.loadingText}>Loading Children...</Text> {/* Correct placement of loading text */}
      </View>
    );
  }

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
    fontSize: 12,
    color: '#14213d',
    fontFamily: 'Poppins',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 25,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#14213d',
  },
});
