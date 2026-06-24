import { FC, useState } from 'react';

import { Users } from 'lucide-react';
import clsx from 'clsx';

import EventFilterTabs, {
  type FilterTab,
} from '@/components/homepage/EventFilterTabs';
import FacebookPageCard from '@/components/homepage/FacebookPageCard';
import FacebookPostCard from '@/components/homepage/FacebookPostCard';
import SectionHeader from '@/components/homepage/SectionHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { facebookPages, highlightedPosts } from '@/data/facebook';
import {
  facebookTypeConfig,
  type FacebookPageType,
} from '@/data/homepage-constants';
import {
  revealBaseClass,
  revealStateClass,
  useScrollReveal,
} from '@/hooks/useScrollReveal';

const pageTabs: FilterTab<FacebookPageType>[] = [
  { key: 'official', label: facebookTypeConfig.official.label },
  { key: 'community', label: facebookTypeConfig.community.label },
];

/**
 * Stay Connected — highlighted posts grid above a "Pages to follow" directory
 * of Direction A page cards with an Official/Community toggle.
 */
const FacebookSection: FC = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const [pageType, setPageType] = useState<FacebookPageType>('official');

  const pages = facebookPages.filter(page => page.type === pageType);

  return (
    <section
      aria-labelledby='facebook-heading'
      className='bg-[#f5f4f1] py-10 md:py-16'
    >
      <div ref={ref} className='container mx-auto px-4'>
        <div className={clsx(revealBaseClass, revealStateClass(isRevealed))}>
          <SectionHeader
            titleId='facebook-heading'
            label='Stay Connected'
            title='On Facebook'
            description='Highlights and official channels from across Calamba City — straight from the pages residents follow.'
          />
        </div>

        {/* Highlighted posts */}
        <div
          className={clsx(
            'mt-7 mb-4 flex items-baseline justify-between gap-4',
            revealBaseClass,
            revealStateClass(isRevealed)
          )}
          style={{ transitionDelay: '60ms' }}
        >
          <div className='flex items-center gap-2.5'>
            <h3 className='text-[17px] font-bold text-[#1e2124]'>
              Highlighted posts
            </h3>
            <span className='inline-flex items-center gap-1.5 rounded-full border border-[#d8dbdf] bg-white px-2.5 py-[3px] text-[11px] font-semibold text-[#596570]'>
              <span className='h-1.5 w-1.5 rounded-full bg-[#0b7f42] motion-safe:animate-pulse' />
              Updated daily
            </span>
          </div>
          <span className='hidden font-mono text-[11.5px] text-[#abb2ba] sm:inline'>
            Pinned &amp; popular
          </span>
        </div>

        {highlightedPosts.length === 0 ? (
          <EmptyState
            icon={Users}
            title='No posts to show'
            message='Highlighted posts from Calamba pages will appear here.'
          />
        ) : (
          <div className='grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3'>
            {highlightedPosts.map((post, index) => (
              <div
                key={post.id}
                className={clsx(revealBaseClass, revealStateClass(isRevealed))}
                style={{ transitionDelay: `${120 + index * 70}ms` }}
              >
                <FacebookPostCard post={post} />
              </div>
            ))}
          </div>
        )}

        {/* Pages to follow */}
        <div
          className={clsx(
            'mt-10 mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center',
            revealBaseClass,
            revealStateClass(isRevealed)
          )}
          style={{ transitionDelay: '60ms' }}
        >
          <h3 className='text-[17px] font-bold text-[#1e2124]'>
            Pages to follow
          </h3>
          <EventFilterTabs
            variant='segmented'
            tabs={pageTabs}
            value={pageType}
            onChange={setPageType}
            ariaLabel='Filter pages by type'
          />
        </div>

        {pages.length === 0 ? (
          <p className='mt-8 text-center font-mono text-sm text-[#abb2ba]'>
            No pages in this category.
          </p>
        ) : (
          <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {pages.map((page, index) => (
              <div
                key={page.id}
                className={clsx(revealBaseClass, revealStateClass(isRevealed))}
                style={{ transitionDelay: `${120 + index * 70}ms` }}
              >
                <FacebookPageCard page={page} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FacebookSection;
