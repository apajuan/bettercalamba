import { Building2, CheckCircle2, FileText, Layers } from 'lucide-react';

import { ScrollArea } from '@/components/ui/ScrollArea';
import { getAllOfficeDivisions } from '@/lib/services';

// Types
export type ServiceSource = 'citizens-charter' | 'community' | 'all';
export type ClassificationFilter =
  | 'Simple'
  | 'Complex'
  | 'Highly Technical'
  | 'all';

interface ServiceFiltersProps {
  selectedOfficeDivision: string;
  selectedSource: ServiceSource;
  selectedClassification: ClassificationFilter;
  onOfficeDivisionChange: (division: string) => void;
  onSourceChange: (source: ServiceSource) => void;
  onClassificationChange: (classification: ClassificationFilter) => void;
}

export default function ServiceFilters({
  selectedOfficeDivision,
  selectedSource,
  selectedClassification,
  onOfficeDivisionChange,
  onSourceChange,
  onClassificationChange,
}: ServiceFiltersProps) {
  const officeDivisions = getAllOfficeDivisions();

  return (
    <div className='border-kapwa-border-weak bg-kapwa-bg-surface space-y-5 rounded-2xl border p-5 shadow-sm'>
      {/* Source Filter */}
      <div>
        <div className='mb-3 flex items-center gap-2'>
          <CheckCircle2 className='text-kapwa-text-disabled h-4 w-4' />
          <h4 className='text-kapwa-text-strong text-xs font-bold uppercase tracking-wider'>
            Data Source
          </h4>
        </div>
        <div className='flex flex-wrap gap-2'>
          <SourceBadge
            source='all'
            selected={selectedSource === 'all'}
            onClick={() => onSourceChange('all')}
          />
          <SourceBadge
            source='citizens-charter'
            selected={selectedSource === 'citizens-charter'}
            onClick={() => onSourceChange('citizens-charter')}
          />
          <SourceBadge
            source='community'
            selected={selectedSource === 'community'}
            onClick={() => onSourceChange('community')}
          />
        </div>
      </div>

      {/* Classification Filter (only for Citizens Charter services) */}
      <div>
        <div className='mb-3 flex items-center gap-2'>
          <Layers className='text-kapwa-text-disabled h-4 w-4' />
          <div className='group relative flex items-center gap-1.5'>
            <h4 className='text-kapwa-text-strong text-xs font-bold uppercase tracking-wider'>
              Classification
            </h4>
            <div className='text-kapwa-text-disabled hover:text-kapwa-text-brand flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-current text-[9px] font-bold transition-colors'>
              i
            </div>
            {/* Option B Popover */}
            <div className='bg-kapwa-bg-surface-raised border-kapwa-border-weak pointer-events-none absolute top-full left-0 z-50 mt-2 w-64 translate-y-2 opacity-0 shadow-lg transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 rounded-xl border p-4'>
              <h5 className='text-kapwa-text-strong mb-2 text-[10px] font-bold uppercase tracking-widest'>
                ARTA Classifications
              </h5>
              <ul className='text-kapwa-text-support space-y-2 text-xs'>
                <li>
                  <span className='text-kapwa-text-brand font-bold'>
                    Simple:
                  </span>{' '}
                  Max 3 days
                </li>
                <li>
                  <span className='text-kapwa-text-brand font-bold'>
                    Complex:
                  </span>{' '}
                  Max 7 days
                </li>
                <li>
                  <span className='text-kapwa-text-brand font-bold'>
                    Highly Technical:
                  </span>{' '}
                  Max 20 days
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap gap-2'>
          <ClassificationBadge
            classification='all'
            selected={selectedClassification === 'all'}
            onClick={() => onClassificationChange('all')}
          />
          <ClassificationBadge
            classification='Simple'
            title='Maximum of 3 days processing time'
            selected={selectedClassification === 'Simple'}
            onClick={() => onClassificationChange('Simple')}
          />
          <ClassificationBadge
            classification='Complex'
            title='Maximum of 7 days processing time'
            selected={selectedClassification === 'Complex'}
            onClick={() => onClassificationChange('Complex')}
          />
          <ClassificationBadge
            classification='Highly Technical'
            title='Maximum of 20 days processing time'
            selected={selectedClassification === 'Highly Technical'}
            onClick={() => onClassificationChange('Highly Technical')}
          />
        </div>
      </div>

      {/* Office Division Filter */}
      <div>
        <div className='mb-3 flex items-center gap-2'>
          <Building2 className='text-kapwa-text-disabled h-4 w-4' />
          <h4 className='text-kapwa-text-strong text-xs font-bold uppercase tracking-wider'>
            Office Division
          </h4>
        </div>
        <ScrollArea className='h-48'>
          <div className='space-y-1 pr-2'>
            <OfficeDivisionItem
              division='All Offices'
              value='all'
              selected={selectedOfficeDivision === 'all'}
              onClick={() => onOfficeDivisionChange('all')}
            />
            {officeDivisions.map(division => (
              <OfficeDivisionItem
                key={division}
                division={division}
                value={division}
                selected={selectedOfficeDivision === division}
                onClick={() => onOfficeDivisionChange(division)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// Source Badge Component
interface SourceBadgeProps {
  source: ServiceSource;
  selected: boolean;
  onClick: () => void;
}

function SourceBadge({ source, selected, onClick }: SourceBadgeProps) {
  const labels: Record<Exclude<ServiceSource, 'all'>, string> = {
    'citizens-charter': 'Official',
    community: 'Community',
  };

  const isSelected = source === 'all';

  return (
    <button
      type='button'
      onClick={onClick}
      className={`transition-all ${
        selected
          ? 'border-kapwa-border-brand bg-kapwa-bg-brand-weak text-kapwa-text-brand'
          : 'border-kapwa-border-weak bg-kapwa-bg-surface text-kapwa-text-support hover:border-kapwa-border-weak hover:bg-kapwa-bg-surface-raised'
      } inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-bold`}
    >
      {isSelected ? (
        <>
          <CheckCircle2 className='h-3.5 w-3.5' />
          All Sources
        </>
      ) : (
        <>
          <FileText className='h-3.5 w-3.5' />
          {labels[source]}
        </>
      )}
    </button>
  );
}

// Classification Badge Component
function ClassificationBadge({
  classification,
  selected,
  onClick,
  title,
}: {
  classification: ClassificationFilter;
  selected: boolean;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      title={title}
      className={`transition-all ${
        selected
          ? 'border-kapwa-border-brand bg-kapwa-bg-brand-weak text-kapwa-text-brand'
          : 'border-kapwa-border-weak bg-kapwa-bg-surface text-kapwa-text-support hover:border-kapwa-border-weak hover:bg-kapwa-bg-surface-raised'
      } inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-bold`}
    >
      {classification === 'all' ? (
        <>All Types</>
      ) : (
        <>
          <Layers className='h-3.5 w-3.5' />
          {classification}
        </>
      )}
    </button>
  );
}

// Office Division Item Component
interface OfficeDivisionItemProps {
  division: string;
  value: string;
  selected: boolean;
  onClick: () => void;
}

function OfficeDivisionItem({
  division,
  selected,
  onClick,
}: OfficeDivisionItemProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`w-full text-left transition-all ${
        selected
          ? 'bg-kapwa-bg-brand-weak text-kapwa-text-brand'
          : 'text-kapwa-text-support hover:bg-kapwa-bg-surface-raised'
      } rounded-lg px-3 py-2 text-xs font-medium`}
    >
      {division}
    </button>
  );
}
