import { FC } from 'react';

import { Check } from 'lucide-react';
import clsx from 'clsx';

interface VerifiedBadgeProps {
  /** Diameter in pixels. */
  size?: number;
  className?: string;
}

/** Blue circle with a white check — marks an official/verified page. */
const VerifiedBadge: FC<VerifiedBadgeProps> = ({ size = 15, className }) => (
  <span
    role='img'
    aria-label='Verified'
    className={clsx(
      'inline-flex flex-none items-center justify-center rounded-full bg-calamba-blue text-white',
      className
    )}
    style={{ width: size, height: size }}
  >
    <Check
      strokeWidth={3}
      style={{
        width: Math.round(size * 0.66),
        height: Math.round(size * 0.66),
      }}
      aria-hidden='true'
    />
  </span>
);

export default VerifiedBadge;
