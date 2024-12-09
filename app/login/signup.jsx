import React, { useState } from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native"; // Import navigation

export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigation = useNavigation();

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
    if (!/^\d{10,}$/.test(phone)) return "Phone number must have at least 10 digits.";
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

  const handleSignup = () => {
    // Perform final validation
    const finalEmailError = validateEmail(email);
    const finalPhoneError = validatePhone(phone);
    const finalPasswordError = validatePassword(password);
    const finalConfirmPasswordError = validateConfirmPassword(confirmPassword);

    if (finalEmailError || finalPhoneError || finalPasswordError || finalConfirmPasswordError) {
      setEmailError(finalEmailError);
      setPhoneError(finalPhoneError);
      setPasswordError(finalPasswordError);
      setConfirmPasswordError(finalConfirmPasswordError);
      return;
    }

    // If validation passes, navigate to home
    console.log("Signup successful with:", { email, phone, password });
    navigation.navigate("home"); // Navigate to home screen
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

      <TouchableOpacity
        style={[
          styles.button,
          emailError || phoneError || passwordError || confirmPasswordError
            ? { backgroundColor: "#ccc" }
            : { backgroundColor: "#ADD8E6" },
        ]}
        disabled={
          !!emailError || !!phoneError || !!passwordError || !!confirmPasswordError
        }
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
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
});
