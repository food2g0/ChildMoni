import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

export default function AddChildScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [pin, setPin] = useState('');  
  const [image, setImage] = useState(null);
  
  

  const handleImageUpload = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need media library permissions to pick an image.');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update state with the selected image
    }
  };
  const handleSubmit = () => {
    if (!name || !age || !pin || !image) {
      Alert.alert('Error', 'Please fill out all fields before submitting.');
      return;
    }

    // Submit the data (can be API call or navigation to another screen)
    Alert.alert('Success', 'Child added successfully!');
    // Here you can navigate to a different screen if needed
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#14213d" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Add Child</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Upload Image */}
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Child</Text>
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
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC0CB',
    height: 60,
    paddingHorizontal: 15,
    elevation: 3,
    zIndex: 10,
  },
  backButton: {
    marginRight: 10,
  },
  appBarTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-medium',
    color: '#14213d',
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
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-medium',
    color: '#14213d',
  },
});
