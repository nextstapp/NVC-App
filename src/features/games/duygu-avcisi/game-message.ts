import type { GameSession } from '@/stores/use-sessions-store';

/** Game → app messages; see the embed contract (`window.ReactNativeWebView.postMessage`). */
export type GameMessage =
  | { type: 'ready' }
  | { type: 'screen'; screen: string }
  | { type: 'sound'; enabled: boolean }
  | { type: 'finished'; result: GameSession }
  | { type: 'stat'; stat: GameStat };

/** Anonymous play count the app forwards to the website (see `/api/games/[slug]/stats`). */
export type GameStat = {
  event: 'start' | 'finish';
  lang: string;
  mode: 'single' | 'team';
  teams: number;
};

const BADGES = ['diamond', 'gold', 'silver', 'bronze'];

const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

function isSession(value: unknown): value is GameSession {
  if (typeof value !== 'object' || value === null) return false;
  const r = value as Record<string, unknown>;

  return (
    typeof r.lang === 'string' &&
    (r.mode === 'single' || r.mode === 'team') &&
    isNumber(r.rounds) &&
    isNumber(r.secondsPerRound) &&
    isNumber(r.maxScore) &&
    typeof r.playedAt === 'string' &&
    Array.isArray(r.teams) &&
    r.teams.every(
      (team) =>
        typeof team === 'object' &&
        team !== null &&
        typeof team.name === 'string' &&
        isNumber(team.score) &&
        isNumber(team.pct) &&
        BADGES.includes(team.badge),
    )
  );
}

function isStat(value: unknown): value is GameStat {
  if (typeof value !== 'object' || value === null) return false;
  const r = value as Record<string, unknown>;

  return (
    (r.event === 'start' || r.event === 'finish') &&
    typeof r.lang === 'string' &&
    (r.mode === 'single' || r.mode === 'team') &&
    Number.isInteger(r.teams)
  );
}

/** The WebView is a trust boundary: anything malformed is dropped, never stored. */
export function parseGameMessage(data: string): GameMessage | null {
  let msg: Record<string, unknown>;
  try {
    msg = JSON.parse(data);
  } catch {
    return null;
  }
  if (typeof msg !== 'object' || msg === null) return null;

  switch (msg.type) {
    case 'ready':
      return { type: 'ready' };
    case 'screen':
      return typeof msg.screen === 'string' ? { type: 'screen', screen: msg.screen } : null;
    case 'sound':
      return typeof msg.enabled === 'boolean' ? { type: 'sound', enabled: msg.enabled } : null;
    case 'finished':
      return isSession(msg.result) ? { type: 'finished', result: msg.result } : null;
    case 'stat':
      return isStat(msg.stat) ? { type: 'stat', stat: msg.stat } : null;
    default:
      return null;
  }
}
