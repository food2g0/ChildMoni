import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { auth, db } from '../firebaseConfig'; // Import your Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods

const Pin = () => {
  const [pin, setPin] = useState(['', '', '', '']); // State for each digit of the PIN
  const [storedPin, setStoredPin] = useState(''); // State to hold the stored PIN
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const inputs = useRef([]); // To store references to the TextInput elements
  const navigation = useNavigation(); // Initialize navigation

  // Fetch the current user's PIN from Firestore
  useEffect(() => {
    const fetchUserPin = async () => {
      try {
        const userRef = doc(db, "Parent", auth.currentUser.uid); // Get reference to current user's document
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setStoredPin(docSnap.data().pin); // Set the PIN from Firestore
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error fetching user PIN:", error);
      }
    };

    if (auth.currentUser) {
      fetchUserPin(); // Fetch PIN if the user is logged in
    }
  }, []);

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

  // Handle backspace for deleting digits
  const handleBackspace = (index) => {
    // If the field is empty and we're not at the first input, move focus to the previous input
    if (pin[index] === '' && index > 0) {
      inputs.current[index - 1].focus(); // Focus the previous input field
    }
  };

  // Handle submit button press
  const handleSubmit = () => {
    const enteredPin = pin.join('');
    if (enteredPin.length === 4) {
      if (enteredPin === storedPin) {
        // PIN matches, navigate to home
        navigation.navigate('home'); // Navigate to home screen
      } else {
        // Show error modal if PIN does not match
        setIsModalVisible(true); // Show modal with error
      }
    } else {
      alert('Please enter a 4-digit PIN');
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <Image source={require('./../assets/images/logo.png')} style={styles.logo} />

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
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index); // Handle backspace press
              }
            }}
            ref={(el) => (inputs.current[index] = el)} // Set ref for each input
            returnKeyType={index === 3 ? 'done' : 'next'} // 'Done' on last input, 'Next' on others
          />
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Custom Modal for incorrect PIN */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Incorrect PIN</Text>
            <Text style={styles.modalMessage}>The entered PIN is incorrect. Please try again.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: 100, 
    height: 100, 
    marginBottom: 20, 
    resizeMode: 'contain', 
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Poppins-medium', 
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pinInput: {
    width: 50,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Poppins', 
  },
  submitButton: {
    backgroundColor: '#0c71e0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-medium', 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins', // Apply Poppins font directly
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Poppins', // Apply Poppins font directly
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins', // Apply Poppins font directly
  },
});

export default Pin;
