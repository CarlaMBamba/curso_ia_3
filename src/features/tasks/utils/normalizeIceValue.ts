const MIN_ICE_VALUE = 1;
const MAX_ICE_VALUE = 10;

// normalizeIceValue limita una puntuacion ICE manual o sugerida al rango del MVP.
export function normalizeIceValue(value: number): number {
  if (!Number.isFinite(value)) {
    return MIN_ICE_VALUE;
  }

  return Math.min(Math.max(value, MIN_ICE_VALUE), MAX_ICE_VALUE);
}
