import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConfirmTktLogo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.confirm}>Confirm</Text>
        <Text style={styles.tkt}>tkt</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirm: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tkt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default ConfirmTktLogo;
