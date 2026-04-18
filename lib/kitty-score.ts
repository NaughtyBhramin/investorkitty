export function calculateKittyScore(profileCompleteness: number, tractionScore: number, teamSize: number, stageBonus: number) {
  const raw = profileCompleteness * 3 + tractionScore * 4 + teamSize * 2 + stageBonus * 1;
  const normalized = Math.min(10, Math.max(1, Math.round((raw / 30) * 10)));
  return normalized;
}
