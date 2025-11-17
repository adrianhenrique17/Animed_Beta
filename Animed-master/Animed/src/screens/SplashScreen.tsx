import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Logo1 } from "src/convex/_generated/assets";

export default function SplashScreen() {
  const navigation: any = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login"); 
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={Logo1} 
        style={styles.image}
      />
      <Text style={styles.text}>Seja Bem Vindo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", 
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
    borderRadius: 16, 
  },
  text: {
    fontSize: 24,
    color: "#4caf50", 
    fontWeight: "700",
  },
});
