import { MOCK_LATENCY } from '@/constants/pagination';

export function randomLatency(): number {
  const { min, max } = MOCK_LATENCY;
  return Math.round(min + Math.random() * (max - min));
}

/** Simula o tempo de resposta discreto de uma API real. */
export function sleep(ms: number = randomLatency()): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
