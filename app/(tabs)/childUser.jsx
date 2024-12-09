import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function ChildUserScreen() {
  const navigation = useNavigation();

  // Static data for child users
  const childUsers = [
    { id: '1', name: 'John Doe', age: 10, email: 'john.doe@example.com', birthday: '2013-06-15' },
    { id: '2', name: 'Jane Smith', age: 8, email: 'jane.smith@example.com', birthday: '2015-03-22' },
    { id: '3', name: 'Alice Brown', age: 12, email: 'alice.brown@example.com', birthday: '2011-09-09' },
  ];

  // Function to navigate to the details screen
  const handleChildPress = (child) => {
    navigation.navigate('ChildDetails', { child });
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>My Children</Text>
      </View>

      <Text style={styles.header}>Child Users</Text>

      {/* List of child users */}
      <FlatList
        data={childUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.childCard} onPress={() => handleChildPress(item)}>
            <View style={styles.cardHeader}>
              <Icon name="user" size={24} color="#000" />
              <Text style={styles.childName}>{item.name}</Text>
            </View>
            <Text style={styles.childAge}>Age: {item.age}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC0CB',
    height: 60,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    color: '#14213d',
  },
  appBarTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-medium',
    color: '#14213d',
  },
  header: {
    paddingLeft: 10,
    fontSize: 22,
    fontFamily: 'Poppins-medium',
    color: '#14213d',
    marginBottom: 15,
  },
  childCard: {
    padding: 15,
    backgroundColor: '#FFC0CB',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  childName: {
    fontSize: 16,
    fontFamily: 'Poppins-medium',
    color: '#000',
    marginLeft: 10,
  },
  childAge: {
    fontSize: 14,
    fontFamily: 'Poppins-regular',
    color: '#000',
  },
});
