import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity, 
  Animated, 
  Dimensions 
} from 'react-native';
import { FamilyNotificationModalProps } from '../types';

const { width } = Dimensions.get('window');

export const FamilyNotificationModal: React.FC<FamilyNotificationModalProps> = ({ 
  visible, 
  onClose 
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Icono principal */}
          <View style={styles.iconContainer}>
            <Text style={styles.mainIcon}>📱</Text>
            <Text style={styles.secondaryIcon}>👨‍👩‍👧‍👦</Text>
          </View>
          
          {/* Título */}
          <Text style={styles.modalTitle}>
            ¡Misión Cumplida! 🎉
          </Text>
          
          {/* Mensaje principal */}
          <Text style={styles.modalMessage}>
            Ya informamos a toda tu familia que tu perro ya comió
          </Text>
          
          {/* Mensaje secundario */}
          <Text style={styles.modalSubMessage}>
            Tu mascota ha recibido la cantidad perfecta de comida. 
            Todos en casa han sido notificados.
          </Text>

          {/* Lista de notificaciones simuladas */}
          <View style={styles.notificationList}>
            <View style={styles.notificationItem}>
              <Text style={styles.notificationIcon}>📲</Text>
              <Text style={styles.notificationText}>WhatsApp enviado a mamá</Text>
              <Text style={styles.checkmark}>✅</Text>
            </View>
            <View style={styles.notificationItem}>
              <Text style={styles.notificationIcon}>📧</Text>
              <Text style={styles.notificationText}>Email enviado a papá</Text>
              <Text style={styles.checkmark}>✅</Text>
            </View>
            <View style={styles.notificationItem}>
              <Text style={styles.notificationIcon}>💬</Text>
              <Text style={styles.notificationText}>SMS a hermanos</Text>
              <Text style={styles.checkmark}>✅</Text>
            </View>
          </View>
          
          {/* Botón de cerrar */}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>
              ¡Genial! 🐕
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 46, 0.9)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#2A2A3A',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: width * 0.9,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainIcon: {
    fontSize: 50,
    marginRight: 10,
  },
  secondaryIcon: {
    fontSize: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  modalSubMessage: {
    fontSize: 14,
    color: '#A8A8B8',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  notificationList: {
    width: '100%',
    marginBottom: 25,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2E',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  notificationIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 16,
    color: '#27AE60',
  },
  closeButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    minWidth: 150,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
