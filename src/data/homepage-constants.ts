/**
 * Shared design constants for the homepage feature sections
 * (Tourism Highlights, Events & Festivals, Stay Connected).
 *
 * The category color maps live here — never inline inside components — so the
 * data layer stays the single source of truth for category theming. Every
 * value is taken directly from the Calamba homepage design mockups.
 *
 * Components consume these via `style={}` for the dynamic, data-driven bits
 * (badge fills, avatar tints) that cannot be expressed as static Tailwind
 * tokens. Static brand colors still use Calamba/Kapwa tokens.
 */

/** Background / foreground / border triple for a colored badge. */
export interface BadgeColor {
  /** Background fill. */
  bg: string;
  /** Foreground text + icon color. */
  fg: string;
  /** Border color. */
  bd: string;
}

/* ------------------------------------------------------------------ */
/* Tourism landmark categories                                         */
/* ------------------------------------------------------------------ */

export type LandmarkCategory =
  | 'Heritage'
  | 'Civic'
  | 'Leisure'
  | 'Landmark'
  | 'Nature'
  | 'Food';

export const landmarkCategoryColors: Record<LandmarkCategory, BadgeColor> = {
  Heritage: { bg: '#eef3fc', fg: '#0032a0', bd: '#acc8ef' },
  Civic: { bg: '#f0f8ff', fg: '#0159a3', bd: '#b9defe' },
  Leisure: { bg: '#fff9ed', fg: '#c45a0a', bd: '#ffe3a9' },
  Landmark: { bg: '#fce7ee', fg: '#bf0d3e', bd: '#f3c6d5' },
  Nature: { bg: '#effef5', fg: '#0b7f42', bd: '#b6fcd5' },
  Food: { bg: '#fdf0e3', fg: '#a8540a', bd: '#f6d8b6' },
};

/* ------------------------------------------------------------------ */
/* Event categories                                                    */
/* ------------------------------------------------------------------ */

export type EventCategory = 'fiesta' | 'heritage' | 'calendar';

export interface EventCategoryConfig extends BadgeColor {
  label: string;
}

export const eventCategoryConfig: Record<EventCategory, EventCategoryConfig> = {
  fiesta: { bg: '#fce7ee', fg: '#bf0d3e', bd: '#f3c6d5', label: 'Fiesta' },
  heritage: { bg: '#eef3fc', fg: '#0032a0', bd: '#acc8ef', label: 'Heritage' },
  calendar: {
    bg: '#f0f8ff',
    fg: '#0159a3',
    bd: '#b9defe',
    label: 'City Calendar',
  },
};

/* ------------------------------------------------------------------ */
/* Facebook page types                                                 */
/* ------------------------------------------------------------------ */

export type FacebookPageType = 'official' | 'community';

export interface FacebookTypeConfig extends BadgeColor {
  label: string;
}

export const facebookTypeConfig: Record<FacebookPageType, FacebookTypeConfig> =
  {
    official: {
      bg: '#eef3fc',
      fg: '#0032a0',
      bd: '#acc8ef',
      label: 'Official',
    },
    community: {
      bg: '#f7f7f8',
      fg: '#596570',
      bd: '#d8dbdf',
      label: 'Community',
    },
  };

/* ------------------------------------------------------------------ */
/* Initials-avatar palettes (used when no seal image is available)     */
/* ------------------------------------------------------------------ */

export type AvatarPalette = 'blue' | 'red' | 'orange' | 'green';

export const avatarPalettes: Record<AvatarPalette, { bg: string; fg: string }> =
  {
    blue: { bg: '#eef3fc', fg: '#0032a0' },
    red: { bg: '#fce7ee', fg: '#bf0d3e' },
    orange: { bg: '#fff9ed', fg: '#c45a0a' },
    green: { bg: '#effef5', fg: '#0b7f42' },
  };
