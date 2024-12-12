import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

export default function ChildUserScreen() {
  const navigation = useNavigation();
  const [childUsers, setChildUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
   
    const fetchChildUsers = async () => {
      try {

        const auth = getAuth();
        const userId = auth.currentUser ? auth.currentUser.uid : null;

        if (!userId) {
          Alert.alert('Error', 'No user is logged in.');
          return;
        }

        
        const childCollectionRef = collection(db, 'Parent', userId, 'children');
        const snapshot = await getDocs(childCollectionRef);
        
        // Map the snapshot data to an array
        const childrenData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), 
        }));

        // Set the fetched data in state
        setChildUsers(childrenData);
      } catch (error) {
        console.error('Error fetching child users:', error);
        Alert.alert('Error', 'There was an issue fetching the child users.');
      } finally {
        setLoading(false); 
      }
    };

    fetchChildUsers();
  }, []);


  const handleChildPress = (child) => {
    navigation.navigate('ChildDetails', { child });
  };

  if (loading) {
    
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFC0CB" />
        <Text style={styles.loadingText}>Loading Children...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     

        <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />
     
      <FlatList
        data={childUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.childCard} onPress={() => handleChildPress(item)}>
            <View style={styles.cardHeader}>
              <Icon name="user" size={24} color="#000" />
              <Text style={styles.childName}>{item.name}</Text>
            </View>
            <Text style={styles.childAge}>Age: {item.age}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: "center",
  },
  logo: {
    
    width: 100, 
    height: 100, 
    marginBottom: 20, 
    resizeMode: 'contain', 
  },

  header: {
    paddingLeft: 10,
    fontSize: 22,
    fontFamily: 'Poppins-medium',
    color: '#14213d',
    marginBottom: 15,
  },
  childCard: {
    padding: 15,
    backgroundColor: '#e6f3f8',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  childName: {
    fontSize: 16,
    fontFamily: 'Poppins-medium',
    color: '#000',
    marginLeft: 10,
  },
  childAge: {
    fontSize: 14,
    fontFamily: 'Poppins-regular',
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#14213d',
  },
});
