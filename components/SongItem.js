import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SongItem = ({ song }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const parsed = storedFavorites ? JSON.parse(storedFavorites) : [];
      const exists = parsed.some(fav => fav.id === song.id);
      setIsFavorite(exists);
    } catch (error) {
      console.error("Error comprobando favoritos", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      const index = favorites.findIndex(fav => fav.id === song.id);

      if (index !== -1) {
        // Eliminar de favoritos
        favorites.splice(index, 1);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(false);
        Alert.alert('Favorito eliminado', `"${song.title}" ha sido eliminado de tus favoritos.`);
      } else {
        // Añadir a favoritos
        favorites.push(song);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(true);
        Alert.alert('Guardado exitosamente', `"${song.title}" ha sido añadido a favoritos.`);
      }
    } catch (error) {
      console.error("Error al guardar/eliminar favorito", error);
    }
  };

  return (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontSize: 16 }}>{song.title}</Text>
      <TouchableOpacity onPress={toggleFavorite}>
        <Text style={{ color: isFavorite ? 'red' : 'blue' }}>
          {isFavorite ? 'Eliminar de favoritos' : 'Guardar en favoritos'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SongItem;
