import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Librería para íconos
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// Splash Screen
function SplashScreen({ navigation }) {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.5))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Animated.View style={[stylesSplash.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <Image
        source={require("./assets/splash-icon.png")}
        style={stylesSplash.logo}
      />
      <Text style={stylesSplash.title}>Bienvenido a Spotify API App</Text>
    </Animated.View>
  );
}

const stylesSplash = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whiteSmoke", // Cambiado a whiteSmoke
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1DB954",
  },
});

// Home Screen
function HomeScreen({ navigation }) {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[stylesHome.container, { opacity: fadeAnim }]}>
      <Text style={stylesHome.title}>¡Bienvenido a la App de Spotify API!</Text>
      <TouchableOpacity
        style={stylesHome.button}
        onPress={() => navigation.navigate("Detail")}
      >
        <Text style={stylesHome.buttonText}>Buscar Canciones</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whiteSmoke", // Cambiado a whiteSmoke
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1DB954",
  },
  button: {
    backgroundColor: "#f0fff0",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 16,
  },
});

// Detail Screen
function DetailScreen() {
  const [cancion, setCancion] = useState("");
  const [canciones, setCanciones] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  function Busqueda() {
    if (cancion.trim() === "") {
      alert("Debes rellenar los campos");
      return;
    }
    getCancion(cancion);
    setCancion("");
  }

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "26a3208ce8msh0723e6f6b400b7ep19b7bcjsn36d68e547a4b",
      "x-rapidapi-host": "spotify23.p.rapidapi.com",
    },
  };

  async function getCancion(cancion) {
    try {
      const url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
      const data = await fetch(url, options);
      const res = await data.json();
      setCanciones(res.tracks?.items || []);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  return (
    <Animated.ScrollView contentContainerStyle={[stylesDetail.scrollContainer, { opacity: fadeAnim }]}>
      <View style={stylesDetail.container}>
        <Text style={stylesDetail.title}>Buscar Canciones</Text>
        <TextInput
          style={stylesDetail.input}
          placeholder="Escribe el nombre de la canción"
          value={cancion}
          onChangeText={setCancion}
        />
        <TouchableOpacity
          style={stylesDetail.button}
          onPress={Busqueda}
        >
          <Text style={stylesDetail.buttonText}>Buscar</Text>
        </TouchableOpacity>

        {canciones.map((item, index) => (
          <View key={index} style={stylesDetail.songContainer}>
            <Image
              source={{
                uri: item.data?.albumOfTrack?.coverArt?.sources?.[0]?.url || "",
              }}
              style={stylesDetail.image}
            />
            <Text style={stylesDetail.songTitle}>
              {item.data?.name || "Sin título"}
            </Text>
          </View>
        ))}
      </View>
    </Animated.ScrollView>
  );
}

const stylesDetail = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Espacio extra
  },
  container: {
    padding: 20,
    backgroundColor: "whiteSmoke", // Cambiado a whiteSmoke
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1DB954",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    color: "#1DB954",
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 16,
  },
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  songTitle: {
    fontSize: 16,
    color: "#1DB954",
  },
});

