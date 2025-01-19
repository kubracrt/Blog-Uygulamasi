import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from './screens/IndexScreen';
import CreateScreen from './screens/CreateScreen';
import ShowScreen from './screens/ShowScreen';
import EditScreen from './screens/EditScreen';
import { Provider } from './context/BlogContext';
import AntDesign from '@expo/vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: 'Blog Uygulaması' }}>
          <Stack.Screen name="Index" component={IndexScreen} options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Create")}>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </TouchableOpacity>
            ),
          })} />
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Show" component={ShowScreen} options={({ navigation,route }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Edit",{id:route.params.id})}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            )
          })} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
