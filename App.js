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
function SettingsScreen() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("https://via.placeholder.com/150");

  function guardarPerfil() {
    alert(`Perfil guardado:\nNombre: ${nombre}\nEmail: ${email}`);
  }

  return (
    <View style={stylesSettings.container}>
      <Text style={stylesSettings.title}>Configuración del Perfil</Text>
      <Image source={{ uri: foto }} style={stylesSettings.image} />
      <TextInput
        style={stylesSettings.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={stylesSettings.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Guardar" onPress={guardarPerfil} color="#1DB954" />
    </View>
  );
}

const stylesSettings = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1DB954",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
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
                  size={30}
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
          options={{ title: "Configuración" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

