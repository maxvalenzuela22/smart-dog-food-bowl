export type CounterState = 'idle' | 'waiting' | 'counting' | 'completed';

export interface CounterDisplayProps {
  currentWeight: number;
  state: CounterState;
  countdown: number;
  scaleAnim: any;
}

export interface ProgressBarProps {
  currentWeight: number;
  maxWeight: number;
}

export interface ActionButtonProps {
  state: CounterState;
  onPress: () => void;
}

export interface FamilyNotificationModalProps {
  visible: boolean;
  onClose: () => void;
}
