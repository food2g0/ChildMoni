import React, { useRef, useState } from "react";
import { useNavigation } from "expo-router";  // Correct import for navigation hook
import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  { id: "1", image: require('./../assets/images/onboarding.jpg'), title: "Welcome to MoniChild" },
  { id: "2", image: require('./../assets/images/favicon.png'), title: "Discover Features" },
  { id: "3", image: require('./../assets/images/favicon.png'), title: "Get Started!" },
];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
  const navigation = useNavigation();  

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Handle slide change
  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  // Render each slide
  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  // Render pagination indicators
  const renderIndicator = () =>
    slides.map((_, index) => (
      <View
        key={index}
        style={[styles.indicator, currentIndex === index && styles.activeIndicator]}
      />
    ));

  // Handle "Continue" button press
  const handleContinue = () => {
    navigation.navigate("chooseScreen");  // Directly navigate to chooseScreen
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
      />

    
      <View style={styles.indicatorContainer}>{renderIndicator()}</View>

     
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  slide: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "50%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-bold',
    color: "#333",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 2,
    backgroundColor: "#4a4e69",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#22223b",
    width: 8,
    height: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FFC0CB",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-medium',
    color: "black",
    fontSize: 12,
  },
});
