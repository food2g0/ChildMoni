import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import icons

export default function childLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigation = useNavigation(); // Initialize navigation

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in both email and password.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    console.log("Email:", email, "Password:", password);
    navigation.navigate('childHome'); // Navigate to home screen
  };

  const handleSignupPress = () => {
    navigation.replace('signup'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.backText}>Back!</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      
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
    fontSize: 28,
    fontFamily: 'Poppins-medium',
    color: "#003741",
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
});
