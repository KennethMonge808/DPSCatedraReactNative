import React, { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
import { Camera } from 'expo-camera';

export default function TakePhotoScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri);
      } catch (error) {
        console.error('Error al tomar la foto:', error);
      }
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No hay acceso a la cámara</Text>;

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      />
      <Button title="Tomar Foto" onPress={takePhoto} />
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={styles.preview}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  camera: {
    flex: 1,
    aspectRatio: 3 / 4,
  },
  preview: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
});
