import type { LandmarkCategory } from './homepage-constants';
import destinationsData from './tourism/destinations.json';

export type { LandmarkCategory };

/** A single "What to see & do" highlight shown in the detail modal. */
export interface DestinationHighlight {
  /** Highlight title. */
  t: string;
  /** Supporting description. */
  d: string;
}

/** One weekly opening-hours row in the detail modal. */
export interface DestinationHours {
  /** Day or range label, e.g. "Tue – Sun". */
  d: string;
  /** Time text, e.g. "8:00 AM – 5:00 PM" or "Closed". */
  t: string;
  /** When true, the time renders in alert red (closed/unavailable). */
  off?: boolean;
}

/**
 * A Calamba tourism destination. Single shared source for the homepage
 * Tourism Highlights section, the All Destinations page, and the detail modal.
 */
export interface Destination {
  /** Slug, e.g. "rizal". */
  id: string;
  name: string;
  /** Category key — drives badge color via `landmarkCategoryColors`. */
  tag: LandmarkCategory;
  /**
   * Public-path photo. When omitted, a striped placeholder captioned with
   * `photo` is shown instead.
   */
  image?: string;
  /** Placeholder caption shown over the striped placeholder, e.g. "RIZAL SHRINE · PHOTO". */
  photo: string;
  rating: string;
  reviews: string;
  /** Short location, e.g. "Poblacion · J.P. Rizal St." */
  area: string;
  /** Full address, shown in the modal header. */
  address: string;
  /** "Free", "Varies", "Entrance fee", "Permit fee". */
  admission: string;
  /** Suggested visit length, e.g. "1–2 hrs", "Full day". */
  duration: string;
  bestTime: string;
  /** Distance from city center, e.g. "City center", "6 km". */
  distance: string;
  /** Compact hours shown on the card, e.g. "Tue–Sun", "Nightly". */
  hoursShort: string;
  /** One-line card description. */
  blurb: string;
  /** Full overview paragraph (modal). */
  overview: string;
  /** "What to see & do" list (modal). */
  highlights: DestinationHighlight[];
  /** Weekly opening-hours rows (modal). */
  hoursWeek: DestinationHours[];
  /** Amenity chip labels. */
  amenities: string[];
  /** "Getting there" paragraph (modal). */
  gettingThere: string;
  /** "Insider tip" paragraph (modal). */
  tip: string;
  /** Contact phone, "(049) 545-1880" or "—". */
  phone: string;
  /** Facebook handle, e.g. "fb.com/RizalShrineNHCP". */
  fb: string;
}

/**
 * Canonical destination directory — all 12 Calamba destinations.
 *
 * Content lives in `./tourism/destinations.json` (version-controlled static
 * data, per the project's data-layer convention); this module owns the
 * `Destination` type and is the seam where a real CMS/API call would later
 * replace the JSON import. The cast is safe because the JSON is hand-curated
 * to match the type.
 */
export const destinations = destinationsData as Destination[];

/**
 * The homepage Tourism Highlights section features the first 6 destinations:
 * Rizal Shrine, City Plaza & Hall, St. John Parish, Pansol, the Banga, Makiling.
 */
export const tourismHighlights: Destination[] = destinations.slice(0, 6);
