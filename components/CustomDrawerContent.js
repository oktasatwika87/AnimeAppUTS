import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const genres = [
  { id: '', name: 'Semua Genre' },
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Horror' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 37, name: 'Supernatural' },
];

const CustomDrawerContent = ({ selectedGenre, setSelectedGenre, ...props }) => {
  const [showGenres, setShowGenres] = useState(false);

  const drawerItems = [
    {
      label: 'Home',
      icon: 'home-outline',
      onPress: () => {
        props.navigation.navigate('Home');
        props.navigation.closeDrawer();
      },
    },
    {
      label: 'My Favorite',
      icon: 'heart-outline',
      onPress: () => {
        props.navigation.navigate('Favorit');
        props.navigation.closeDrawer();
      },
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: '#121212', flexGrow: 1 }}
      style={{ backgroundColor: '#121212' }}
    >
      <View style={styles.menuContainer}>
        {drawerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.genreSection}>
        <TouchableOpacity onPress={() => setShowGenres((prev) => !prev)}>
          <Text style={styles.label}>
            Genre {showGenres ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {showGenres && (
          <View style={styles.genreList}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={[
                  styles.genreButtonVertical,
                  selectedGenre === genre.id && styles.genreButtonSelected,
                ]}
                onPress={() => {
                  setSelectedGenre(genre.id);
                  props.navigation.navigate('Home');
                  props.navigation.closeDrawer();
                }}
              >
                <Text
                  style={[
                    styles.genreText,
                    selectedGenre === genre.id && styles.genreTextSelected,
                  ]}
                >
                  {genre.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  genreSection: {
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  genreList: {
    marginTop: 10,
    paddingBottom: 20,
  },
  genreButtonVertical: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 6,
  },
  genreButtonSelected: {
    backgroundColor: '#E50914',
  },
  genreText: {
    color: '#ccc',
  },
  genreTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;