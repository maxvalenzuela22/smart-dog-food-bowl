import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { CounterDisplayProps } from '../types';

export const Counter: React.FC<CounterDisplayProps> = ({ 
  currentWeight, 
  state, 
  countdown, 
  scaleAnim 
}) => {
  const getStatusText = (): string => {
    switch (state) {
      case 'idle':
        return '🐕 Listo para medir comida';
      case 'waiting':
        return `⏱️ Preparando sensor... ${countdown}s`;
      case 'counting_phase1':
        return '';
      case 'pause_phase1':
        return '';
      case 'counting_phase2':
        return '';
      case 'pause_phase2':
        return '';
      case 'counting_phase3':
        return '';
      case 'completed':
        return '✅ ¡Porción completa lista para tu perro!';
      default:
        return '';
    }
  };

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.statusText}>{getStatusText()}</Text>
      
      <Animated.View 
        style={[
          styles.counterDisplay,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={styles.weightNumber}>
          {currentWeight}
        </Text>
        <Text style={styles.weightUnit}>gramos</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  statusText: {
    fontSize: 18,
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  counterDisplay: {
    backgroundColor: '#2A2A3A',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginBottom: 30,
    minWidth: 250,
    borderWidth: 3,
    borderColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  weightNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 80,
  },
  weightUnit: {
    fontSize: 24,
    color: '#4ECDC4',
    fontWeight: '600',
    marginTop: 5,
  },
});
