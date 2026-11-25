const NIGHT_FALLBACK = '#e2e8f0';
const MIN_NIGHT_LUMINANCE = 0.3;

// Ikon bermerek gelap (Next.js, Vercel) tak terlihat di atas latar malam.
export function legibleIconColor(hex: string, isNight: boolean): string {
  if (!isNight) return hex;
  const value = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < MIN_NIGHT_LUMINANCE ? NIGHT_FALLBACK : hex;
}
