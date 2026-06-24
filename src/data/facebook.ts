import type { AvatarPalette, FacebookPageType } from './homepage-constants';

export type { FacebookPageType };

/** A highlighted (pinned or popular) Facebook post shown on the homepage. */
export interface FacebookPost {
  id: string;
  pageName: string;
  /** Byline shown under the page name, e.g. "Official · 2d". */
  meta: string;
  official: boolean;
  pinned: boolean;
  /** Use the Calamba city seal as the avatar instead of colored initials. */
  useSeal: boolean;
  initials?: string;
  avatarColor?: AvatarPalette;
  text: string;
  /** Label rendered over the image placeholder. */
  photoLabel: string;
  reactions: string;
  comments: string;
  postUrl: string;
}

/** A Calamba Facebook page residents can follow. */
export interface FacebookPage {
  id: string;
  name: string;
  /** Facebook handle, without the leading slash. */
  handle: string;
  category: string;
  followers: string;
  type: FacebookPageType;
  /** Use the Calamba city seal as the avatar instead of colored initials. */
  useSeal: boolean;
  initials?: string;
  avatarColor?: AvatarPalette;
}

export const highlightedPosts: FacebookPost[] = [
  {
    id: 'advisory-basaan',
    pageName: 'City Government of Calamba',
    meta: 'Official · 2d',
    official: true,
    pinned: true,
    useSeal: true,
    text: 'Public advisory: expect road rerouting along the Poblacion this June 24 for the San Juan Basaan. Plan trips early, and keep the water fun within designated barangay zones.',
    photoLabel: 'ADVISORY GRAPHIC',
    reactions: '1.4K',
    comments: '212',
    postUrl: 'https://facebook.com/CalambaCityGov',
  },
  {
    id: 'summer-hours',
    pageName: 'Explore Calamba — Tourism',
    meta: 'Official · 1d',
    official: true,
    pinned: false,
    useSeal: true,
    text: 'Summer hours are here! Rizal Shrine now welcomes visitors until 6 PM on weekends, with free guided heritage walks every Saturday at 9 AM.',
    photoLabel: 'RIZAL SHRINE · PHOTO',
    reactions: '2.1K',
    comments: '98',
    postUrl: 'https://facebook.com/ExploreCalamba',
  },
  {
    id: 'shrine-exhibit',
    pageName: 'Rizal Shrine Calamba',
    meta: 'Official · 3d',
    official: true,
    pinned: false,
    useSeal: false,
    initials: 'RS',
    avatarColor: 'blue',
    text: 'On display this month: rare 19th-century photographs of the Rizal family home, freshly restored by the NHCP archives team.',
    photoLabel: 'EXHIBIT · PHOTO',
    reactions: '860',
    comments: '44',
    postUrl: 'https://facebook.com/RizalShrineNHCP',
  },
];

export const facebookPages: FacebookPage[] = [
  {
    id: 'calamba-city-gov',
    name: 'City Government of Calamba',
    handle: 'CalambaCityGov',
    category: 'Local Government',
    followers: '182K',
    type: 'official',
    useSeal: true,
  },
  {
    id: 'calamba-pio',
    name: 'Calamba City PIO',
    handle: 'CalambaPIO',
    category: 'Public Information',
    followers: '96K',
    type: 'official',
    useSeal: true,
  },
  {
    id: 'explore-calamba',
    name: 'Explore Calamba — Tourism',
    handle: 'ExploreCalamba',
    category: 'Tourism Office',
    followers: '41K',
    type: 'official',
    useSeal: true,
  },
  {
    id: 'calamba-drrmo',
    name: 'Calamba DRRMO',
    handle: 'CalambaDRRMO',
    category: 'Disaster & Safety',
    followers: '73K',
    type: 'official',
    useSeal: true,
  },
  {
    id: 'rizal-shrine',
    name: 'Rizal Shrine Calamba',
    handle: 'RizalShrineNHCP',
    category: 'Museum · Heritage',
    followers: '28K',
    type: 'official',
    useSeal: false,
    initials: 'RS',
    avatarColor: 'blue',
  },
  {
    id: 'i-love-calamba',
    name: 'I Love Calamba',
    handle: 'ILoveCalamba',
    category: 'Community Group',
    followers: '120K',
    type: 'community',
    useSeal: false,
    initials: 'IL',
    avatarColor: 'red',
  },
  {
    id: 'calamba-eats',
    name: 'Calamba Eats & Finds',
    handle: 'CalambaEats',
    category: 'Food · Community',
    followers: '58K',
    type: 'community',
    useSeal: false,
    initials: 'CE',
    avatarColor: 'orange',
  },
  {
    id: 'makiling-trail-runners',
    name: 'Makiling Trail Runners',
    handle: 'MakilingTrail',
    category: 'Outdoors · Community',
    followers: '12K',
    type: 'community',
    useSeal: false,
    initials: 'MT',
    avatarColor: 'green',
  },
];
