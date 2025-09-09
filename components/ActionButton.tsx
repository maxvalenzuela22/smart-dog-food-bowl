import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ActionButtonProps } from '../types';

export const ActionButton: React.FC<ActionButtonProps> = ({ state, onPress }) => {
  const getButtonText = (): string => {
    return state === 'idle' ? '🥣 Iniciar Medición' : '🔄 Reiniciar';
  };

  return (
    <TouchableOpacity 
      style={[
        styles.actionButton,
        state === 'idle' ? styles.actionButtonPrimary : styles.actionButtonSecondary
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.actionButtonText}>
        {getButtonText()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  actionButtonPrimary: {
    backgroundColor: '#FF6B35',
  },
  actionButtonSecondary: {
    backgroundColor: '#6C757D',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
