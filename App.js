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
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Librería para íconos
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// Splash Screen
function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={stylesSplash.container}>
      <Image
        source={require("./assets/splash-icon.png")}
        style={stylesSplash.logo}
      />
      <Text style={stylesSplash.title}>Bienvenido a Spotify API App</Text>
    </View>
  );
}

const stylesSplash = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
  return (
    <View style={stylesHome.container}>
      <Text style={stylesHome.title}>¡Bienvenido a la App de Spotify API!</Text>
      <Button
        title="Buscar Canciones"
        onPress={() => navigation.navigate("Detail")}
        color="#1DB954"
      />
    </View>
  );
}

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1DB954",
  },
});

// Detail Screen
function DetailScreen() {
  const [cancion, setCancion] = useState("");
  const [canciones, setCanciones] = useState([]);

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
    <ScrollView contentContainerStyle={stylesDetail.scrollContainer}>
      <View style={stylesDetail.container}>
        <Text style={stylesDetail.title}>Buscar Canciones</Text>
        <TextInput
          style={stylesDetail.input}
          placeholder="Escribe el nombre de la canción"
          value={cancion}
          onChangeText={setCancion}
        />
        <Button title="Buscar" onPress={Busqueda} color="#1DB954" />

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
    </ScrollView>
  );
}

const stylesDetail = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Espacio extra
  },
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
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
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
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

  // Cargar perfil cuando se abre la pantalla
  useEffect(() => {
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
    <View style={stylesSettings.container}>
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
  
      <Button title="Configurar Perfil" onPress={() => navigation.navigate('ConfigPerfil')} />

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
    </View>
  );
}

const stylesSettings = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
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
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
});

// Configuración de perfil
function ConfigPerfilScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [imagen, setImagen] = useState(null);

  // Cargar datos guardados
  useEffect(() => {
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <TouchableOpacity onPress={seleccionarImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={{ width: 230, height: 230, borderRadius: 70 }} />
        ) : (
          <View style={{ width: 250, height: 250, borderRadius: 50, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
            <Text>📷 Seleccionar Imagen</Text>
          </View>
          
        )}
         {/* Ícono permanente en la parte inferior */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 5,
          left: '5%',
          transform: [{ translateX: -20 }], // Centra el ícono
          backgroundColor: '#1DB954',
          borderRadius: 50,
          padding: 7,
        }}
        onPress={seleccionarImagen}
      >
        <Ionicons name="camera-outline" size={30} color="white" />
      </TouchableOpacity>
      </TouchableOpacity>

      <TextInput placeholder="Nombre(s)" value={nombre} onChangeText={setNombre} style={{ flexDirection: "row",alignItems: "center",padding: 15,borderWidth: 1,borderColor: "#ccc",borderRadius: 8,marginBottom: 10,width: "100%",marginTop: 15,fontWeight: 'bold',backgroundColor: "#f9f9f9", }} />
      <TextInput placeholder="Apellido(s)" value={apellido} onChangeText={setApellido} style={{ flexDirection: "row",alignItems: "center",padding: 15,borderWidth: 1,borderColor: "#ccc",borderRadius: 8,marginBottom: 10,width: "100%",marginTop: 15,backgroundColor: "#f9f9f9",fontWeight: 'bold', }} />
      <TextInput placeholder="Correo Electronico" value={correo} onChangeText={setCorreo} keyboardType="email-address" style={{ flexDirection: "row",alignItems: "center",padding: 15,borderWidth: 1,borderColor: "#ccc",borderRadius: 8,marginBottom: 10,width: "100%",marginTop: 15,backgroundColor: "#f9f9f9", fontWeight: 'bold', }} />
      <TextInput placeholder="Teléfono de Contacto" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" style={{ flexDirection: "row",alignItems: "center",padding: 15,borderWidth: 1,borderColor: "#ccc",borderRadius: 8,marginBottom: 10,width: "100%",marginTop: 15,backgroundColor: "#f9f9f9", fontWeight: 'bold', }} />

      <Button title="Guardar" onPress={guardarPerfil} />

      
    </View>
  );
}

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
                  color="#1DB954"
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