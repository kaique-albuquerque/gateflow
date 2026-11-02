import { STORAGE_PREFIX } from '@/constants/app';

function isAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch {
    return false;
  }
}

export function readStored<T>(key: string): T | null {
  if (!isAvailable()) return null;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (error) {
    console.error(`[GateFlow] Falha ao ler "${key}" do armazenamento local.`, error);
    return null;
  }
}

export function writeStored<T>(key: string, value: T): void {
  if (!isAvailable()) return;
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`[GateFlow] Falha ao gravar "${key}" no armazenamento local.`, error);
  }
}

export function removeStored(key: string): void {
  if (!isAvailable()) return;
  window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
}
