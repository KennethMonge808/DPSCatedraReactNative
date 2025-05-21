// screens/SongDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reproductor from '../components/Reproductor';
import { guardarFavorito } from '../utils/storage';

export default function SongDetailScreen({ route, navigation }) {
  const { song } = route.params;
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    verificarSiEsFavorito();
  }, []);

  const verificarSiEsFavorito = async () => {
    try {
      const favoritos = await AsyncStorage.getItem('favorites');
      const favoritosArray = favoritos ? JSON.parse(favoritos) : [];
      const existe = favoritosArray.some(item => item.id === song.id);
      setEsFavorito(existe);
    } catch (error) {
      console.error("Error verificando favoritos:", error);
    }
  };

  const manejarGuardar = async () => {
    await guardarFavorito(song);
    Alert.alert("Guardado", "Canción añadida a favoritos.");
    setEsFavorito(true);
  };

  const manejarEliminar = async () => {
    try {
      const favoritos = await AsyncStorage.getItem('favorites');
      let favoritosArray = favoritos ? JSON.parse(favoritos) : [];
      const nuevosFavoritos = favoritosArray.filter(item => item.id !== song.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(nuevosFavoritos));
      Alert.alert("Eliminado", "Canción eliminada de favoritos.");
      setEsFavorito(false);
    } catch (error) {
      console.error("Error eliminando favorito:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: song.album.images[0].url }}
        style={styles.image}
      />
      <Text style={styles.title}>{song.name}</Text>
      <Text style={styles.artist}>{song.artists[0].name}</Text>
      <Reproductor previewUrl={song.preview_url} />
      <View style={styles.buttonContainer}>
        {esFavorito ? (
          <Button
            title="Eliminar de Favoritos"
            onPress={manejarEliminar}
            color="#FF3333"
          />
        ) : (
          <Button
            title="Guardar en Favoritos"
            onPress={manejarGuardar}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#121212'},
  image: { width: 200, height: 200, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#FFFF' },
  artist: { fontSize: 18, color: '#FFFF', marginBottom: 20 },
  buttonContainer: { marginTop: 20, width: '100%' },
});
