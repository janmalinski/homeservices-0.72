export type ToastVariant = 'info' | 'success' | 'error' | 'warning';

export interface IToastProps {
  text: string;
  isVisible: boolean;
  variant?: ToastVariant;
  onButtonPress?: () => void;
  buttonText?: string;
  bottomOffset?: number;
  onHidden?: () => void;
  isDismissable?: boolean;
  autoHideTimeout?: number;
}
