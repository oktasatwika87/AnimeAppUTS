import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CustomDrawerContent from './components/CustomDrawerContent';
import GetStartedScreen from './screens/GetStartedScreen';
import { FavoritesProvider } from './contexts/FavoritesContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// ✅ Komponen Drawer berisi Home dan Favorit
const MainDrawer = ({ selectedGenre, setSelectedGenre }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#000', // ⬅ Warna background header (hitam)
        },
        headerTintColor: '#fff',   // ⬅ Warna teks & ikon header (putih)
        headerTitleAlign: 'center' // ⬅ Pusatkan judul header
      }}
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      )}
    >
      <Drawer.Screen name="Home" options={{ drawerLabel: 'Home' }}>
        {(props) => <HomeScreen {...props} selectedGenre={selectedGenre} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Favorit"
        component={FavoritesScreen}
        options={{ drawerLabel: 'My Favorite' }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState('');

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GetStarted">
          <Stack.Screen
            name="GetStarted"
            component={GetStartedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AnimeApp" options={{ headerShown: false }}>
            {(props) => (
              <MainDrawer
                {...props}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              title: 'Detail Anime',
              headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}