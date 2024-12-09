import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GPSScreen = ({ navigation }) => {
  const johnDoeLocation = {
    latitude: 37.7749, // Example coordinates (San Francisco)
    longitude: -122.4194,
  };

  return (
    <View style={styles.container}>
      {/* John Doe's Picture */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.image}
        />
        <Text style={styles.title}>John Doe</Text>
      </View>

      {/* Map Section */}
      <MapView
        style={styles.map}
        initialRegion={{
          ...johnDoeLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Marker for John Doe */}
        <Marker coordinate={johnDoeLocation} title="John Doe" />
      </MapView>

      {/* Button to go back */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  map: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default GPSScreen;
