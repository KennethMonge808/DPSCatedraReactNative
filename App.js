import Tabs from './Tabs';
import SongDetailScreen from './screens/SongDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="DetalleCancion" component={SongDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
