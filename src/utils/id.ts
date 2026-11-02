export function createId(prefix: string): string {
  const cryptoRef = globalThis.crypto;
  const random =
    cryptoRef && 'randomUUID' in cryptoRef
      ? cryptoRef.randomUUID().replace(/-/g, '').slice(0, 8)
      : Math.random().toString(16).slice(2, 10);
  return `${prefix}-${random}`;
}

export function createCodigoRastreio(): string {
  const stamp = Date.now().toString(36).slice(-6).toUpperCase();
  const random = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `GF${stamp}${random}`;
}
