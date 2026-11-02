import type { Tone } from './common';

export interface ToastMessage {
  id: string;
  text: string;
  tone: Exclude<Tone, 'brand'>;
}

export interface ToastContextValue {
  notify: (text: string, tone?: ToastMessage['tone']) => void;
}
