import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProgressBarProps } from '../types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentWeight, maxWeight }) => {
  const progressPercentage = Math.round((currentWeight / maxWeight) * 100);

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progressPercentage}%` }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>
        {progressPercentage}% completado
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2A2A3A',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#A8A8B8',
    textAlign: 'center',
  },
});
