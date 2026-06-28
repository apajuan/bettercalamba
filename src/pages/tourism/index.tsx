import { useMemo, useState } from 'react';

import { Link } from 'react-router-dom';

import { useQueryState } from 'nuqs';
import { ArrowLeft, Search } from 'lucide-react';
import clsx from 'clsx';

import DestinationCard from '@/components/tourism/DestinationCard';
import DestinationModal from '@/components/tourism/DestinationModal';
import { SEO } from '@/components/layout/SEO';
import { destinations, type Destination } from '@/data/tourism';

/** Filter tabs — label shown to the user + the `tag` key it matches (`all` = no filter). */
const FILTER_TABS: { label: string; key: string }[] = [
  { label: 'All', key: 'all' },
  { label: 'Heritage', key: 'Heritage' },
  { label: 'Food & Markets', key: 'Food' },
  { label: 'Leisure', key: 'Leisure' },
  { label: 'Nature', key: 'Nature' },
  { label: 'Civic', key: 'Civic' },
  { label: 'Landmarks', key: 'Landmark' },
];

export default function TourismPage() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' });
  const [cat, setCat] = useQueryState('cat', { defaultValue: 'all' });
  const [openId, setOpenId] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter(d => {
      const matchesCat = cat === 'all' || d.tag === cat;
      const matchesQuery =
        q === '' ||
        `${d.name} ${d.area} ${d.blurb} ${d.tag}`.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, cat]);

  const openDestination = openId
    ? (destinations.find(d => d.id === openId) ?? null)
    : null;

  const onSelect = (destination: Destination) => setOpenId(destination.id);

  return (
    <div className='min-h-screen bg-[#f5f4f1]'>
      <SEO
        title='All Destinations — Calamba Tourism'
        description='Explore every must-see destination in Calamba, Laguna — heritage sites, hot springs, nature trails, food bazaars, and more.'
        keywords={[
          'Calamba tourism',
          'Calamba destinations',
          'Rizal Shrine',
          'Mount Makiling',
          'Pansol hot springs',
        ]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tourism', url: '/tourism' },
        ]}
      />

      {/* Breadcrumb band */}
      <div className='w-full bg-calamba-blue'>
        <nav
          aria-label='Breadcrumb'
          className='container mx-auto px-4 py-3.5 font-mono text-[12px]'
        >
          <ol className='flex flex-wrap items-center gap-1.5'>
            <li>
              <Link
                to='/'
                className='text-white/[0.78] transition-colors hover:text-white'
              >
                Calamba
              </Link>
            </li>
            <li aria-hidden='true' className='text-white/40'>
              /
            </li>
            <li>
              <Link
                to='/'
                className='text-white/[0.78] transition-colors hover:text-white'
              >
                Tourism
              </Link>
            </li>
            <li aria-hidden='true' className='text-white/40'>
              /
            </li>
            <li aria-current='page' className='text-white'>
              All destinations
            </li>
          </ol>
        </nav>
      </div>

      {/* Main section */}
      <section className='container mx-auto px-4 pt-12 pb-16'>
        {/* Header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <div className='mb-[11px] flex items-center gap-2'>
              <span className='h-[7px] w-[7px] flex-none rounded-full bg-calamba-gold' />
              <span className='font-mono text-xs font-semibold tracking-[0.18em] text-calamba-blue uppercase'>
                Discover Calamba
              </span>
            </div>
            <h1 className='text-3xl font-extrabold tracking-[-0.025em] text-[#1e2124] md:text-[38px]'>
              All Destinations
            </h1>
            <p className='mt-2.5 max-w-[60ch] text-base leading-relaxed text-[#596570]'>
              Every must-see spot in the City of Calamba — from heritage
              landmarks and hot springs to nature trails and night-market food
              bazaars.
            </p>
          </div>
          <Link
            to='/'
            className='inline-flex flex-none items-center gap-1.5 rounded-sm text-sm font-bold whitespace-nowrap text-calamba-blue transition-colors hover:text-[#00257a] focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none'
          >
            <ArrowLeft className='h-4 w-4' aria-hidden='true' />
            Back to homepage
          </Link>
        </div>

        {/* Controls row */}
        <div className='mt-7 flex flex-wrap items-center gap-3.5'>
          <div className='relative min-w-[260px] flex-1'>
            <Search
              className='pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#8a8a82]'
              aria-hidden='true'
            />
            <input
              type='search'
              value={query}
              onChange={e => setQuery(e.target.value || null)}
              placeholder='Search destinations, areas, categories…'
              aria-label='Search destinations'
              className='w-full rounded-[11px] border border-[#d8dbdf] bg-white py-2.5 pr-3.5 pl-10 text-sm text-[#1e2124] placeholder:text-[#8a8a82] focus:border-[#acc8ef] focus:ring-2 focus:ring-calamba-blue/20 focus:outline-none'
            />
          </div>
          <p className='font-mono text-[12px] text-[#8a8a82]'>
            Showing {results.length} of {destinations.length} places
          </p>
        </div>

        {/* Filter tabs */}
        <div className='mt-4 flex flex-wrap gap-[9px]'>
          {FILTER_TABS.map(tab => {
            const active = cat === tab.key;
            return (
              <button
                key={tab.key}
                type='button'
                onClick={() => setCat(tab.key === 'all' ? null : tab.key)}
                aria-pressed={active}
                className={clsx(
                  'rounded-full px-3.5 py-1.5 text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2 focus-visible:outline-none',
                  active
                    ? 'bg-calamba-blue font-bold text-[#f5f4f1]'
                    : 'border border-[#d8dbdf] bg-white font-semibold text-[#596570] hover:border-[#acc8ef]'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Card grid / empty state */}
        {results.length === 0 ? (
          <div className='mt-7 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dbdf] bg-white px-6 py-16 text-center'>
            <Search className='h-8 w-8 text-[#acc8ef]' aria-hidden='true' />
            <p className='mt-3 text-lg font-bold text-[#1e2124]'>
              No places match your search
            </p>
            <p className='mt-1 text-sm text-[#596570]'>
              Try a different keyword or clear the category filter.
            </p>
          </div>
        ) : (
          <div className='mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {results.map(destination => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </section>

      <DestinationModal
        destination={openDestination}
        onClose={() => setOpenId(null)}
      />
    </div>
  );
}
