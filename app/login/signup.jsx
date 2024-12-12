import React, { useState, useRef } from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, Pressable, TouchableOpacity, StyleSheet, Modal, ScrollView, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native"; // Import navigati
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export default function Signup() {

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const toggleCheckbox = () => {
    if (!isTermsChecked && !hasReadTerms) {
      setIsModalVisible(true); // Show modal if the terms haven't been read
    } else {
      setIsTermsChecked(!isTermsChecked);
    }
  };
  const handleConfirmRead = () => {
    setHasReadTerms(true);
    setIsModalVisible(false);
    setIsTermsChecked(true);
  };
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigation = useNavigation();
  const [pin, setPin] = useState(["", "", "", ""]); 
  const [focusIndex, setFocusIndex] = useState(0); 
  const pinInputRefs = useRef([]);

  const handlePinChange = (text) => {
    if (/^\d{0,4}$/.test(text)) { // Only allow 4 digits max
      setPin(text);
    }
  };


  const handleLoginPress = () => {
    navigation.navigate("login/login");
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address.";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required.";
    if (!/^\d{11,}$/.test(phone)) return "Phone number must have at least 11 digits.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return "Please confirm your password.";
    if (confirmPassword !== password) return "Passwords do not match.";
    return "";
  };
  const validatePin = (pin) => {
    if (!pin || pin.length !== 4) return "PIN is required and must be 4 digits.";
    return "";
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setPhoneError(validatePhone(value));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value));
  };
  
  const handleSignup = async () => {
    // Perform final validation
    const finalEmailError = validateEmail(email);
    const finalPhoneError = validatePhone(phone);
    const finalPasswordError = validatePassword(password);
    const finalConfirmPasswordError = validateConfirmPassword(confirmPassword);
    const finalPinError = validatePin(pin);
  
    console.log("Email Error:", finalEmailError);
    console.log("Phone Error:", finalPhoneError);
    console.log("Password Error:", finalPasswordError);
    console.log("Confirm Password Error:", finalConfirmPasswordError);
    console.log("PIN Error:", finalPinError);
  
    if (finalEmailError || finalPhoneError || finalPasswordError || finalConfirmPasswordError || finalPinError) {
      setEmailError(finalEmailError);
      setPhoneError(finalPhoneError);
      setPasswordError(finalPasswordError);
      setConfirmPasswordError(finalConfirmPasswordError);
      return;
    }
    setIsLoading(true); // Start loading indicator
    try {
      console.log("Attempting to sign up...");
      // Firebase Authentication: Sign up user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user);
  
      // Firestore: Create a reference to the user's document in the 'Parent' collection
      const userRef = doc(db, "Parent", user.uid); // This is the correct DocumentReference
      console.log("Firestore Document Reference:", userRef);
  
      // Store user details in Firestore under the 'Parent' collection
      await setDoc(userRef, {
        email,
        phone,
        pin,
        createdAt: new Date().toISOString(),
      });
      setIsLoading(false); // Stop loading indicator
      console.log("User data saved to Firestore");
      navigation.navigate("chooseScreen"); // Navigate to home screen
    } catch (error) {
      setIsLoading(false);
      console.error("Error signing up:", error);
      alert("Error signing up: " + error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#007BFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#007BFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          maxLength={11}
        />
      </View>
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
        />
        

        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#007BFF" />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={!showPassword}
        />
      </View>


      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

      <TextInput
        style={styles.pinInput}
        value={pin}
        onChangeText={handlePinChange}
        keyboardType="numeric"
        maxLength={4} // Allow only 4 digits
        placeholder="Enter 4-digit PIN"
        secureTextEntry={false} // Optional: Hide the text
      />

      <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, isTermsChecked && styles.checked]}>
          {isTermsChecked && <Icon name="check" size={14} color="#FFF" />}
        </View>
        <Text style={styles.checkboxText}>
          I agree to the{" "}
          <Text style={styles.link} onPress={() => setIsModalVisible(true)}>
            Terms
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={() => setIsModalVisible(true)}>
            Privacy Policy
          </Text>
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Terms and Privacy Policy</Text>
            <ScrollView style={styles.scrollContainer}>
            <Text style={styles.modalText}>
These Terms and Conditions (“Terms”) govern your use of the MoniChild: Parental Monitoring Application (“ChildMoni”). By downloading, installing, and using the app, you agree to comply with and be bound by these Terms.
1. Acceptance of Terms
By using the app, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must discontinue use of the app immediately.
2. User Eligibility
The app is intended for use by parents or legal guardians of children aged 3-9. By using the app, you represent that you are at least 18 years old or have legal parental or guardian authority over the child being monitored.
3. User Responsibilities
You are responsible for maintaining the confidentiality of your account login credentials.
You agree to use the app solely for monitoring and managing your child’s digital activities, and not for any unlawful or malicious purposes.
You must ensure that you have obtained proper consent from the child and other individuals  before enabling location tracking or other monitoring features.
4. Prohibited Activities
You agree not to:
Use the app in violation of any applicable laws or regulations.
Attempt to reverse-engineer, decompile, or tamper with the app’s code.
Exploit the app to monitor or track any individual without their consent.
5. License
We grant you a limited, non-transferable, non-exclusive, and revocable license to use the app for personal purposes, in accordance with these Terms. You may not use the app for any commercial purposes without our express consent.
6. Third-Party Services
The app integrates with third-party services such as Firebase and Google Maps. By using the app, you agree to comply with the terms and policies of these third-party services.
7. Termination
We reserve the right to suspend or terminate your access to the app at any time, with or without cause or notice. Termination of your account will not limit any of our rights or remedies.
8. Disclaimer of Warranties
The app is provided "as is" without any warranties of any kind, either express or implied. We do not guarantee that the app will be free from errors, bugs, or interruptions.
9. Limitation of Liability
In no event shall we be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of the app.

            </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleConfirmRead}
            >
              <Text style={styles.modalButtonText}>I Have Read</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



      <TouchableOpacity
    style={[styles.button, emailError || phoneError || passwordError || confirmPasswordError || !isTermsChecked || pin.length !== 4 ? { backgroundColor: "#ccc" } : { backgroundColor: "#ADD8E6" }]}
    disabled={!!emailError || !!phoneError || !!passwordError || !!confirmPasswordError || !isTermsChecked || pin.length !== 4}
    onPress={handleSignup}
        
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Pressable onPress={handleLoginPress}>
          <Text style={styles.footerLink}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-medium",
    marginBottom: 40,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#FFC0CB",
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "white",
    marginRight: 10,
    justifyContent: "center", // Center the check icon
    alignItems: "center", // Center the check icon
  },
  checked: {
    backgroundColor: "#007BFF",
  },
  checkboxText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  icon: {
    paddingLeft: 15,
    color: "#2b2d42",
  },
  eyeIcon: {
    paddingRight: 15,
    color: "#1b263b",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#2b2d42",
    fontSize: 18,
    fontFamily: "Poppins-medium",
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins",
  },
  footerLink: {
    fontSize: 14,
    color: "#007BFF",
    marginLeft: 5,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: "70%", // Adjust height as needed
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 20, // Add some spacing for the button
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
    textAlign: "justify",
  },
  modalButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pinInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#FFC0CB",
    borderRadius: 10,
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
});
