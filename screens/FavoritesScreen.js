// File: screens/FavoritesScreen.js

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    setFavorites(favs ? JSON.parse(favs) : []);
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Song', { song: item })}>
            <View style={styles.card}>
              <Text style={[styles.songTitle, isDark && styles.songTitleDark]}>
                {item.number}. {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
            No favorites yet ⭐
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff8e1',
    flex: 1,
    padding: 10,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#ffffffcc',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  songTitle: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay-Bold',
    color: '#333',
  },
  songTitleDark: {
    color: '#eee',
  },
  emptyText: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#777',
  },
  emptyTextDark: {
    color: '#aaa',
  },
});
