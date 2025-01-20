import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 
const LoginScreen = ({ navigation }) => {
  const systemColorScheme = useColorScheme(); // Detect system color scheme
  const [colorScheme, setColorScheme] = useState(systemColorScheme); // Allow manual toggle

  const toggleTheme = () => {
    setColorScheme((prevScheme) => (prevScheme === 'light' ? 'dark' : 'light'));
  };

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeInputStyle = colorScheme === 'light' ? styles.lightInput : styles.darkInput;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.title, themeTextStyle]}>Welcome Back!</Text>

      <TextInput
        style={[styles.input, themeInputStyle]}
        placeholder="Email"
        placeholderTextColor={colorScheme === 'light' ? '#888' : '#ccc'}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, themeInputStyle]}
        placeholder="Password"
        placeholderTextColor={colorScheme === 'light' ? '#888' : '#ccc'}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TrainSearchForm')}>
        <Text style={styles.buttonText}>
          Login 
          </Text>
          <MaterialIcons name="login" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleTheme} style={[styles.toggleButton, colorScheme === 'light' ? styles.lightToggle : styles.darkToggle]}>
        <View style={[styles.toggleIndicator, colorScheme === 'light' ? styles.lightIndicator : styles.darkIndicator]} />
        <Text style={[styles.toggleButtonText, colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText]}>
          {colorScheme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>

      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    display : 'flex',
    flexDirection: 'row',
    gap: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,   

    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 20,
    padding: 10,
  },
  toggleButtonText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightThemeText: {
    color: '#121212',
  },
  darkThemeText: {
    color: '#f5f5f5',
  },
  lightInput: {
    backgroundColor: '#fff',
    color: '#121212',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  darkInput: {
    backgroundColor: '#1e1e1e',
    color: '#f5f5f5',
    borderColor: '#444',
    borderWidth: 1,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 2,
  },
  lightToggle: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
  },
  darkToggle: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
  },
  toggleIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  lightIndicator: {
    backgroundColor: '#121212',
  },
  darkIndicator: {
    backgroundColor: '#f5f5f5',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
