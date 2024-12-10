import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CustomCheckboxExample() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, isChecked && styles.checked]} />
        <Text style={styles.label}>I agree to the Terms and Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "white",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#007BFF",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});
