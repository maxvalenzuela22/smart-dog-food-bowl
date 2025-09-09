import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Animated } from 'react-native';
import { Header, Counter, ProgressBar, ActionButton, FamilyNotificationModal } from './components';
import { CounterState } from './types';

const MAX_WEIGHT = 300;

export default function App() {
  const [currentWeight, setCurrentWeight] = useState<number>(0);
  const [state, setState] = useState<CounterState>('idle');
  const [countdown, setCountdown] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Animación de escala para el contador
  const animateCounter = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
  };

  // Función para iniciar el conteo de peso por tandas
  const startBatchCounting = useCallback(() => {
    setCurrentWeight(0);

    // Función auxiliar para contar hasta un peso objetivo
    const countToWeight = (startWeight: number, targetWeight: number, phase: number, hasPause = false) => {
      setState(`counting_phase${phase}` as CounterState);

      intervalRef.current = setInterval(() => {
        setCurrentWeight((prev) => {
          const nextWeight = prev + 1;
          animateCounter();

          if (nextWeight >= targetWeight) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }

            if (hasPause && targetWeight < MAX_WEIGHT) {
              // Pausa simulando que el usuario pone la siguiente porción
              setState(`pause_phase${phase}` as CounterState);
              setTimeout(() => {
                countToWeight(targetWeight, targetWeight + 100, phase + 1, phase < 2);
              }, 4000);
            } else {
              if (nextWeight >= MAX_WEIGHT) {
                setState('completed');
                // Mostrar modal después de un pequeño delay para que se vea la animación
                setTimeout(() => {
                  setShowModal(true);
                }, 500);
              }
            }

            return targetWeight;
          }

          return nextWeight;
        });
      }, 20);
    };

    // Iniciar primera tanda: 0-100g, luego pausa de 2 segundos
    countToWeight(0, 100, 1, true);
  }, []);

  // Función para iniciar el proceso completo
  const startCounting = useCallback(() => {
    setState((currentState) => {
      if (currentState !== 'idle') return currentState;

      setCountdown(10);

      // Cuenta regresiva de 10 segundos
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownRef.current) {
              clearInterval(countdownRef.current);
            }
            // Iniciar el conteo de gramos por tandas
            startBatchCounting();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return 'waiting';
    });
  }, [startBatchCounting]);

  // Función para reiniciar todo
  const resetCounter = useCallback(() => {
    // Limpiar intervalos
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    
    // Resetear estados
    setState('idle');
    setCurrentWeight(0);
    setCountdown(10);
    setShowModal(false);
    
    // Resetear animaciones
    scaleAnim.setValue(1);
    fadeAnim.setValue(1);
  }, [scaleAnim, fadeAnim]);

  // Función para cerrar el modal
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Iniciar automáticamente y limpiar intervalos al desmontar el componente
  useEffect(() => {
    // Iniciar automáticamente después de 1 segundo de que se monte la app
    const autoStartTimer = setTimeout(() => {
      startCounting();
    }, 1000);

    return () => {
      // Limpiar el timer de auto-inicio
      clearTimeout(autoStartTimer);
      
      // Limpiar intervalos
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [startCounting]);

  const getButtonAction = useCallback(() => {
    return state === 'idle' ? startCounting : resetCounter;
  }, [state, startCounting, resetCounter]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Header />
      
      <Counter 
        currentWeight={currentWeight}
        state={state}
        countdown={countdown}
        scaleAnim={scaleAnim}
      />
      
      <ProgressBar 
        currentWeight={currentWeight}
        maxWeight={MAX_WEIGHT}
      />
      
      <ActionButton 
        state={state}
        onPress={getButtonAction()}
      />

      <FamilyNotificationModal 
        visible={showModal}
        onClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
});
