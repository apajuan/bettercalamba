import { FC } from 'react';

import clsx from 'clsx';

interface ImagePlaceholderProps {
  /**
   * `dark` / `light` apply preset diagonal stripes. `custom` applies none —
   * supply your own background via `className`.
   */
  variant?: 'dark' | 'light' | 'custom';
  /** Optional monospace label centered over the placeholder. */
  label?: string;
  /** Enable the subtle zoom-in on parent hover (parent must have `group`). */
  zoomOnHover?: boolean;
  className?: string;
}

const stripes: Record<'dark' | 'light', string> = {
  dark: 'bg-[repeating-linear-gradient(135deg,#3579d0_0_16px,#2f6dc7_16px_32px)]',
  light:
    'bg-[repeating-linear-gradient(135deg,#d6e4f7_0_15px,#e7eefb_15px_30px)]',
};

/**
 * Styled diagonal-stripe placeholder used wherever a real photo will later
 * live. Fills its (relatively positioned) parent. Print styles hide it.
 */
const ImagePlaceholder: FC<ImagePlaceholderProps> = ({
  variant = 'light',
  label,
  zoomOnHover = true,
  className,
}) => (
  <div
    aria-hidden='true'
    className={clsx(
      'absolute inset-0 flex items-center justify-center',
      variant === 'custom' ? undefined : stripes[variant],
      zoomOnHover &&
        'transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
      className
    )}
  >
    {label && (
      <span
        className={clsx(
          'px-2 text-center font-mono text-[10px] tracking-[0.1em]',
          variant === 'dark' ? 'text-white/70' : 'text-[#6fa3e4]'
        )}
      >
        {label}
      </span>
    )}
  </div>
);

export default ImagePlaceholder;
