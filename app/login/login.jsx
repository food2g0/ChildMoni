import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth } from '../../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message
  const navigation = useNavigation();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setErrorMessage(""); // Reset error message on each login attempt
    if (!email || !password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user);
      navigation.navigate('chooseScreen'); // Navigate to choose screen
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("Invalid credentials or network issue.");
    }
  };

  const handleSignupPress = () => {
    navigation.navigate('signup'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image source={require('./../assets/images/logo.png')} style={styles.logo} /> */}
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome To</Text>
        <Text style={styles.backText}>Child Moni!</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#007BFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} 
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)} 
        >
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Display validation error message if any */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Pressable onPress={handleSignupPress}>
          <Text style={styles.footerLink}>Sign-Up</Text>
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
  },
  welcomeContainer: {
    marginTop: 50,
    flexDirection: "column", 
    alignItems: "flex-start", 
    marginBottom: 80, 
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Poppins-medium', 
    color: "#003741", 
  },
  backText: {
    fontSize: 20,
    fontFamily: 'Poppins-medium',
    color: "#ff9ed1",
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
  input: {
    flex: 1,
    height: "100%",
    paddingLeft: 15,
    fontSize: 16,
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
    backgroundColor: "#ADD8E6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#2b2d42",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#2b2d42",
    fontFamily: "Poppins",
  },
  footerLink: {
    fontSize: 14,
    color: "#007BFF",
    marginLeft: 10,
    fontFamily: "Poppins",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
});
