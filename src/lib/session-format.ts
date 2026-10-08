import type { AppCopy } from '@/content/app-copy';
import type { Locale } from '@/content/nvc-content';
import type { GameSession } from '@/stores/use-sessions-store';

/** "8 Oct 2026, 14:05" in the app language. */
export function formatPlayedAt(playedAt: string, locale: Locale): string {
  return new Date(playedAt).toLocaleString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** "Teams · 20 rounds × 30 s" */
export function sessionSetup(session: GameSession, copy: AppCopy): string {
  const mode = session.mode === 'team' ? copy.modeTeam : copy.modeSingle;
  const rounds = copy.roundsLine
    .replace('{rounds}', String(session.rounds))
    .replace('{seconds}', String(session.secondsPerRound));

  return `${mode} · ${rounds}`;
}

/** "34 pts · 57%" */
export function teamScore(team: GameSession['teams'][number], copy: AppCopy): string {
  return `${copy.points.replace('{n}', String(team.score))} · ${Math.round(team.pct)}%`;
}
