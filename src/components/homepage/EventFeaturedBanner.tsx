import { FC, ReactNode } from 'react';

import { CalendarPlus } from 'lucide-react';

import { eventCategoryConfig } from '@/data/homepage-constants';
import type { CityEvent } from '@/data/events';

import ImagePlaceholder from './ImagePlaceholder';

interface EventFeaturedBannerProps {
  event: CityEvent;
}

/** Italicize the Tagalog term "basaan" wherever it appears in the copy. */
function withEmphasis(text: string): ReactNode[] {
  return text
    .split(/(basaan)/gi)
    .map((part, index) =>
      part.toLowerCase() === 'basaan' ? (
        <em key={index}>{part}</em>
      ) : (
        <span key={index}>{part}</span>
      )
    );
}

/**
 * Direction A featured-event banner: split layout with an image + floating
 * date badge on the left and a deep-navy detail panel on the right.
 */
const EventFeaturedBanner: FC<EventFeaturedBannerProps> = ({ event }) => {
  const category = eventCategoryConfig[event.categoryKey];

  return (
    <div className='group grid overflow-hidden rounded-2xl bg-[#00134a] shadow-[0_12px_28px_-12px_rgba(0,12,46,0.45)] md:grid-cols-[42%_1fr]'>
      {/* Left — image + floating date badge */}
      <div className='relative min-h-[180px] overflow-hidden md:min-h-[268px]'>
        <ImagePlaceholder
          variant='custom'
          className='bg-[repeating-linear-gradient(135deg,#1457b8_0_18px,#0f4aa3_18px_36px)]'
        />
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-[linear-gradient(90deg,rgba(0,19,74,0)_60%,rgba(0,19,74,0.7)_100%)]'
        />
        {event.photoLabel && (
          <span className='absolute top-3.5 left-[15px] font-mono text-[9.5px] tracking-[0.1em] text-white/70'>
            {event.photoLabel}
          </span>
        )}
        <div className='absolute top-4 right-[15px] rounded-[13px] bg-white/95 px-[15px] py-[9px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.2)]'>
          <div className='text-[30px] leading-none font-extrabold text-calamba-red'>
            {event.day}
          </div>
          <div className='mt-[3px] font-mono text-[10.5px] tracking-[0.14em] text-[#1e2124]'>
            {event.month}
          </div>
        </div>
      </div>

      {/* Right — detail panel */}
      <div className='flex flex-col justify-center p-7 text-white md:px-[38px] md:py-[34px]'>
        <div className='flex items-center gap-2'>
          <span className='h-[7px] w-[7px] flex-none rounded-full bg-calamba-gold' />
          <span className='font-mono text-[11px] font-semibold tracking-[0.16em] text-calamba-gold uppercase'>
            Featured {category.label}
          </span>
        </div>
        <h3 className='mt-[11px] text-2xl leading-[1.18] font-extrabold tracking-[-0.01em] md:text-[27px]'>
          {event.name}
        </h3>
        {event.description && (
          <p className='mt-3 max-w-[46ch] text-[15px] leading-relaxed text-white/80'>
            {withEmphasis(event.description)}
          </p>
        )}
        <div className='mt-6 flex flex-wrap gap-3'>
          <button
            type='button'
            className='rounded-[9px] bg-[#f5f4f1] px-[22px] py-[11px] text-sm font-bold text-calamba-blue transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00134a] focus-visible:outline-none'
          >
            View details
          </button>
          <button
            type='button'
            className='inline-flex items-center gap-2 rounded-[9px] border-[1.5px] border-white/50 px-[22px] py-[11px] text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00134a] focus-visible:outline-none'
          >
            <CalendarPlus className='h-4 w-4' aria-hidden='true' />
            Add to calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFeaturedBanner;
