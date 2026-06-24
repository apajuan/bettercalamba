import type { EventCategory } from './homepage-constants';

export type { EventCategory };

/** A city event or festival shown on the homepage Events & Festivals. */
export interface CityEvent {
  id: string;
  /** Day of month, zero-padded for display (e.g. "08"). */
  day: string;
  /** Three-letter uppercase month (e.g. "JUN"). */
  month: string;
  /** Category key — drives badge color/label via `eventCategoryConfig`. */
  categoryKey: EventCategory;
  name: string;
  venue: string;
  time: string;
  /** When true, this event is rendered as the featured banner. */
  featured?: boolean;
  /** Long-form copy shown only on the featured banner. */
  description?: string;
  /** Label rendered over the image placeholder. */
  photoLabel?: string;
}

export const cityEvents: CityEvent[] = [
  {
    id: 'san-juan-festival',
    day: '24',
    month: 'JUN',
    categoryKey: 'fiesta',
    name: 'San Juan Festival & Basaan',
    venue: 'Citywide · Poblacion',
    time: 'All day',
    featured: true,
    description:
      "The feast of St. John the Baptist — the city's patron — famous citywide for its joyful basaan, the traditional water-dousing that cools off all of Calamba.",
    photoLabel: 'SAN JUAN BASAAN · PHOTO',
  },
  {
    id: 'rizal-birthday',
    day: '19',
    month: 'JUN',
    categoryKey: 'heritage',
    name: 'Rizal’s Birthday Commemoration',
    venue: 'Rizal Shrine',
    time: '7:00 AM',
    photoLabel: 'RIZAL BIRTHDAY · PHOTO',
  },
  {
    id: 'araw-ng-calamba',
    day: '21',
    month: 'APR',
    categoryKey: 'calendar',
    name: 'Araw ng Calamba — Cityhood Anniversary',
    venue: 'City Hall Grounds',
    time: '8:00 AM',
    photoLabel: 'ARAW NG CALAMBA · PHOTO',
  },
  {
    id: 'pasko-sa-calamba',
    day: '08',
    month: 'DEC',
    categoryKey: 'calendar',
    name: 'Pasko sa Calamba — Tree Lighting',
    venue: 'City Plaza',
    time: '5:00 PM',
    photoLabel: 'PASKO · PHOTO',
  },
  {
    id: 'makiling-trail-run',
    day: '15',
    month: 'FEB',
    categoryKey: 'calendar',
    name: 'Makiling Eco-Trail Run',
    venue: 'Mt. Makiling Reserve',
    time: '5:00 AM',
    photoLabel: 'TRAIL RUN · PHOTO',
  },
  {
    id: 'rizal-day',
    day: '30',
    month: 'DEC',
    categoryKey: 'heritage',
    name: 'Rizal Day',
    venue: 'Rizal Shrine',
    time: '7:00 AM',
    photoLabel: 'RIZAL DAY · PHOTO',
  },
];
