import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>🐾 Smart Dog Bowl</Text>
      <Text style={styles.subtitle}>Contador Inteligente de Comida</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A8A8B8',
    textAlign: 'center',
  },
});
