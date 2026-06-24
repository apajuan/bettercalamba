import type { LandmarkCategory } from './homepage-constants';

export type { LandmarkCategory };

/** A Calamba tourism landmark shown on the homepage Tourism Highlights. */
export interface Landmark {
  id: string;
  name: string;
  /** Category key — drives badge color via `landmarkCategoryColors`. */
  tag: LandmarkCategory;
  /** Public-path photo. When omitted, a striped placeholder is shown instead. */
  image?: string;
  blurb: string;
  /** When true, this landmark is rendered as the full-bleed hero card. */
  featured?: boolean;
}

export const tourismLandmarks: Landmark[] = [
  {
    id: 'rizal-shrine',
    name: 'Rizal Shrine',
    tag: 'Heritage',
    image: '/rizal-shrine.webp',
    blurb:
      'The reconstructed birthplace of national hero Dr. José Rizal, set in a quiet heritage garden in the heart of the city.',
    featured: true,
  },
  {
    id: 'city-plaza-hall',
    name: 'Calamba City Plaza & Hall',
    tag: 'Civic',
    image: '/city-plaza-hall.webp',
    blurb:
      'The seat of city government fronting the historic town plaza and fountain.',
  },
  {
    id: 'st-john-parish',
    name: 'St. John the Baptist Parish',
    tag: 'Heritage',
    image: '/st-john-parish.webp',
    blurb:
      'The centuries-old stone church where José Rizal was baptized in 1861.',
  },
  {
    id: 'pansol-resorts',
    name: 'Pansol Hot-Spring Resorts',
    tag: 'Leisure',
    blurb:
      'Natural thermal springs at the foot of Mount Makiling — the city’s leisure heart.',
  },
  {
    id: 'calamba-banga',
    name: 'The Calamba “Banga”',
    tag: 'Landmark',
    image: '/calamba-banga.webp',
    blurb:
      'The world’s largest clay jar — Calamba’s iconic monument to its pottery heritage.',
  },
  {
    id: 'mount-makiling',
    name: 'Mount Makiling',
    tag: 'Nature',
    image: '/mount-makiling.webp',
    blurb:
      'A forest reserve and dormant volcano steeped in the legend of Maria Makiling.',
  },
];
