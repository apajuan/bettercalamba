import { FC } from 'react';

import { Link } from 'react-router-dom';

import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface SectionHeaderLink {
  to: string;
  label: string;
}

interface SectionHeaderProps {
  /** Monospace, uppercase eyebrow label (e.g. "Discover Calamba"). */
  label: string;
  /** Large bold section heading. */
  title: string;
  /** Optional supporting description. */
  description?: string;
  /** Optional right-aligned link with arrow (left-aligned headers only). */
  link?: SectionHeaderLink;
  align?: 'left' | 'center';
  /** Used to wire up `aria-labelledby` on the parent section. */
  titleId?: string;
  className?: string;
}

/**
 * Reusable section header: gold dot + mono eyebrow + heading + optional
 * description and right-aligned link. Shared across all homepage sections.
 */
const SectionHeader: FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  link,
  align = 'left',
  titleId,
  className,
}) => (
  <div
    className={clsx(
      'flex gap-6',
      align === 'center'
        ? 'flex-col items-center text-center'
        : 'flex-col items-start sm:flex-row sm:items-end sm:justify-between',
      className
    )}
  >
    <div className={align === 'center' ? 'max-w-2xl' : undefined}>
      <div
        className={clsx(
          'mb-[11px] flex items-center gap-2',
          align === 'center' && 'justify-center'
        )}
      >
        <span className='h-[7px] w-[7px] flex-none rounded-full bg-calamba-gold' />
        <span className='font-mono text-xs font-semibold tracking-[0.18em] text-calamba-blue uppercase'>
          {label}
        </span>
      </div>
      <h2
        id={titleId}
        className='text-2xl font-bold tracking-[-0.02em] text-[#1e2124] md:text-[33px] md:leading-[1.18]'
      >
        {title}
      </h2>
      {description && (
        <p className='mt-2.5 max-w-[54ch] text-base leading-relaxed text-[#596570]'>
          {description}
        </p>
      )}
    </div>

    {link && align === 'left' && (
      <Link
        to={link.to}
        className='inline-flex flex-none items-center gap-1.5 rounded-sm text-sm font-bold whitespace-nowrap text-calamba-blue transition-colors hover:text-[#002885] focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none'
      >
        {link.label}
        <ArrowRight className='h-4 w-4' aria-hidden='true' />
      </Link>
    )}
  </div>
);

export default SectionHeader;
