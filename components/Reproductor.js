import React, { useState, useEffect } from 'react';
import { Button, Alert, Text } from 'react-native';
import { Audio } from 'expo-av';

export default function Reproductor({ previewUrl }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const playSound = async () => {
    if (!previewUrl) {
      Alert.alert('Sin preview', 'Esta canción no tiene un preview disponible.');
      return;
    }

    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: previewUrl },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          setSound(null);
        }
      });
    } catch (error) {
      console.error('Error al reproducir sonido:', error);
      Alert.alert('Error', 'No se pudo reproducir el preview.');
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (!previewUrl) {
    return <Text style={{ color: '#ccc', marginTop: 10 }}>Sin preview disponible</Text>;
  }

  return (
    <Button
      title={isPlaying ? 'Detener Preview' : 'Reproducir Preview'}
      onPress={playSound}
      color="#1DB954"
    />
  );
}
