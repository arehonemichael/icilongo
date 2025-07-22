import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, theme === 'dark' && styles.dark]}>
      <Text style={styles.title}>App Settings</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleTheme('light')}
      >
        <Text style={styles.buttonText}>☀️ Light Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleTheme('dark')}
      >
        <Text style={styles.buttonText}>🌙 Dark Mode</Text>
      </TouchableOpacity>

      <Text style={styles.current}>Current Mode: {theme}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  dark: { backgroundColor: '#222' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  current: { marginTop: 20, textAlign: 'center', fontStyle: 'italic' },
});
