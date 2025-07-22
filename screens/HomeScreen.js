// File: screens/HomeScreen.js
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import songsData from '../assets/songs.json';
import { ThemeContext } from '../ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [searchText, setSearchText] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songsData);

  useEffect(() => {
    const filtered = songsData.filter(song =>
      song.title.toLowerCase().includes(searchText.toLowerCase()) ||
      song.number.toString().includes(searchText)
    );
    setFilteredSongs(filtered);
  }, [searchText]);

  return (
    <LinearGradient
      colors={isDark ? ['#1c1c1c', '#3b3b3b'] : ['#fff8e7', '#fce4b3']}
      style={styles.gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? '#2a2a2a' : '#fff', color: isDark ? '#fff' : '#000' },
          ]}
          placeholder="Search hymns by number or title"
          onChangeText={setSearchText}
          value={searchText}
          placeholderTextColor={isDark ? '#aaa' : '#555'}
        />

        <FlatList
          data={filteredSongs}
          keyExtractor={item => item.number.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Song', { song: item })}>
              <View style={[styles.card, isDark && styles.cardDark]}>
                <Text style={[styles.songTitle, isDark && styles.songTitleDark]}>
                  {item.number}. {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.footerButton, isDark && styles.footerButtonDark]}
            onPress={() => navigation.navigate('Favorites')}
          >
            <Text style={[styles.footerButtonText, isDark && styles.footerButtonTextDark]}>⭐ Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.footerButton, isDark && styles.footerButtonDark]}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={[styles.footerButtonText, isDark && styles.footerButtonTextDark]}>⚙️ Settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  input: {
    margin: 10,
    padding: 12,
    borderRadius: 10,
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#2a2a2a',
  },
  songTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  songTitleDark: {
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    backgroundColor: '#fce4b3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  footerButtonDark: {
    backgroundColor: '#3c3c3c',
  },
  footerButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  footerButtonTextDark: {
    color: '#fff',
  },
});
