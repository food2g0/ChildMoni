import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image, replace with real image URL
          style={styles.profilePicture}
        />
        <Text style={styles.userName}>John Doe</Text>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        {/* Name */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>John Doe</Text>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={16} color="#14213d" />
          </TouchableOpacity>
        </View>

        {/* Email */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={16} color="#14213d" />
          </TouchableOpacity>
        </View>

        {/* Phone Number */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>+639123456789</Text>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={16} color="#14213d" />
          </TouchableOpacity>
        </View>

        {/* Birthday */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Birthday:</Text>
          <Text style={styles.detailValue}>Apr 6, 2002</Text>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={16} color="#14213d" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#FFC0CB',
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontFamily: 'Poppins-medium',
    color: '#14213d',
  },
  detailsContainer: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#6c757d',
  },
  detailValue: {
    flex: 2,
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#14213d',
  },
  editButton: {
    padding: 5,
    marginLeft: 10,
  },
});
