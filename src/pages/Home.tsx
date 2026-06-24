import { FC } from 'react';

// import InfoWidgets from '../components/home/InfoWidgets';
// import PromotionBanner from '../components/home/PromotionBanner';
// import JoinUsBanner from '../components/home/JoinUsBanner';
import EventsSection from '@/components/home/EventsSection';
import FacebookSection from '@/components/home/FacebookSection';
import GovernmentSection from '@/components/home/GovernmentSection';
import Hero from '@/components/home/Hero';
// import NewsSection from '@/components/home/NewsSection';
// import JoinUsStrip from '../components/home/JoinUsStrip';
import ServicesSection from '@/components/home/ServicesSection';
import TimelineSection from '@/components/home/TimelineSection';
import TourismHighlights from '@/components/home/TourismHighlights';
import WeatherMapSection from '@/components/home/WeatherMapSection';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const Home: FC = () => {
  return (
    <main className='grow'>
      {/* Documented animation pattern: animate-in fade-in */}
      <div className='animate-in fade-in duration-700'>
        <ErrorBoundary name='Hero'>
          <Hero />
        </ErrorBoundary>

        {/* Using space-y-16 for consistent section spacing per design system */}
        <div className='space-y-16 py-12'>
          <ErrorBoundary name='Services'>
            <ServicesSection />
          </ErrorBoundary>

          <ErrorBoundary name='Tourism'>
            <TourismHighlights />
          </ErrorBoundary>

          <ErrorBoundary name='WeatherMap'>
            <WeatherMapSection />
          </ErrorBoundary>

          {/* <NewsSection /> */}

          <ErrorBoundary name='Government'>
            <GovernmentSection />
          </ErrorBoundary>
        </div>

        {/*
          Community sections, ordered to serve the civic-transparency mission:
          1. Events & Festivals — timely, actionable civic information (advisories,
             anniversaries, the city calendar) that residents act on first.
          2. On Facebook (Stay Connected) — the official channels through which
             the city communicates day to day; keeps residents informed.
          3. City History (Timeline) — heritage context that closes the page.
          These are full-bleed (each owns its background + padding), so they sit
          outside the spaced container above.
        */}
        <ErrorBoundary name='Events'>
          <EventsSection />
        </ErrorBoundary>

        <ErrorBoundary name='Facebook'>
          <FacebookSection />
        </ErrorBoundary>

        <ErrorBoundary name='Timeline'>
          <TimelineSection />
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default Home;
