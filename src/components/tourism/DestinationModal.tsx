import { FC } from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ArrowRight, Check, Info, MapPin, Star, X } from 'lucide-react';

import CategoryBadge from '@/components/homepage/CategoryBadge';
import ImagePlaceholder from '@/components/homepage/ImagePlaceholder';
import { landmarkCategoryColors } from '@/data/homepage-constants';
import type { Destination } from '@/data/tourism';

interface DestinationModalProps {
  /** The destination to display, or `null` when the modal is closed. */
  destination: Destination | null;
  /** Called when the user dismisses the modal (× button, backdrop, or Esc). */
  onClose: () => void;
}

/** Mono uppercase micro-label used throughout the modal body. */
const MicroLabel: FC<{ children: string }> = ({ children }) => (
  <span className='font-mono text-[10px] font-medium tracking-[0.08em] text-[#8a8a82] uppercase'>
    {children}
  </span>
);

/**
 * Shared destination detail modal. Opened by clicking any destination card on
 * either the homepage Tourism Highlights section or the All Destinations page.
 *
 * Built on the Radix Dialog primitive for focus trapping, Esc-to-close, and
 * backdrop-click dismissal; clicks inside the dialog do not close it.
 */
const DestinationModal: FC<DestinationModalProps> = ({
  destination,
  onClose,
}) => {
  const color = destination
    ? landmarkCategoryColors[destination.tag]
    : undefined;

  return (
    <DialogPrimitive.Root
      open={destination !== null}
      onOpenChange={open => {
        if (!open) onClose();
      }}
    >
      {destination && color && (
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[60] bg-[rgba(8,14,30,0.55)]' />
          <div className='fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-5 py-10'>
            <DialogPrimitive.Content
              aria-describedby={`destination-overview-${destination.id}`}
              className='data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4 relative flex h-[calc(100dvh-5rem)] max-h-[820px] w-full max-w-[840px] flex-col overflow-hidden rounded-[18px] bg-[#f5f4f1] shadow-[0_30px_80px_-20px_rgba(0,12,46,0.6)] duration-200'
            >
              {/* Hero */}
              <div className='relative h-[260px] flex-none'>
                {destination.image ? (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className='absolute inset-0 h-full w-full object-cover'
                  />
                ) : (
                  <ImagePlaceholder
                    variant='dark'
                    label={destination.photo}
                    zoomOnHover={false}
                  />
                )}
                <div
                  aria-hidden='true'
                  className='absolute inset-0 bg-[linear-gradient(to_top,rgba(0,12,46,0.92)_0%,rgba(0,12,46,0.4)_50%,rgba(0,12,46,0.1)_100%)]'
                />

                <DialogPrimitive.Close className='absolute top-4 right-4 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 text-[#1e2124] transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none'>
                  <X className='h-4 w-4' aria-hidden='true' />
                  <span className='sr-only'>Close</span>
                </DialogPrimitive.Close>

                <div className='absolute right-7 bottom-6 left-7'>
                  <CategoryBadge
                    variant='tag'
                    label={destination.tag}
                    color={color}
                  />
                  <div className='mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-white/90'>
                    <Star
                      className='h-3.5 w-3.5 text-calamba-gold'
                      fill='currentColor'
                      aria-hidden='true'
                    />
                    {destination.rating}
                    <span className='font-normal text-white/70'>
                      ({destination.reviews} reviews)
                    </span>
                  </div>
                  <DialogPrimitive.Title className='mt-1 text-[26px] leading-tight font-extrabold tracking-[-0.01em] text-white md:text-[30px]'>
                    {destination.name}
                  </DialogPrimitive.Title>
                  <p className='mt-1.5 flex items-center gap-1.5 font-mono text-[11px] text-white/75'>
                    <MapPin className='h-3.5 w-3.5 flex-none' aria-hidden='true' />
                    {destination.address}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className='flex-1 overflow-y-auto px-7 pt-6 pb-7'>
                {/* Quick-fact strip */}
                <div className='grid grid-cols-2 gap-2.5 sm:grid-cols-4'>
                  {[
                    { label: 'Admission', value: destination.admission },
                    { label: 'Suggested visit', value: destination.duration },
                    { label: 'Best time', value: destination.bestTime },
                    { label: 'From center', value: destination.distance },
                  ].map(fact => (
                    <div
                      key={fact.label}
                      className='rounded-xl border border-[#e4e3df] bg-white px-3.5 py-[13px]'
                    >
                      <MicroLabel>{fact.label}</MicroLabel>
                      <p className='mt-1 text-sm font-bold text-[#1e2124]'>
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Overview */}
                <DialogPrimitive.Description
                  id={`destination-overview-${destination.id}`}
                  className='mt-5 text-[15px] leading-[1.62] text-[#3d4248]'
                >
                  {destination.overview}
                </DialogPrimitive.Description>

                {/* Two-column detail */}
                <div className='mt-6 grid gap-[22px] md:grid-cols-[1.4fr_1fr] md:items-start'>
                  {/* Left column */}
                  <div className='space-y-6'>
                    <section>
                      <h3 className='text-[13px] font-bold tracking-[0.04em] text-[#1e2124] uppercase'>
                        What to see &amp; do
                      </h3>
                      <ul className='mt-3 space-y-[11px]'>
                        {destination.highlights.map(h => (
                          <li key={h.t} className='flex gap-2.5'>
                            <span className='mt-0.5 flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-[#eef3fc]'>
                              <Check
                                className='h-3 w-3 text-calamba-blue'
                                aria-hidden='true'
                              />
                            </span>
                            <span>
                              <span className='block text-sm font-bold text-[#1e2124]'>
                                {h.t}
                              </span>
                              <span className='block text-[13px] text-[#596570]'>
                                {h.d}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className='text-[13px] font-bold tracking-[0.04em] text-[#1e2124] uppercase'>
                        Getting there
                      </h3>
                      <p className='mt-2 text-[13.5px] leading-relaxed text-[#3d4248]'>
                        {destination.gettingThere}
                      </p>
                    </section>

                    {/* Insider tip */}
                    <div className='flex gap-3 rounded-xl border border-[#ffe9a3] bg-calamba-gold-light px-[15px] py-[13px]'>
                      <span className='flex h-5 w-5 flex-none items-center justify-center rounded-full bg-calamba-gold'>
                        <Info
                          className='h-3 w-3 text-[#1e2124]'
                          aria-hidden='true'
                        />
                      </span>
                      <div>
                        <span className='block font-mono text-[10px] font-semibold tracking-[0.08em] text-[#9a7400] uppercase'>
                          Insider tip
                        </span>
                        <p className='mt-0.5 text-[13px] leading-relaxed text-[#5c4a12]'>
                          {destination.tip}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className='rounded-2xl border border-[#e4e3df] bg-white p-[18px]'>
                    <h3 className='text-[13px] font-bold tracking-[0.04em] text-[#1e2124] uppercase'>
                      Opening hours
                    </h3>
                    <ul className='mt-2.5 space-y-1.5'>
                      {destination.hoursWeek.map(row => (
                        <li
                          key={row.d}
                          className='flex items-center justify-between text-[13px]'
                        >
                          <span className='text-[#596570]'>{row.d}</span>
                          <span
                            className='font-medium'
                            style={{ color: row.off ? '#bf0d3e' : '#1e2124' }}
                          >
                            {row.t}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <hr className='my-4 border-t border-[#ecebe7]' />

                    <h3 className='text-[13px] font-bold tracking-[0.04em] text-[#1e2124] uppercase'>
                      Amenities
                    </h3>
                    <div className='mt-2.5 flex flex-wrap gap-1.5'>
                      {destination.amenities.map(a => (
                        <span
                          key={a}
                          className='rounded-[7px] border border-[#e4e3df] bg-[#f5f4f1] px-2 py-1 text-[11.5px] text-[#3d4248]'
                        >
                          {a}
                        </span>
                      ))}
                    </div>

                    <hr className='my-4 border-t border-[#ecebe7]' />

                    <h3 className='text-[13px] font-bold tracking-[0.04em] text-[#1e2124] uppercase'>
                      Contact
                    </h3>
                    <dl className='mt-2.5 space-y-1.5 font-mono text-[12px]'>
                      <div className='flex items-center justify-between'>
                        <dt className='text-[#8a8a82]'>TEL</dt>
                        <dd className='text-[#1e2124]'>{destination.phone}</dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='text-[#8a8a82]'>FB</dt>
                        <dd className='text-calamba-blue'>{destination.fb}</dd>
                      </div>
                    </dl>

                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(
                        `${destination.name}, Calamba`
                      )}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='mt-4 flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-calamba-blue py-[11px] text-sm font-bold text-white transition-colors hover:bg-[#00257a] focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none'
                    >
                      Get directions
                      <ArrowRight className='h-4 w-4' aria-hidden='true' />
                    </a>
                  </div>
                </div>
              </div>
            </DialogPrimitive.Content>
          </div>
        </DialogPrimitive.Portal>
      )}
    </DialogPrimitive.Root>
  );
};

export default DestinationModal;
