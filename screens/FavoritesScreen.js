// screens/FavoritesScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { obtenerFavoritos } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function FavoritesScreen({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const isFocused = useIsFocused(); // 🔁 recarga cuando vuelves

  useEffect(() => {
    const cargarFavoritos = async () => {
      const favoritosGuardados = await obtenerFavoritos();

      // 🔐 FILTRAR DUPLICADOS por id
      const sinDuplicados = favoritosGuardados.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.id === item.id)
      );

      setFavoritos(sinDuplicados);
    };

    if (isFocused) cargarFavoritos();
  }, [isFocused]);

  const eliminarFavorito = async (id) => {
  const favoritosActuales = await obtenerFavoritos();
  const nuevosFavoritos = favoritosActuales.filter(item => item.id !== id);
  await AsyncStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  setFavoritos(nuevosFavoritos);
};

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <TouchableOpacity
      style={{ flexDirection: 'row', flex: 1 }}
      onPress={() => navigation.navigate('DetalleCancion', { song: item })}
    >
      <Image
        source={{ uri: item.album.images[0].url }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.artist}>{item.artists[0].name}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => eliminarFavorito(item.id)}
      style={{ paddingHorizontal: 10, justifyContent: 'center' }}
    >
      <Text style={{ color: '#FF5555' }}>🗑</Text>
    </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()} // asegura string
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ color: '#fff' }}>No hay favoritos guardados.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#121212' },
  item: { flexDirection: 'row', marginBottom: 10 },
  image: { width: 50, height: 50 },
  info: { marginLeft: 10, justifyContent: 'center' },
  title: { fontWeight: 'bold', color: '#FFFFFF' },
  artist: { color: '#fe0fe0' },
});
