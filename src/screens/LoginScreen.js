import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, IconButton, useTheme } from 'react-native-paper';
import { lightColors, darkColors } from '../themes/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme(); // Using the theme from react-native-paper

  const handleLogin = () => {
    // TODO: Implement login logic
    navigation.navigate('TrainSearchForm');
  };

  // Determine background and text color based on the theme
  const backgroundColor = theme.dark ? darkColors.background : lightColors.background;
  const textColor = theme.dark ? darkColors.text : lightColors.text;
  const primaryColor = theme.dark ? darkColors.light : lightColors.dark;
  console.log('modecheck', theme.dark);
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image source={''} style={styles.logo} />
      <Text style={[styles.title, { color: primaryColor }]}>Welcome Back!</Text>
      <Text style={[styles.subtitle, { color: textColor }]}>
        Login to continue booking your train tickets.
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        icon="email"
        style={[styles.input, { borderColor: primaryColor }]} // Apply border color dynamically
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={[styles.input, { borderColor: primaryColor }]} // Apply border color dynamically
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={[styles.button, { backgroundColor: primaryColor }]} // Apply button color dynamically
        contentStyle={styles.buttonContent}
      >
        Login <IconButton icon="login" color="white" />
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={[styles.link, { color: primaryColor }]}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[styles.forgotPassword, { color: primaryColor }]}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 20,
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    borderRadius: 5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  link: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  forgotPassword: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
});

export default LoginScreen;
