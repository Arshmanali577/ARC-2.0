type ClassValue = string | number | null | undefined | false;

/** Minimal class-name joiner — no runtime dependency needed for this site. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
