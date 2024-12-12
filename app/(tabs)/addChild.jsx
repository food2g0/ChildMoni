import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { db } from '../../firebaseConfig'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddChildScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [pin, setPin] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  // Handle image upload (not saving to Firestore for now)
  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need media library permissions to pick an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update state with selected image
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!name || !age || !pin) {
      Alert.alert('Error', 'Please fill out all fields before submitting.');
      return;
    }

    setLoading(true); // Set loading state to true to show the indicator

    try {
      // Get the current authenticated user's ID
      const auth = getAuth();
      const userId = auth.currentUser.uid; // Get the parent userId from Firebase Authentication

      // Create a reference to the 'children' sub-collection under the current parent's document
      const childrenCollectionRef = collection(db, 'Parent', userId, 'children');

      // Add the new child to the 'children' sub-collection
      await addDoc(childrenCollectionRef, {
        name,
        age,
        pin,
        createdAt: new Date(),
      });

      // Show success alert and navigate back
      Alert.alert('Success', 'Child added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding child: ', error);
      Alert.alert('Error', 'There was an issue adding the child. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false to hide the indicator
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.imageUpload} onPress={handleImageUpload}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <Icon name="camera" size={50} color="#14213d" />
          )}
          <Text style={styles.imageUploadText}>Upload Image</Text>
        </TouchableOpacity>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter child's name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        {/* Age Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter child's age"
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
        </View>

        {/* Pin Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pin</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter child's Pin"
            value={pin}
            onChangeText={(text) => setPin(text)}
            keyboardType="numeric"
            maxLength={4} // Limit to 4 digits
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#14213d" />
          ) : (
            <Text style={styles.submitButtonText}>Add Child</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  imageUpload: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imageUploadText: {
    fontSize: 14,
    fontFamily: 'Poppins-regular',
    color: '#14213d',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-medium',
    color: '#6c757d',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    fontFamily: 'Poppins-regular',
    color: '#14213d',
  },
  submitButton: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-medium',
    color: '#14213d',
  },
});
