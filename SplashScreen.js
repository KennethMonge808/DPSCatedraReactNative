import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
  source={require("../rate-repository-app/assets/splash-icon.png")}
  style={stylesSplash.logo}
/>

      <Text style={styles.title}>Bienvenido a Spotify API App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1DB954",
    fontFamily: "Kanit-Regular",
  },
});
