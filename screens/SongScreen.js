// File: screens/SongScreen.js
import React, { useLayoutEffect, useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext';

export default function SongScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { song } = route.params;
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleFavorite} style={{ marginRight: 15 }}>
          <Text style={{ fontSize: 22 }}>{isFavorite ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFavorite]);

  const checkIfFavorite = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      const favorites = jsonValue != null ? JSON.parse(jsonValue) : [];
      setIsFavorite(favorites.some(fav => fav.number === song.number));
    } catch (e) {
      console.error('Error checking favorites', e);
    }
  };

  const toggleFavorite = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      let favorites = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (isFavorite) {
        favorites = favorites.filter(fav => fav.number !== song.number);
      } else {
        favorites.push(song);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (e) {
      console.error('Error updating favorites', e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1c1c1c' : '#fff8e7' }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          {song.number}. {song.title}
        </Text>
        <Text style={[styles.lyrics, { color: isDark ? '#ccc' : '#333' }]}>
          {song.lyrics}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scroll: { paddingBottom: 30 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  lyrics: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'PlayfairDisplay-Regular',
  },
});
