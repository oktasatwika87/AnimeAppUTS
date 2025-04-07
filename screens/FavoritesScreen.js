// screens/FavoritesScreen.js
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import AnimeCard from '../components/AnimeCard';
import * as Animatable from 'react-native-animatable'; // ✅ Import animasi

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Animatable.Text
          animation="fadeIn"
          duration={800}
          style={styles.emptyText}
        >
          Empty
        </Animatable.Text>
      ) : (
        <Animatable.View animation="fadeInUp" duration={800} delay={200}>
          <FlatList
            data={favorites}
            keyExtractor={(item) => `${item.mal_id}`}
            renderItem={({ item }) => (
              <AnimeCard
                anime={item}
                onPress={() => navigation.navigate('Detail', { anime: item })}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
          />
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#121212',
  },
  emptyText: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
  },
});

export default FavoritesScreen;