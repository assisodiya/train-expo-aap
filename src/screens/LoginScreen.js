import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const emailIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 13.5l8-5v9l-8-5-8 5v-9l8 5zm0-9.5l-8 5v9l8-5 8 5v-9l-8-5z"/></svg>`;
  const lockIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c-1.11 0-2 .89-2 2v6h4v-6c0-1.11-.89-2-2-2zm6 8h-4v-6c0-2.21-1.79-4-4-4s-4 1.79-4 4v6h-4c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2z"/></svg>`;
  const handleLogin = () => {
    // TODO: Implement login logic
    navigation.navigate('TrainSearchForm');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image
        source={''}
        style={styles.logo}
      />
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Welcome Back!
      </Text>
      <Text style={styles.subtitle}>
        Login to continue booking your train tickets.
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        left={<SvgXml xml={emailIcon} width={24} height={24} />}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
        left={<SvgXml xml={lockIcon} width={24} height={24} />}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Login
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={[styles.link, { color: theme.colors.primary }]}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[styles.forgotPassword, { color: theme.colors.accent }]}>
          Forgot Password?
        </Text>
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
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
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
