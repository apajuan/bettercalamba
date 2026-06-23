import { FC } from 'react';

import clsx from 'clsx';

import { avatarPalettes, type AvatarPalette } from '@/data/homepage-constants';

interface AvatarProps {
  /** Render the Calamba city seal image instead of colored initials. */
  useSeal: boolean;
  /** Page/post name — used for the seal image alt text. */
  name: string;
  initials?: string;
  /** Palette key for the colored initials circle. */
  color?: AvatarPalette;
  /** Diameter in pixels. */
  size?: number;
  /** White ring + shadow, for avatars overlapping a colored banner. */
  ringed?: boolean;
  className?: string;
}

/** City seal image OR a colored initials circle. */
const Avatar: FC<AvatarProps> = ({
  useSeal,
  name,
  initials,
  color = 'blue',
  size = 40,
  ringed = false,
  className,
}) => {
  const ringClasses = ringed
    ? 'border-[3px] border-white shadow-[0_1px_3px_rgba(0,0,0,0.18)]'
    : 'border border-[#d8dbdf]';

  if (useSeal) {
    return (
      <img
        src='/calamba-seal.svg'
        alt={`${name} seal`}
        width={size}
        height={size}
        className={clsx(
          'flex-none rounded-full bg-white',
          ringClasses,
          className
        )}
        style={{ width: size, height: size }}
      />
    );
  }

  const palette = avatarPalettes[color];

  return (
    <span
      aria-hidden='true'
      className={clsx(
        'flex flex-none items-center justify-center rounded-full font-bold',
        ringClasses,
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: palette.bg,
        color: palette.fg,
        fontSize: size <= 40 ? 14 : 16,
      }}
    >
      {initials}
    </span>
  );
};

export default Avatar;
