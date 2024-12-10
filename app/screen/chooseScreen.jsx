import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ChooseScreen = () => {
  const navigation = useNavigation();

  const handleParentPress = () => {
    navigation.navigate('Pin'); 
  };

  const handleChildPress = () => {
    navigation.navigate('allChild'); 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.subtitle}>Your peace of mind starts here!..</Text>
      <Text style={styles.title}>Choose User</Text>

      <View style={styles.choiceContainer}>
        
        <TouchableOpacity style={styles.choice} onPress={handleParentPress}>
          <Image
            source={require('./../../assets/images/parent.webp')} 
            style={styles.choiceImage}
          />
          <Text style={styles.choiceText}>Parent</Text>
        </TouchableOpacity>

        {/* Child Button with Image */}
        <TouchableOpacity style={styles.choice} onPress={handleChildPress}>
          <Image
            source={require('./../../assets/images/child.png')} 
            style={styles.choiceImage}
          />
          <Text style={styles.choiceText}>Child</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: "Poppins",
    fontSize: 32,
    textAlign: 'center', 
    marginBottom: 100,
    color: '#333',
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    fontFamily: "Poppins-bold",
    color: '#ADD8E6',
  },
  choiceContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  choice: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  choiceImage: {
    width: 80,  
    height: 80, 
    borderRadius: 40, 
  },
  choiceText: {
    fontSize: 14,
    fontFamily: "Poppins-medium",
    marginTop: 10,
    color: '#333',
  },
});

export default ChooseScreen;
