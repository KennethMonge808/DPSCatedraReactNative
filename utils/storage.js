// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarFavorito = async (song) => {
  try {
    const favoritos = await obtenerFavoritos();

    const yaExiste = favoritos.some(fav => fav.id === song.id);
    if (yaExiste) return;

    favoritos.push(song);
    await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
  } catch (error) {
    console.error('Error al guardar favorito:', error);
  }
};

export const obtenerFavoritos = async () => {
  try {
    const favoritos = await AsyncStorage.getItem('favoritos');
    const parsed = favoritos ? JSON.parse(favoritos) : [];

    // Elimina duplicados por ID
    const filtrados = parsed
      .filter(item => item && item.id)
      .filter((item, index, self) =>
        index === self.findIndex(t => t.id === item.id)
      );

    return filtrados;
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    return [];
  }
};
