import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddChildScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [image, setImage] = useState(null); // Placeholder for image upload logic

  const handleImageUpload = () => {
    // Placeholder logic for uploading an image
    console.log("Upload Image");
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

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
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
    paddingTop: 80, // Adjust to prevent overlap with the app bar
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
