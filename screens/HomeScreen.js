import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AnimeCard from '../components/AnimeCard';

const HomeScreen = ({ navigation, selectedGenre }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false);

  const fetchAnime = async () => {
    setLoading(true);
    try {
      let url = `https://api.jikan.moe/v4/anime?page=${page}`;

      if (search) {
        url += `&q=${search}`;
      }

      if (selectedGenre) {
        url += `&genres=${selectedGenre}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      setAnimeList(json.data || []);
    } catch (err) {
      console.error('Error fetching anime:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
    setShowPagination(false);
  }, [page, selectedGenre]);

  const handleSearchSubmit = () => {
    setPage(1);
    fetchAnime();
  };

  const handleEndReached = () => {
    if (!showPagination && animeList.length > 0) {
      setShowPagination(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
      

        <TextInput
          placeholder="🔍 Search anime..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearchSubmit}
          style={styles.input}
        />

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} color="#E50914" />
        ) : animeList.length === 0 ? (
          <Text style={styles.noResultText}>Anime tidak ditemukan</Text>
        ) : (
          <FlatList
            data={animeList}
            keyExtractor={(item, index) => `${item.mal_id}-${page}-${index}`}
            renderItem={({ item }) => (
              <AnimeCard
                anime={item}
                onPress={() => navigation.navigate('Detail', { anime: item })}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            extraData={page}
          />
        )}
      </View>

      {showPagination && (
        <View style={styles.pageButtons}>
          <TouchableOpacity
            onPress={() => {
              setPage((p) => Math.max(p - 1, 1));
              setShowPagination(false);
            }}
            style={styles.pageButton}
          >
            <Text style={styles.pageButtonText}>Previous</Text>
          </TouchableOpacity>

          <Text style={styles.pageText}>Page {page}</Text>

          <TouchableOpacity
            onPress={() => {
              setPage((p) => p + 1);
              setShowPagination(false);
            }}
            style={styles.pageButton}
          >
            <Text style={styles.pageButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    fontSize: 16,
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  pageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#222',
    backgroundColor: '#1c1c1c',
  },
  pageButton: {
    backgroundColor: '#E50914',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  pageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default HomeScreen;