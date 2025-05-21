#Integrantes del Proyecto:
Andres Eduardo Navidad Flores NF220677
Derek Marcelo Monge Aguilar   MA230691
Kenneth Gabriel Monge Aguilar MA230693
Abner Ismael Rivera Leiva     RL233297

#DPSCatedraReactNative


##DPSCatedraReactNative es una aplicación desarrollada en React Native que consume una API pública de Spotify. Utilizando el método GET, la aplicación recupera y muestra información relevante, permitiendo a los usuarios buscar y visualizar el Top 10 de canciones, álbumes, etc.

##El proyecto fue desarrollado utilizando las siguientes tecnologías:

    React Native: Framework para la creación de la interfaz y estructura de la aplicación.
    JavaScript: Lenguaje de programación utilizado para implementar la lógica de la aplicación y realizar las peticiones a la API mediante fetch.
    Expo: Plataforma que facilita el desarrollo y ejecución de la aplicación, permitiendo iniciar el servidor de desarrollo de manera sencilla.

##Instrucciones de instalación y ejecución

#Descargar el proyecto

    Clona el repositorio o descarga el código fuente.
    Accede a la carpeta raíz del proyecto desde la terminal o el símbolo del sistema:

cd nombre-de-la-carpeta

#Requisitos previos

    Asegúrate de tener instalado Node.js en tu sistema, ya que es necesario para ejecutar los siguientes comandos.

#Instalación de dependencias

npm install expo
npm install -g yarn
npm install react-native-permissions
npx pod-install
npm install @react-native-async-storage/async-storage

    Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

npm run web
#Esto iniciará la aplicación en el navegador y permitirá interactuar con la API.


*-*-**-*-*-*-* Segunda Fase *-*-**-*-*-*-* 

##  Funcionalidades implementadas

- **Búsqueda de canciones** por nombre
- **Guardar y eliminar canciones favoritas** con almacenamiento persistente (`AsyncStorage`)
- **Gestión de perfil de usuario**
- **Carga de imagen de perfil** desde cámara o galería (`expo-image-picker`)
- **Persistencia del perfil** con `AsyncStorage`

## Uso de la app!
1. clona repositorio:

git clone https://github.com/KennethMonge808/DPSCatedraReactNative.git
cd DPSCatedraReactNative

2. Instala las dependencias
 
npm install

3. Inicia el servidor de desarrollo

npx expo start

## Librerias:

Librería	                                    Uso principal
react-native	                            Base del desarrollo móvil
expo	                                    Framework para apps React Native
expo-av	                                    Reproducción de audio
expo-image-picker	                        Selección de imágenes desde galería o cámara
@react-native-async-storage/async-storage	Almacenamiento local persistente
@react-navigation/native + stack	        Navegación entre pantallas
@expo/vector-icons	                        Iconos en botones y menús
