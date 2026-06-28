import { FC } from 'react';

import { ArrowRight, MapPin, Star } from 'lucide-react';

import CategoryBadge from '@/components/homepage/CategoryBadge';
import ImagePlaceholder from '@/components/homepage/ImagePlaceholder';
import { landmarkCategoryColors } from '@/data/homepage-constants';
import type { Destination } from '@/data/tourism';

interface DestinationCardProps {
  destination: Destination;
  /** Called when the whole card is activated — opens the detail modal. */
  onSelect: (destination: Destination) => void;
}

/** Mono uppercase micro-label used in the quick-facts row. */
const MicroLabel: FC<{ children: string }> = ({ children }) => (
  <span className='font-mono text-[9px] font-medium tracking-[0.08em] text-[#8a8a82] uppercase'>
    {children}
  </span>
);

/**
 * Rich destination card for the All Destinations grid. The whole card is a
 * button that opens the shared detail modal.
 */
const DestinationCard: FC<DestinationCardProps> = ({
  destination,
  onSelect,
}) => {
  const color = landmarkCategoryColors[destination.tag];
  const extraAmenities = destination.amenities.length - 3;

  return (
    <button
      type='button'
      onClick={() => onSelect(destination)}
      className='group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#d8dbdf] bg-white text-left transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#acc8ef] hover:shadow-[0_16px_30px_-14px_rgba(0,12,46,0.32)] focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0'
    >
      {/* Image */}
      <div className='relative h-[158px]'>
        {destination.image ? (
          <img
            src={destination.image}
            alt={destination.name}
            loading='lazy'
            className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
          />
        ) : (
          <ImagePlaceholder variant='dark' label={destination.photo} />
        )}
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-[linear-gradient(to_top,rgba(0,12,46,0.85)_0%,rgba(0,12,46,0.25)_45%,rgba(0,12,46,0.04)_100%)]'
        />
        <span className='absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-[#1e2124]'>
          <Star
            className='h-3 w-3 text-calamba-gold'
            fill='currentColor'
            aria-hidden='true'
          />
          {destination.rating}
        </span>
        <CategoryBadge
          variant='tag'
          label={destination.tag}
          color={color}
          className='absolute bottom-2.5 left-2.5'
        />
      </div>

      {/* Body */}
      <div className='flex flex-1 flex-col px-[17px] pt-4 pb-[17px]'>
        <h3 className='text-[17px] font-bold tracking-[-0.01em] text-[#1e2124]'>
          {destination.name}
        </h3>
        <p className='mt-1 flex items-center gap-1 font-mono text-[11px] text-[#596570]'>
          <MapPin className='h-3 w-3 flex-none' aria-hidden='true' />
          {destination.area}
        </p>
        <p className='mt-2 text-[13.5px] leading-relaxed text-[#55554f]'>
          {destination.blurb}
        </p>

        {/* Quick facts */}
        <div className='mt-4 grid grid-cols-3 gap-2 border-t border-[#ecebe7] pt-[15px]'>
          {[
            { label: 'Hours', value: destination.hoursShort },
            { label: 'Entry', value: destination.admission },
            { label: 'Visit', value: destination.duration },
          ].map(fact => (
            <div key={fact.label}>
              <MicroLabel>{fact.label}</MicroLabel>
              <p className='mt-0.5 text-[12.5px] font-bold text-[#1e2124]'>
                {fact.value}
              </p>
            </div>
          ))}
        </div>

        {/* Amenity chips */}
        <div className='mt-3 flex flex-wrap gap-1.5'>
          {destination.amenities.slice(0, 3).map(a => (
            <span
              key={a}
              className='rounded-[7px] border border-[#e4e3df] bg-[#f5f4f1] px-2 py-0.5 text-[11px] text-[#3d4248]'
            >
              {a}
            </span>
          ))}
          {extraAmenities > 0 && (
            <span className='rounded-[7px] bg-[#eef3fc] px-2 py-0.5 text-[11px] font-medium text-calamba-blue'>
              +{extraAmenities} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className='mt-auto flex items-center justify-between pt-4'>
          <span className='inline-flex items-center gap-1 text-[13px] font-bold text-calamba-blue'>
            View details
            <ArrowRight className='h-3.5 w-3.5' aria-hidden='true' />
          </span>
          <span className='font-mono text-[11px] text-[#8a8a82]'>
            {destination.distance}
          </span>
        </div>
      </div>
    </button>
  );
};

export default DestinationCard;
