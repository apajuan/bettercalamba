import { FC } from 'react';

import type { FacebookPage } from '@/data/facebook';

import Avatar from './Avatar';
import VerifiedBadge from './VerifiedBadge';

interface FacebookPageCardProps {
  page: FacebookPage;
}

/** Direction A page card: blue gradient header, overlapping avatar, Follow CTA. */
const FacebookPageCard: FC<FacebookPageCardProps> = ({ page }) => (
  <article className='group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d8dbdf] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#acc8ef] hover:shadow-[0_12px_22px_-10px_rgba(0,12,46,0.2)] focus-within:ring-2 focus-within:ring-calamba-blue focus-within:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0'>
    <div className='relative h-[62px] bg-[linear-gradient(120deg,#0032a0,#1457b8)]'>
      <span
        aria-hidden='true'
        className='absolute top-3 right-[13px] flex h-6 w-6 items-center justify-center rounded-[7px] bg-white/20 font-serif text-[15px] font-extrabold text-white'
      >
        f
      </span>
    </div>

    <div className='relative z-10 -mt-[26px] flex flex-1 flex-col items-start px-[18px] pb-[18px]'>
      <Avatar
        ringed
        useSeal={page.useSeal}
        name={page.name}
        initials={page.initials}
        color={page.avatarColor}
        size={54}
      />
      <div className='mt-[13px] flex items-center gap-1.5'>
        <h4 className='text-[15.5px] leading-tight font-bold text-[#1e2124]'>
          {page.name}
        </h4>
        {page.type === 'official' && <VerifiedBadge size={16} />}
      </div>
      <span className='mt-1.5 font-mono text-[11px] text-[#596570]'>
        {page.category}
      </span>
      <span className='mt-[9px] text-[12.5px] text-[#596570]'>
        <strong className='text-[#1e2124]'>{page.followers}</strong> followers
      </span>
      <a
        href={`https://facebook.com/${page.handle}`}
        target='_blank'
        rel='noopener noreferrer'
        data-print-hide
        className='mt-auto block w-full rounded-lg bg-calamba-blue py-[9px] text-center text-[13.5px] font-bold text-[#f5f4f1] transition-colors hover:bg-[#002885] focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none'
      >
        Follow
      </a>
    </div>
  </article>
);

export default FacebookPageCard;
