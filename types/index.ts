export type CounterState = 'idle' | 'waiting' | 'counting_phase1' | 'pause_phase1' | 'counting_phase2' | 'pause_phase2' | 'counting_phase3' | 'completed';

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
