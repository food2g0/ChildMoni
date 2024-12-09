import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking, Alert } from 'react-native';
import { BackHandler } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const childrenList = [
  { id: '1', name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
];

const activitiesList = [
  { id: '1', activity: 'Facebook', url: 'fb://', name: 'Facebook', icon: 'logo-facebook' },
  { id: '2', activity: 'YouTube', url: 'youtube://', name: 'YouTube', icon: 'logo-youtube' },
  { id: '3', activity: 'TikTok', url: 'tiktok://', name: 'TikTok', icon: 'logo-tiktok' },
  { id: '4', activity: 'Instagram', url: 'instagram://', name: 'Instagram', icon: 'logo-instagram' },
];

export default function ChildHome() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "You can't go back to the login screen.", [
        { text: "OK", onPress: () => null }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [children, setChildren] = useState(childrenList);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const navigation = useNavigation();

  // Function to open the app based on the URL
  const openApp = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("App not installed", "The app is not installed on your device.");
      }
    });
  };

  const renderHeader = () => (
    <View style={styles.container}>
      {/* Header with child image */}
      <View style={styles.headerContainer}>
        {children.map((child) => (
          <View key={child.id} style={styles.childItemContainer}>
            <Image source={{ uri: child.image }} style={styles.childImageLarge} />
            <Text style={styles.childNameLarge}>{child.name}</Text>
          </View>
        ))}
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
      <Text style={styles.activityText}>{item.activity}</Text>
      <TouchableOpacity
        style={styles.openAppButton}
        onPress={() => openApp(item.url)} // Open the app when clicked
      >
        <Icon name={item.icon} size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Open {item.name}</Text>
      </TouchableOpacity>
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
    flexGrow: 1,
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
    alignItems: 'center',
    backgroundColor: '#DAECF2',
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  childItemContainer: {
    alignItems: 'center',
  },
  childImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  childNameLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#14213d',
    fontFamily: 'Poppins',
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
    marginBottom: 10,
  },
  openAppButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row', // Added to make icon and text align in row
    justifyContent: 'center', // Center align content horizontally
    marginTop: 10,
  },
  icon: {
    marginRight: 10, // Spacing between icon and text
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
});
