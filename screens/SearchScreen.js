import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { getAccessToken } from '../utils/spotifyAuth';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);

  const searchTracks = async () => {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setTracks(data.tracks.items);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetalleCancion', { song: item })}
    >
      <Image source={{ uri: item.album.images[0].url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.artist}>{item.artists[0].name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar canción..."
        placeholderTextColor="#ccc"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={searchTracks}>
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  info: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  artist: {
    color: '#bbb',
  },
  list: {
    marginTop: 10,
  },
});
