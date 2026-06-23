import { FC } from 'react';

import clsx from 'clsx';

import type { BadgeColor } from '@/data/homepage-constants';

interface CategoryBadgeProps {
  label: string;
  /** Color triple from a data-layer color map. */
  color: BadgeColor;
  /**
   * `badge` — solid, bordered pill on light surfaces.
   * `tag` — translucent white pill for overlaying photos.
   */
  variant?: 'badge' | 'tag';
  className?: string;
}

/**
 * Colored category tag/badge. Colors are dynamic (data-driven) so they are
 * applied via `style`; everything else uses static utility classes.
 */
const CategoryBadge: FC<CategoryBadgeProps> = ({
  label,
  color,
  variant = 'badge',
  className,
}) => {
  if (variant === 'tag') {
    return (
      <span
        className={clsx(
          'inline-flex items-center self-start rounded-[5px] px-2 py-[2px] text-[9px] font-bold tracking-[0.08em] uppercase',
          className
        )}
        style={{ backgroundColor: 'rgba(255,255,255,0.93)', color: color.fg }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center self-start rounded-md border px-[9px] py-[3px] text-[10px] font-bold tracking-[0.08em] uppercase',
        className
      )}
      style={{
        backgroundColor: color.bg,
        color: color.fg,
        borderColor: color.bd,
      }}
    >
      {label}
    </span>
  );
};

export default CategoryBadge;
