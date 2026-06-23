import { FC } from 'react';

import { CalendarClock, MapPin } from 'lucide-react';

import { eventCategoryConfig } from '@/data/homepage-constants';
import type { CityEvent } from '@/data/events';

import CategoryBadge from './CategoryBadge';

interface EventAgendaCardProps {
  event: CityEvent;
}

/** Agenda-list row: date block + category badge + title + time/venue meta. */
const EventAgendaCard: FC<EventAgendaCardProps> = ({ event }) => {
  const category = eventCategoryConfig[event.categoryKey];

  return (
    <article
      tabIndex={0}
      className='group flex cursor-pointer gap-4 rounded-2xl border border-[#d8dbdf] bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#acc8ef] hover:shadow-[0_8px_18px_-10px_rgba(0,12,46,0.2)] focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0'
    >
      <div className='w-[62px] flex-none rounded-[11px] border border-[#d8dbdf] bg-[#f7f7f8] py-[11px] text-center'>
        <div className='text-[23px] leading-none font-extrabold text-calamba-blue'>
          {event.day}
        </div>
        <div className='mt-1 font-mono text-[10px] tracking-[0.13em] text-[#596570]'>
          {event.month}
        </div>
      </div>

      <div className='min-w-0 flex-1'>
        <CategoryBadge label={category.label} color={category} />
        <h4 className='mt-2 text-[15.5px] leading-snug font-bold text-[#1e2124]'>
          {event.name}
        </h4>
        <div className='mt-2 flex flex-wrap gap-x-[14px] gap-y-1.5 font-mono text-xs text-[#596570]'>
          <span className='inline-flex items-center gap-1'>
            <CalendarClock className='h-3.5 w-3.5' aria-hidden='true' />
            {event.time}
          </span>
          <span className='inline-flex items-center gap-1'>
            <MapPin className='h-3.5 w-3.5' aria-hidden='true' />
            {event.venue}
          </span>
        </div>
      </div>
    </article>
  );
};

export default EventAgendaCard;
