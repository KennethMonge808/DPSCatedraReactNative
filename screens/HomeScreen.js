import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>¡Bienvenido a la App de Spotify API!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Buscar")}

      >
        <Text style={styles.buttonText}>Buscar Canciones</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#1DB954',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
