import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';

const AnimeCard = ({ anime, onPress }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (isFavorite(anime.mal_id)) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', flex: 1 }}>
        <Image source={{ uri: anime.images.jpg.image_url }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{anime.title}</Text>
          <Text style={styles.score}>⭐ {anime.score || 'N/A'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton}>
        <Text style={styles.heart}>{isFavorite(anime.mal_id) ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#1c1c1e', // Warna gelap seperti tema AniFlix
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 140,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff', // Putih untuk teks judul
  },
  score: {
    marginTop: 5,
    color: '#ffcc00', // Warna emas untuk rating
    fontWeight: '600',
  },
  heartButton: {
    position: 'absolute',
    bottom: 8,
    right: 10,
  },
  heart: {
    fontSize: 22,
  },
});

export default AnimeCard;