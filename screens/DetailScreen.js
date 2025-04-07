import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

const DetailScreen = ({ route }) => {
  const { anime } = route.params;
  const [detail, setDetail] = useState(anime);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch`(https://api.jikan.moe/v4/anime/${anime.mal_id})`;
        const json = await res.json();
        setDetail(json.data); // Jika sukses, update ke data detail
      } catch (err) {
        console.warn('Gagal ambil data lengkap, pakai data awal.');
        // Tidak apa-apa, tetap pakai data awal
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: detail.images.jpg.large_image_url }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{detail.title}</Text>
        <Text style={styles.info}>⭐ Score: {detail.score || 'N/A'}</Text>
        <Text style={styles.info}>🎬 Episodes: {detail.episodes || 'Unknown'}</Text>
        <Text style={styles.info}>📅 Status: {detail.status || 'Unknown'}</Text>

        <Text style={styles.synopsisTitle}>📖 Synopsis:</Text>
        <Text style={styles.synopsis}>
          {detail.synopsis || 'No synopsis available.'}
        </Text>

        {loading && <ActivityIndicator size="large" color="#FF5252" style={{ marginTop: 20 }} />}

        {!loading && detail.trailer?.embed_url && (
          <View style={styles.trailerContainer}>
            <Text style={styles.trailerTitle}> Trailer</Text>
            <WebView
              source={{ uri: detail.trailer.embed_url }}
              style={styles.webview}
              allowsFullscreenVideo
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // cocokkan tema gelap seperti AniFlix
  },
  image: {
    width: '100%',
    height: width * 1.4, // rasio tidak gepeng
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  info: {
    fontSize: 15,
    color: '#ccc',
    marginBottom: 5,
  },
  synopsisTitle: {
    marginTop: 15,
    fontSize: 16,
    color: '#FF5252',
    fontWeight: 'bold',
  },
  synopsis: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 4,
    lineHeight: 20,
  },
  trailerContainer: {
    height: 250,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  trailerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  webview: {
    flex: 1,
  },
});

export default DetailScreen;