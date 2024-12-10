import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Pin = () => {
  const [pin, setPin] = useState(['', '', '', '']); // State for each digit of the PIN
  const inputs = useRef([]); // To store references to the TextInput elements
  const navigation = useNavigation(); // Initialize navigation

  // Handle input change for each digit
  const handleChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    // Automatically move focus to the next input box
    if (text && index < 3) {
      inputs.current[index + 1].focus(); // Focus the next input field
    }
  };

  // Handle submit button press
  const handleSubmit = () => {
    const enteredPin = pin.join('');
    if (enteredPin.length === 4) {
      // Example: Validate the PIN or navigate to another screen
      navigation.navigate('home'); // Navigate to home screen
    } else {
      alert('Please enter a 4-digit PIN');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <Image
     source={require('./../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Enter 4-Digit PIN</Text>

      <View style={styles.pinInputContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.pinInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            ref={(el) => (inputs.current[index] = el)} // Set ref for each input
            returnKeyType={index === 3 ? 'done' : 'next'} // 'Done' on last input, 'Next' on others
          />
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,  // Set the logo's width
    height: 100, // Set the logo's height
    marginBottom: 20, // Space between the logo and the title
    resizeMode: 'contain', // Ensures the logo scales properly
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pinInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default Pin;
