import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

const GetStartedScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/bg-dark.jpg')} // Pastikan file ini ada di /assets
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')} // Logo AniFlix
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Welcome to <Text style={styles.brand}>AniFlix</Text>
        </Text>

        <Text style={styles.subtitle}>
        Search, discover, and save for your next watch recommendations
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('AnimeApp')}
        >
          <Text style={styles.buttonText}>Let's Get Started </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 80, // agar tombol turun sedikit
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  brand: {
    color: '#E50914',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#E50914',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});