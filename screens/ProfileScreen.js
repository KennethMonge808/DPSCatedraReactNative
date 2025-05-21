import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

// ---------- SETTINGS SCREEN ----------
function SettingsScreen({ navigation }) {
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    imagen: null,
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const cargarPerfil = async () => {
      try {
        const datos = await AsyncStorage.getItem('perfil');
        if (datos) setPerfil(JSON.parse(datos));
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      }
    };

    const focusListener = navigation.addListener('focus', cargarPerfil);
    return focusListener;
  }, [navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.profileContainer}>
        {perfil.imagen ? (
          <Image source={{ uri: perfil.imagen }} style={styles.profileImage} />
        ) : (
          <Text style={{ color: '#1DB954' }}>📷 No hay imagen</Text>
        )}
        <View style={styles.profileInfo}>
          <Text style={styles.text}>Nombre: {perfil.nombre}</Text>
          <Text style={styles.text}>Apellido: {perfil.apellido}</Text>
          <Text style={styles.text}>Correo: {perfil.correo}</Text>
          <Text style={styles.text}>Teléfono: {perfil.telefono}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConfigPerfil')}>
        <Text style={styles.buttonText}>Configurar Perfil</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ---------- CONFIG PERFIL SCREEN ----------
function ConfigPerfilScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [imagen, setImagen] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const cargar = async () => {
      const datos = await AsyncStorage.getItem('perfil');
      if (datos) {
        const perfil = JSON.parse(datos);
        setNombre(perfil.nombre);
        setApellido(perfil.apellido);
        setCorreo(perfil.correo);
        setTelefono(perfil.telefono);
        setImagen(perfil.imagen);
      }
    };
    cargar();
  }, []);

  const seleccionarImagen = async () => {
    const opciones = ['Cámara', 'Galería', 'Cancelar'];
    const respuesta = await new Promise((resolve) => {
      Alert.alert('Seleccionar Imagen', '¿Desde dónde deseas elegir la imagen?', [
        { text: 'Cámara', onPress: () => resolve('camara') },
        { text: 'Galería', onPress: () => resolve('galeria') },
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve(null) },
      ]);
    });

    if (respuesta === 'camara') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No tienes permiso para usar la cámara');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setImagen(result.assets[0].uri);
      }
    } else if (respuesta === 'galeria') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImagen(result.assets[0].uri);
      }
    }
  };

  const guardarPerfil = async () => {
    const perfil = { nombre, apellido, correo, telefono, imagen };
    await AsyncStorage.setItem('perfil', JSON.stringify(perfil));
    Alert.alert('Perfil guardado', 'Los datos se han guardado correctamente');
    navigation.goBack();
  };

  return (
    <Animated.ScrollView contentContainerStyle={[styles.scrollContainer, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={seleccionarImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text>📷 Seleccionar Imagen</Text>
          </View>
        )}
        <TouchableOpacity style={styles.cameraIcon} onPress={seleccionarImagen}>
          <Ionicons name="camera-outline" size={30} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
      <TextInput
        placeholder="Nombre(s)"
        placeholderTextColor="#888"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Apellido(s)"
        placeholderTextColor="#888"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />

      <TextInput
        placeholder="Correo Electrónico"
        placeholderTextColor="#888"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Teléfono"
        placeholderTextColor="#888"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={guardarPerfil}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </Animated.ScrollView>
  );
}

// ---------- STACK NAVIGATOR ----------
const Stack = createStackNavigator();

export default function ProfileScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          
        },
        headerTintColor: '#1DB954',
        headerTitleStyle: {
          fontWeight: 'bold',

        },
        contentStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Perfil' }} />
      <Stack.Screen name="ConfigPerfil" component={ConfigPerfilScreen} options={{ title: 'Editar Perfil' }} />
    </Stack.Navigator>
  );
}

// ---------- ESTILOS ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    padding: 20,
    backgroundColor: '#121212',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginBottom: 20,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "#1DB954",
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 20,
  },
  buttonSection: {
    width: "100%",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#000",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#1DB954",
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#000",
    color: "#1DB954",
  },

  imagePlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    left: '5%',
    transform: [{ translateX: -20 }],
    backgroundColor: '#1DB954',
    borderRadius: 50,
    padding: 7,
  },
});
