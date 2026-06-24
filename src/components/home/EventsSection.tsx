import { FC, useState } from 'react';

import { CalendarX } from 'lucide-react';
import clsx from 'clsx';

import EventAgendaCard from '@/components/homepage/EventAgendaCard';
import EventFeaturedBanner from '@/components/homepage/EventFeaturedBanner';
import EventFilterTabs, {
  type FilterTab,
} from '@/components/homepage/EventFilterTabs';
import SectionHeader from '@/components/homepage/SectionHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { cityEvents, type EventCategory } from '@/data/events';
import {
  revealBaseClass,
  revealStateClass,
  useScrollReveal,
} from '@/hooks/useScrollReveal';

type EventFilter = 'all' | EventCategory;

const filterTabs: FilterTab<EventFilter>[] = [
  { key: 'all', label: 'All' },
  { key: 'fiesta', label: 'Fiestas' },
  { key: 'heritage', label: 'Heritage' },
  { key: 'calendar', label: 'City Calendar' },
];

/**
 * Events & Festivals — featured banner (Direction A) above filter tabs and a
 * two-column agenda list (Direction B).
 */
const EventsSection: FC = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<EventFilter>('all');

  const featured = cityEvents.find(event => event.featured);
  const listEvents =
    filter === 'all'
      ? cityEvents
      : cityEvents.filter(event => event.categoryKey === filter);

  return (
    <section
      aria-labelledby='events-heading'
      className='border-y border-[#d8dbdf] bg-[#f7f7f8] py-10 md:py-16'
    >
      <div ref={ref} className='container mx-auto px-4'>
        <div className={clsx(revealBaseClass, revealStateClass(isRevealed))}>
          <SectionHeader
            titleId='events-heading'
            label="What's On"
            title='Events & Festivals'
            link={{ to: '/events', label: 'Open calendar' }}
          />
        </div>

        {cityEvents.length === 0 ? (
          <EmptyState
            icon={CalendarX}
            title='No events at this time'
            message='Check back soon for upcoming festivals and city events.'
          />
        ) : (
          <>
            {featured && (
              <div
                className={clsx(
                  'mt-5 mb-7',
                  revealBaseClass,
                  revealStateClass(isRevealed)
                )}
                style={{ transitionDelay: '80ms' }}
              >
                <EventFeaturedBanner event={featured} />
              </div>
            )}

            <div
              className={clsx(revealBaseClass, revealStateClass(isRevealed))}
              style={{ transitionDelay: '120ms' }}
            >
              <EventFilterTabs
                tabs={filterTabs}
                value={filter}
                onChange={setFilter}
                ariaLabel='Filter events by category'
              />
            </div>

            {listEvents.length === 0 ? (
              <p className='mt-8 text-center font-mono text-sm text-[#abb2ba]'>
                No events in this category.
              </p>
            ) : (
              <div className='mt-6 grid gap-4 md:grid-cols-2'>
                {listEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={clsx(
                      revealBaseClass,
                      revealStateClass(isRevealed)
                    )}
                    style={{ transitionDelay: `${160 + index * 60}ms` }}
                  >
                    <EventAgendaCard event={event} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
