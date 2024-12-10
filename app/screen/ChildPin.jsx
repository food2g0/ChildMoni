import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'; // Use navigation hook

const ChildPin = () => {
  const [pin, setPin] = useState(['', '', '', '']); // State to store the PIN digits
  const inputs = useRef([]); // Ref to hold input references
  const navigation = useNavigation(); // To navigate to other screens

  // Handle input change for each digit
  const handleChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    // Automatically move focus to the next input field
    if (text && index < 3) {
      inputs.current[index + 1].focus(); // Focus the next input field
    }
  };

  // Handle submit button press
  const handleSubmit = () => {
    const enteredPin = pin.join('');
    if (enteredPin.length === 4) {
   
      navigation.navigate('childHome'); 
    } else {
      Alert.alert('Error', 'Please enter a 4-digit PIN');
    }
  };

  return (
    <View style={styles.container}>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
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
});

export default ChildPin;
