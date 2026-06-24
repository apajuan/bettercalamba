import { FC } from 'react';

import { ArrowRight, Star } from 'lucide-react';
import clsx from 'clsx';

import CategoryBadge from '@/components/homepage/CategoryBadge';
import ImagePlaceholder from '@/components/homepage/ImagePlaceholder';
import SectionHeader from '@/components/homepage/SectionHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { landmarkCategoryColors } from '@/data/homepage-constants';
import { tourismLandmarks } from '@/data/tourism';
import {
  revealBaseClass,
  revealStateClass,
  useScrollReveal,
} from '@/hooks/useScrollReveal';

/**
 * Tourism Highlights — Direction A "Editorial Warm": a full-bleed hero card
 * for the featured landmark above a filmstrip of the remaining destinations.
 */
const TourismHighlights: FC = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();

  const hero =
    tourismLandmarks.find(landmark => landmark.featured) ?? tourismLandmarks[0];
  const filmstrip = tourismLandmarks
    .filter(landmark => landmark.id !== hero?.id)
    .slice(0, 5);

  return (
    <section
      aria-labelledby='tourism-heading'
      className='bg-[#f5f4f1] py-10 md:py-16'
    >
      <div ref={ref} className='container mx-auto px-4'>
        <div className={clsx(revealBaseClass, revealStateClass(isRevealed))}>
          <SectionHeader
            titleId='tourism-heading'
            label='Discover Calamba'
            title='Tourism Highlights'
            description='Heritage, hot springs, and the home of a hero — the places that make Calamba worth the trip.'
            link={{ to: '/tourism', label: 'All destinations' }}
          />
        </div>

        {tourismLandmarks.length === 0 ? (
          <EmptyState
            icon={Star}
            title='No destinations yet'
            message='Tourism highlights will appear here soon.'
          />
        ) : (
          <>
            {/* Featured hero */}
            {hero && (
              <div
                className={clsx(
                  'mt-7',
                  revealBaseClass,
                  revealStateClass(isRevealed)
                )}
                style={{ transitionDelay: '80ms' }}
              >
                <article
                  tabIndex={0}
                  className='group relative block h-[300px] cursor-pointer overflow-hidden rounded-2xl shadow-[0_4px_14px_-4px_rgba(0,12,46,0.32)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_20px_40px_-14px_rgba(0,12,46,0.45)] focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:h-[340px]'
                >
                  {hero.image ? (
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className='absolute inset-0 h-full w-full object-cover object-[center_30%] transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
                    />
                  ) : (
                    <ImagePlaceholder variant='dark' />
                  )}
                  <div
                    aria-hidden='true'
                    className='absolute inset-0 bg-[linear-gradient(115deg,rgba(0,12,46,0.77)_0%,rgba(0,12,46,0.26)_48%,rgba(0,12,46,0)_100%)]'
                  />
                  <div className='absolute top-4 right-[18px] inline-flex items-center gap-1.5 rounded-full bg-calamba-gold px-[11px] py-[5px] text-[11px] font-extrabold tracking-[0.06em] text-[#1e2124] uppercase'>
                    <Star
                      className='h-3 w-3'
                      fill='currentColor'
                      aria-hidden='true'
                    />
                    Must-see
                  </div>
                  <div className='absolute right-8 bottom-7 left-8 max-w-[80%] sm:max-w-[60%]'>
                    <CategoryBadge
                      variant='tag'
                      label={hero.tag}
                      color={landmarkCategoryColors[hero.tag]}
                    />
                    <h3 className='mt-3 text-[26px] leading-[1.1] font-extrabold tracking-[-0.01em] text-white md:text-[32px]'>
                      {hero.name}
                    </h3>
                    <p className='mt-[11px] text-[15px] leading-relaxed text-white/90'>
                      {hero.blurb}
                    </p>
                    <span className='mt-4 inline-flex items-center gap-[7px] text-sm font-bold text-white'>
                      Plan your visit
                      <ArrowRight className='h-4 w-4' aria-hidden='true' />
                    </span>
                  </div>
                </article>
              </div>
            )}

            {/* Filmstrip — horizontal scroll on mobile, grid on larger screens */}
            <div className='mt-[18px] flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 lg:grid-cols-5'>
              {filmstrip.map((landmark, index) => (
                <div
                  key={landmark.id}
                  className={clsx(
                    'min-w-[72%] flex-none snap-start sm:min-w-[48%] md:min-w-0',
                    revealBaseClass,
                    revealStateClass(isRevealed)
                  )}
                  style={{ transitionDelay: `${140 + index * 70}ms` }}
                >
                  <article
                    tabIndex={0}
                    className='group relative block h-[200px] w-full cursor-pointer overflow-hidden rounded-2xl shadow-[0_2px_8px_-2px_rgba(38,43,43,0.22)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_16px_28px_-12px_rgba(0,12,46,0.42)] focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:h-[224px]'
                  >
                    {landmark.image ? (
                      <img
                        src={landmark.image}
                        alt={landmark.name}
                        loading='lazy'
                        className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
                      />
                    ) : (
                      <ImagePlaceholder variant='dark' />
                    )}
                    <div
                      aria-hidden='true'
                      className='absolute inset-0 bg-[linear-gradient(to_top,rgba(0,12,46,0.9)_0%,rgba(0,12,46,0.3)_48%,rgba(0,12,46,0.04)_100%)]'
                    />
                    <div className='absolute right-3 bottom-[13px] left-3'>
                      <CategoryBadge
                        variant='tag'
                        label={landmark.tag}
                        color={landmarkCategoryColors[landmark.tag]}
                      />
                      <h3 className='mt-[7px] text-[14.5px] leading-[1.25] font-bold text-white'>
                        {landmark.name}
                      </h3>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TourismHighlights;
