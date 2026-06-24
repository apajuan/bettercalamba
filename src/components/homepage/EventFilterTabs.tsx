import { KeyboardEvent, useRef } from 'react';

import clsx from 'clsx';

export interface FilterTab<T extends string> {
  key: T;
  label: string;
}

interface EventFilterTabsProps<T extends string> {
  tabs: FilterTab<T>[];
  value: T;
  onChange: (key: T) => void;
  /**
   * `separate` — free-standing pills (events filter).
   * `segmented` — pills inside one bordered container (Facebook Official/Community).
   */
  variant?: 'separate' | 'segmented';
  /** Accessible label for the tablist. */
  ariaLabel: string;
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calamba-blue focus-visible:ring-offset-2';

/**
 * Pill-style filter tabs with full keyboard support (arrow keys, Home/End)
 * and proper `tablist`/`tab` ARIA semantics with roving tabindex. Generic so
 * it serves both the events filter and the Facebook page-type toggle.
 */
function EventFilterTabs<T extends string>({
  tabs,
  value,
  onChange,
  variant = 'separate',
  ariaLabel,
}: EventFilterTabsProps<T>) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let next = index;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    onChange(tabs[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role='tablist'
      aria-label={ariaLabel}
      className={clsx(
        variant === 'segmented'
          ? 'inline-flex flex-none gap-1 rounded-full border border-[#d8dbdf] bg-white p-1'
          : 'flex flex-wrap gap-[9px]'
      )}
    >
      {tabs.map((tab, index) => {
        const active = tab.key === value;
        return (
          <button
            key={tab.key}
            ref={element => {
              tabRefs.current[index] = element;
            }}
            type='button'
            role='tab'
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.key)}
            onKeyDown={event => handleKeyDown(event, index)}
            className={clsx(
              'cursor-pointer rounded-full px-[15px] py-[7px] text-[13px] transition-colors',
              focusRing,
              variant === 'segmented'
                ? active
                  ? 'bg-calamba-blue font-bold text-[#f5f4f1]'
                  : 'bg-transparent font-semibold text-[#596570] hover:text-calamba-blue'
                : active
                  ? 'border border-calamba-blue bg-calamba-blue font-bold text-[#f5f4f1]'
                  : 'border border-[#d8dbdf] bg-white font-semibold text-[#596570] hover:border-[#acc8ef] hover:text-calamba-blue'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default EventFilterTabs;
