import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioRecorderScreen() {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [audioUri, setAudioUri] = useState(null);

  // Solicitar permisos al iniciar
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso requerido', 'Se requieren permisos de micrófono para grabar audio.');
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.error('Error al comenzar grabación:', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
    } catch (err) {
      console.error('Error al detener grabación:', err);
    }
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.error('Error al reproducir audio:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎤 Grabar Audio</Text>
      <Button
        title={recording ? 'Detener' : 'Grabar'}
        onPress={recording ? stopRecording : startRecording}
      />
      {audioUri && (
        <>
          <Button title="▶️ Reproducir Audio" onPress={playSound} />
          <Text style={styles.path}>Audio guardado en: {audioUri}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  path: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  },
});