// Settings Screen
function SettingsScreen({ navigation }) {
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    imagen: null,
  });
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const cargarPerfil = async () => {
      try {
        const datosGuardados = await AsyncStorage.getItem('perfil');
        if (datosGuardados) {
          setPerfil(JSON.parse(datosGuardados));
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };
  
    const focusListener = navigation.addListener('focus', cargarPerfil);
    return focusListener;
  }, [navigation]);

  return (
    <Animated.View style={[stylesSettings.container, { opacity: fadeAnim }]}>
      <View style={stylesSettings.profileContainer}>
        {perfil.imagen ? (
          <Image source={{ uri: perfil.imagen }} style={stylesSettings.profileImage} />
        ) : (
          <Text>📷 No hay imagen</Text>
        )}
        <View style={stylesSettings.profileInfo}>
          <Text style={stylesSettings.text}>Nombre:   {perfil.nombre}</Text>
          <Text style={stylesSettings.text}>Apellido: {perfil.apellido}</Text>
          <Text style={stylesSettings.text}>Correo:   {perfil.correo}</Text>
          <Text style={stylesSettings.text}>Teléfono: {perfil.telefono}</Text>
        </View>
      </View>
  
      <TouchableOpacity
        style={stylesSettings.button}
        onPress={() => navigation.navigate('ConfigPerfil')}
      >
        <Text style={stylesSettings.buttonText}>Configurar Perfil</Text>
      </TouchableOpacity>

      {/* Línea separadora */}
      <View style={stylesSettings.line} />

      {/* Nueva sección de botones */}
      <View style={stylesSettings.buttonSection}>
        <TouchableOpacity style={stylesSettings.optionButton} onPress={() => navigation.navigate('ConfigPerfil')}>
          <Ionicons name="settings-outline" size={24} color="#1DB954" />
          <Text style={stylesSettings.optionText}>Configuraciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesSettings.optionButton}>
          <Ionicons name="call-outline" size={24} color="#1DB954" />
          <Text style={stylesSettings.optionText}>Contacto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesSettings.optionButton}>
          <Ionicons name="information-circle-outline" size={24} color="#1DB954" />
          <Text style={stylesSettings.optionText}>Acerca de Nosotros</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesSettings.optionButton}>
          <Ionicons name="log-out-outline" size={24} color="#1DB954" />
          <Text style={stylesSettings.optionText}>Cambiar Cuenta</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const stylesSettings = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "whiteSmoke", // Cambiado a whiteSmoke
    alignItems: "center", // Centra todo el contenido en la pantalla
    justifyContent: "flex-start", // Alinea en la parte superior
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // Alinea verticalmente los elementos
    marginBottom: 20,
  },
  
  profileImage: {
    width: 220,
    height: 220,
    borderRadius: 50,
    marginBottom: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "#1DB954",
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
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
    borderColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#ffffff",
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
  },
  buttonText: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 16,
  },
});

// Configuración de perfil
function ConfigPerfilScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [imagen, setImagen] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const cargarDatos = async () => {
      const datosGuardados = await AsyncStorage.getItem('perfil');
      if (datosGuardados) {
        const perfil = JSON.parse(datosGuardados);
        setNombre(perfil.nombre);
        setApellido(perfil.apellido);
        setCorreo(perfil.correo);
        setTelefono(perfil.telefono);
        setImagen(perfil.imagen);
      }
    };
    cargarDatos();
  }, []);

  // Seleccionar Imagen desde la PC
  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Asignar la URI de la imagen seleccionada al estado
      setImagen(result.assets[0].uri);
    }
  };

  // Guardar perfil
  const guardarPerfil = async () => {
    const perfil = { nombre, apellido, correo, telefono, imagen };
    await AsyncStorage.setItem('perfil', JSON.stringify(perfil));
    alert('Perfil guardado correctamente');
    navigation.goBack(); // Regresar a SettingsScreen
  };

  return (
    <Animated.ScrollView contentContainerStyle={[stylesConfigPerfil.scrollContainer, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={seleccionarImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={stylesConfigPerfil.profileImage} />
        ) : (
          <View style={stylesConfigPerfil.imagePlaceholder}>
            <Text>📷 Seleccionar Imagen</Text>
          </View>
        )}
        <TouchableOpacity
          style={stylesConfigPerfil.cameraIcon}
          onPress={seleccionarImagen}
        >
          <Ionicons name="camera-outline" size={30} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>

      <TextInput placeholder="Nombre(s)" value={nombre} onChangeText={setNombre} style={stylesConfigPerfil.input} />
      <TextInput placeholder="Apellido(s)" value={apellido} onChangeText={setApellido} style={stylesConfigPerfil.input} />
      <TextInput placeholder="Correo Electronico" value={correo} onChangeText={setCorreo} keyboardType="email-address" style={stylesConfigPerfil.input} />
      <TextInput placeholder="Teléfono de Contacto" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" style={stylesConfigPerfil.input} />

      <TouchableOpacity
        style={stylesConfigPerfil.button}
        onPress={guardarPerfil}
      >
        <Text style={stylesConfigPerfil.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </Animated.ScrollView>
  );
}

const stylesConfigPerfil = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Espacio extra
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "whiteSmoke", // Cambiado a whiteSmoke
  },
  profileImage: {
    width: 230,
    height: 230,
    borderRadius: 70,
  },
  imagePlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 50,
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
  input: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    marginTop: 15,
    backgroundColor: "#ffffff",
    fontWeight: 'bold',
    color: "#1DB954",
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 16,
  },
});

// Navegación principal con ícono de usuario
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Inicio",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color="#000000"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Buscar Canción" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Atras" }}
        />
        <Stack.Screen
          name="ConfigPerfil"
          component={ConfigPerfilScreen}
          options={{ title: " Atras" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
