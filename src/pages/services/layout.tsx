import { useEffect, useState } from 'react';

import { Outlet, useLocation, useSearchParams } from 'react-router-dom';

import { useQueryState } from 'nuqs';

import { PageHeader } from '@/components/layout';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import SearchInput from '@/components/ui/SearchInput';

import ServicesSidebar from './components/ServicesSidebar';

import type { TransactionTypeFilter } from '@/types/servicesTypes';

// Additional filter types
export type ServiceSource = 'citizens-charter' | 'community' | 'all';
export type ClassificationFilter = 'Simple' | 'Complex' | 'Highly Technical' | 'all';

export interface ServicesOutletContext {
  searchQuery: string;
  selectedCategorySlug: string;
  selectedOfficeDivision: string;
  selectedSource: ServiceSource;
  selectedClassification: ClassificationFilter;
  selectedTransactionType: TransactionTypeFilter;
  setOfficeDivision: (division: string) => void;
  setSource: (source: ServiceSource) => void;
  setClassification: (classification: ClassificationFilter) => void;
  setTransactionType: (transactionType: TransactionTypeFilter) => void;
}

export default function ServicesLayout() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isIndexPage =
    location.pathname === '/services' || location.pathname === '/services/';

  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategorySlug, setSelectedCategorySlug] =
    useState(initialCategory);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategorySlug(slug);
    setSearchParams({ category: slug });
  };

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categoryFromUrl !== selectedCategorySlug) {
      setSelectedCategorySlug(categoryFromUrl);
    }
  }, [searchParams, selectedCategorySlug]);

  const [searchQuery, setSearchQuery] = useQueryState('search', {
    defaultValue: '',
  });

  // New filter states
  const [selectedOfficeDivision, setSelectedOfficeDivision] = useState('all');
  const [selectedSource, setSelectedSource] = useState<ServiceSource>('all');
  const [selectedClassification, setSelectedClassification] =
    useState<ClassificationFilter>('all');
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionTypeFilter>('G2C');

  return (
    <SidebarLayout
      collapsible={true}
      defaultCollapsed={!isIndexPage}
      // Unified header using PageHeader component
      headerNode={
        isIndexPage ? (
          <PageHeader
            variant='hero'
            title='Local Government Services'
            description='Explore official municipal services from the Citizens Charter and community contributions. Choose a category to filter or search below.'
            actions={
              <SearchInput
                placeholder='Search for services (e.g., Business Permit)...'
                value={searchQuery}
                onChangeValue={setSearchQuery}
                size='md'
              />
            }
          />
        ) : (
          <PageHeader
            variant='compact'
            title='Service Directory'
            description='Browse requirements and procedures.'
            autoBreadcrumbs={true}
          />
        )
      }
      sidebar={
        <ServicesSidebar
          selectedCategorySlug={selectedCategorySlug}
          handleCategoryChange={handleCategoryChange}
        />
      }
    >
      <Outlet
        context={{
          searchQuery,
          selectedCategorySlug,
          selectedOfficeDivision,
          selectedSource,
          selectedClassification,
          selectedTransactionType,
          setOfficeDivision: setSelectedOfficeDivision,
          setSource: setSelectedSource,
          setClassification: setSelectedClassification,
          setTransactionType: setSelectedTransactionType,
        }}
      />
    </SidebarLayout>
  );
}
