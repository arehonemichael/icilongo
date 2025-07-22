import React, { useContext, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SongScreen from './screens/SongScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';
// import SplashScreen from 'react-native-splash-screen'; // Optional
import { ThemeProvider, ThemeContext } from './ThemeContext';

const Stack = createStackNavigator();

function MainApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#D2B48C' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="iCilongoLeVangeli" component={HomeScreen} />
        <Stack.Screen name="Song" component={SongScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
