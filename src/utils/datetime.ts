const pad = (value: number) => String(value).padStart(2, '0');

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

function parse(value: string): Date {
  return DATE_ONLY.test(value) ? new Date(`${value}T00:00:00`) : new Date(value);
}

export function todayInput(): string {
  return toDateInput(new Date());
}

export function toDateInput(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function nowTimeInput(): string {
  const date = new Date();
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function nowISO(): string {
  return new Date().toISOString();
}

/** Data/hora local convertida para ISO, com deslocamento em dias. */
export function shiftISO(days: number, time = '09:00'): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const [hours, minutes] = time.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

export function formatDate(value?: string | null): string {
  if (!value) return '—';
  return parse(value).toLocaleDateString('pt-BR');
}

export function formatTime(value?: string | null): string {
  if (!value) return '—';
  const date = parse(value);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatDateTime(value?: string | null): string {
  if (!value) return '—';
  return `${formatDate(value)} às ${formatTime(value)}`;
}

export function shortDateTime(value?: string | null): string {
  if (!value) return '—';
  return `${formatDate(value)} · ${formatTime(value)}`;
}

export function isToday(value?: string | null): boolean {
  if (!value) return false;
  return toDateInput(parse(value)) === todayInput();
}

export function daysBetween(from: string, to: string): number {
  return Math.round((parse(to).getTime() - parse(from).getTime()) / 86_400_000);
}
