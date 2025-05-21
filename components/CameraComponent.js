import { Camera } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { View, Button, Image, Text } from 'react-native';

export default function CameraComponent() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync();
      setPhoto(picture.uri);
    }
  };

  return (
    <View>
      <Camera ref={cameraRef} style={{ height: 300 }} />
      <Button title="Tomar Foto" onPress={takePhoto} />
      {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />}
    </View>
  );
}
