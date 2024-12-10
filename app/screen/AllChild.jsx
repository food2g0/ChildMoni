import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const AllChild = () => {
  // Sample data for children
  const children = [
    {
      id: '1',
      name: 'John Doe',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg', // Replace with your image URL
    },
    {
      id: '2',
      name: 'Jane Smith',
      profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg', // Replace with your image URL
    },
    {
      id: '3',
      name: 'Sam Wilson',
      profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg', // Replace with your image URL
    },
  ];

  const navigation = useNavigation(); // Initialize navigation

  // Render function for each child item
  const renderChild = ({ item }) => (
    <TouchableOpacity 
      style={styles.childContainer} 
      onPress={() => navigation.navigate('ChildPin')}
    >
      <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* List of children */}
      <FlatList
        data={children}
        renderItem={renderChild}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-medium",
    marginBottom: 20,
    textAlign: 'center',
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFC0CB',
    borderRadius: 8,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30, // Circular image
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default AllChild;
