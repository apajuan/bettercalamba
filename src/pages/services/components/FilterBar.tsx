import { useState } from 'react';
import {
  Building2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Layers,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { getAllOfficeDivisions } from '@/lib/services';
import type { TransactionTypeFilter } from '@/types/servicesTypes';

// Types
export type ServiceSource = 'citizens-charter' | 'community' | 'all';
export type ClassificationFilter = 'Simple' | 'Complex' | 'Highly Technical' | 'all';

interface FilterBarProps {
  selectedOfficeDivision: string;
  selectedSource: ServiceSource;
  selectedClassification: ClassificationFilter;
  selectedTransactionType: TransactionTypeFilter;
  onOfficeDivisionChange: (division: string) => void;
  onSourceChange: (source: ServiceSource) => void;
  onClassificationChange: (classification: ClassificationFilter) => void;
  onTransactionTypeChange: (transactionType: TransactionTypeFilter) => void;
}

export default function FilterBar({
  selectedOfficeDivision,
  selectedSource,
  selectedClassification,
  selectedTransactionType,
  onOfficeDivisionChange,
  onSourceChange,
  onClassificationChange,
  onTransactionTypeChange,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const officeDivisions = getAllOfficeDivisions();

  const hasActiveFilters =
    selectedOfficeDivision !== 'all' ||
    selectedSource !== 'all' ||
    selectedClassification !== 'all' ||
    selectedTransactionType !== 'all';

  return (
    <div
      className='border-kapwa-border-weak bg-kapwa-bg-surface rounded-2xl border shadow-sm'
      data-testid='filter-bar'
    >
      {/* Filter Bar Header */}
      <button
        type='button'
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-kapwa-bg-surface-raised sm:px-5'
        data-testid='filter-bar-toggle'
      >
        <div className='flex items-center gap-3'>
          <span className='text-kapwa-text-strong text-sm font-bold'>
            Filters
          </span>
          {hasActiveFilters && (
            <Badge variant='primary' className='text-xs'>
              Active
            </Badge>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className='text-kapwa-text-disabled h-4 w-4' />
        ) : (
          <ChevronDown className='text-kapwa-text-disabled h-4 w-4' />
        )}
      </button>

      {/* Expandable Filter Content */}
      {isExpanded && (
        <div className='border-kapwa-border-weak border-t px-4 py-4 sm:px-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
            {/* Data Source Filter */}
            <div className='flex-1'>
              <div className='mb-2 flex items-center gap-2'>
                <CheckCircle2 className='text-kapwa-text-disabled h-3.5 w-3.5' />
                <h4 className='text-kapwa-text-disabled text-[10px] font-bold uppercase tracking-wider'>
                  Source
                </h4>
              </div>
              <div className='flex flex-wrap gap-1.5'>
                <FilterPill
                  label='All'
                  selected={selectedSource === 'all'}
                  onClick={() => onSourceChange('all')}
                  data-testid='filter-source-all'
                />
                <FilterPill
                  label='Official'
                  selected={selectedSource === 'citizens-charter'}
                  onClick={() => onSourceChange('citizens-charter')}
                  data-testid='filter-source-official'
                />
                <FilterPill
                  label='Community'
                  selected={selectedSource === 'community'}
                  onClick={() => onSourceChange('community')}
                  data-testid='filter-source-community'
                />
              </div>
            </div>

            {/* Classification Filter */}
            <div className='flex-1'>
              <div className='mb-2 flex items-center gap-2'>
                <Layers className='text-kapwa-text-disabled h-3.5 w-3.5' />
                <div className='group relative flex items-center gap-1.5'>
                  <h4 className='text-kapwa-text-disabled text-[10px] font-bold uppercase tracking-wider'>
                    Type
                  </h4>
                  <div className='text-kapwa-text-disabled hover:text-kapwa-text-brand flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-current text-[9px] font-bold transition-colors'>
                    i
                  </div>
                  {/* Option B Popover */}
                  <div className='bg-kapwa-bg-surface-raised border-kapwa-border-weak pointer-events-none absolute top-full left-0 z-50 mt-2 w-64 translate-y-2 opacity-0 shadow-lg transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 rounded-xl border p-4'>
                    <h5 className='text-kapwa-text-strong mb-2 text-[10px] font-bold uppercase tracking-widest'>ARTA Classifications</h5>
                    <ul className='text-kapwa-text-support space-y-2 text-xs'>
                      <li><span className='text-kapwa-text-brand font-bold'>Simple:</span> Max 3 days</li>
                      <li><span className='text-kapwa-text-brand font-bold'>Complex:</span> Max 7 days</li>
                      <li><span className='text-kapwa-text-brand font-bold'>Highly Technical:</span> Max 20 days</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap gap-1.5'>
                <FilterPill
                  label='All'
                  selected={selectedClassification === 'all'}
                  onClick={() => onClassificationChange('all')}
                  data-testid='filter-classification-all'
                />
                <FilterPill
                  label='Simple'
                  title='Maximum of 3 days processing time'
                  selected={selectedClassification === 'Simple'}
                  onClick={() => onClassificationChange('Simple')}
                  data-testid='filter-classification-simple'
                />
                <FilterPill
                  label='Complex'
                  title='Maximum of 7 days processing time'
                  selected={selectedClassification === 'Complex'}
                  onClick={() => onClassificationChange('Complex')}
                  data-testid='filter-classification-complex'
                />
                <FilterPill
                  label='Highly Technical'
                  title='Maximum of 20 days processing time'
                  selected={selectedClassification === 'Highly Technical'}
                  onClick={() => onClassificationChange('Highly Technical')}
                  data-testid='filter-classification-highly'
                />
              </div>
            </div>

            {/* Target Client Filter */}
            <div className='flex-1'>
              <div className='mb-2 flex items-center gap-2'>
                <Layers className='text-kapwa-text-disabled h-3.5 w-3.5' />
                <h4 className='text-kapwa-text-disabled text-[10px] font-bold uppercase tracking-wider'>
                  Target Client
                </h4>
              </div>
              <div className='flex flex-wrap gap-1.5'>
                <FilterPill
                  label='All'
                  selected={selectedTransactionType === 'all'}
                  onClick={() => onTransactionTypeChange('all')}
                  data-testid='filter-transaction-all'
                />
                <FilterPill
                  label='Citizen (G2C)'
                  selected={selectedTransactionType === 'G2C'}
                  onClick={() => onTransactionTypeChange('G2C')}
                  data-testid='filter-transaction-g2c'
                />
                <FilterPill
                  label='Business (G2B)'
                  selected={selectedTransactionType === 'G2B'}
                  onClick={() => onTransactionTypeChange('G2B')}
                  data-testid='filter-transaction-g2b'
                />
                <FilterPill
                  label="Gov't (G2G)"
                  selected={selectedTransactionType === 'G2G'}
                  onClick={() => onTransactionTypeChange('G2G')}
                  data-testid='filter-transaction-g2g'
                />
              </div>
            </div>

            {/* Office Division Filter */}
            <div className='flex-1'>
              <div className='mb-2 flex items-center gap-2'>
                <Building2 className='text-kapwa-text-disabled h-3.5 w-3.5' />
                <h4 className='text-kapwa-text-disabled text-[10px] font-bold uppercase tracking-wider'>
                  Office
                </h4>
              </div>
              <select
                value={selectedOfficeDivision}
                onChange={e => onOfficeDivisionChange(e.target.value)}
                className='border-kapwa-border-weak bg-kapwa-bg-surface-raised text-kapwa-text-strong w-full rounded-lg border px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-kapwa-border-brand'
                data-testid='filter-office-select'
              >
                <option value='all'>All Offices</option>
                {officeDivisions.map(division => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear All Button */}
            {hasActiveFilters && (
              <div className='flex items-end'>
                <button
                  type='button'
                  onClick={() => {
                    onOfficeDivisionChange('all');
                    onSourceChange('all');
                    onClassificationChange('all');
                    onTransactionTypeChange('all');
                  }}
                  className='text-kapwa-text-brand hover:text-kapwa-text-accent-orange text-xs font-bold transition-colors'
                  data-testid='filter-clear-all'
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Filter Pill Component
interface FilterPillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  'data-testid'?: string;
  title?: string;
}

function FilterPill({
  label,
  selected,
  onClick,
  'data-testid': testId,
  title,
}: FilterPillProps) {
  return (
    <button
      type='button'
      title={title}
      onClick={onClick}
      data-testid={testId}
      className={`transition-all ${
        selected
          ? 'border-kapwa-border-brand bg-kapwa-bg-brand-weak text-kapwa-text-brand'
          : 'border-kapwa-border-weak bg-kapwa-bg-surface text-kapwa-text-support hover:border-kapwa-border-brand hover:bg-kapwa-bg-surface-raised'
      } rounded-md border px-3 py-1 text-xs font-bold`}
    >
      {label}
    </button>
  );
}
