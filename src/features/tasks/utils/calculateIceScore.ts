import { normalizeIceValue } from "./normalizeIceValue";

// calculateIceScore aplica la formula ICE y evita divisiones invalidas por esfuerzo.
export function calculateIceScore(impact: number, confidence: number, effort: number): number {
  const normalizedImpact = normalizeIceValue(impact);
  const normalizedConfidence = normalizeIceValue(confidence);
  const normalizedEffort = normalizeIceValue(effort);

  return (normalizedImpact * normalizedConfidence) / normalizedEffort;
}
