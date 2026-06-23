import { Building2, ClipboardList, Clock, ExternalLink } from 'lucide-react';
import { DetailSection } from '@/components/layout/PageLayouts';
import { ClientStep } from '@/types/citizens-charter';

interface ProcessTimelineProps {
  steps: ClientStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <DetailSection title='How to Apply' icon={ClipboardList}>
      <div className='space-y-6' data-testid='process-timeline'>
        {steps.map((step, idx) => (
          <div key={idx} className='group'>
            <div className='flex gap-4'>
              {/* Step number */}
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-kapwa-border-brand bg-kapwa-bg-surface text-sm font-bold text-kapwa-text-brand'>
                {idx + 1}
              </div>

              <div className='flex-1 space-y-3'>
                {/* Client action */}
                <div className='flex items-start justify-between gap-4'>
                  <p className='text-kapwa-text-support flex-1 text-sm leading-relaxed'>
                    {step.action}
                  </p>
                  {step.url && (
                    <a
                      href={step.url}
                      target='_blank'
                      rel='noreferrer'
                      className='text-kapwa-text-brand hover:text-kapwa-text-accent-orange flex shrink-0 items-center gap-1 text-xs font-bold transition-colors'
                    >
                      Visit Portal
                      <ExternalLink className='h-3 w-3' />
                    </a>
                  )}
                </div>

                {/* Sub-steps with letter labels */}
                {step.sub_steps && step.sub_steps.length > 0 && (
                  <div className='ml-1 space-y-2'>
                    {step.sub_steps.map((subStep, subIdx) => (
                      <div
                        key={subIdx}
                        className='border-kapwa-border-weak border-l-2 pl-4'
                      >
                        <div className='flex items-start gap-2'>
                          <span className='text-kapwa-text-brand bg-kapwa-bg-brand-weak/20 flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-bold'>
                            {subStep.letter}
                          </span>
                          <p className='text-kapwa-text-support flex-1 text-xs leading-relaxed'>
                            {subStep.action}
                          </p>
                        </div>
                        {subStep.details && subStep.details.length > 0 && (
                          <div className='mt-2 ml-7 space-y-1'>
                            {subStep.details.map((detail, detailIdx) => (
                              <div key={detailIdx} className='flex items-start gap-2'>
                                <span className='text-kapwa-text-disabled text-xs font-medium'>
                                  {['i.', 'ii.', 'iii.', 'iv.', 'v.'][detailIdx] ?? `${detailIdx + 1}.`}
                                </span>
                                <p className='text-kapwa-text-support text-xs'>{detail}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Agency action — visually distinct from the client step */}
                {step.agencyAction && (
                  <div className='border-kapwa-border-weak bg-kapwa-bg-surface-raised rounded-xl border p-3'>
                    <div className='mb-1.5 flex items-center gap-1.5'>
                      <Building2 className='text-kapwa-text-disabled h-3 w-3' />
                      <span className='text-kapwa-text-disabled text-[10px] font-bold tracking-widest uppercase'>
                        Agency Action
                      </span>
                    </div>
                    <p className='text-kapwa-text-support text-xs leading-relaxed'>
                      {step.agencyAction}
                    </p>
                    {(step.personResponsible || step.processing_time || step.fee) && (
                      <div className='border-kapwa-border-weak mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-2'>
                        {step.personResponsible && (
                          <span className='text-kapwa-text-disabled text-[10px] font-medium'>
                            {step.personResponsible}
                          </span>
                        )}
                        {step.processing_time && (
                          <span className='text-kapwa-text-disabled flex items-center gap-1 text-[10px] font-medium'>
                            <Clock className='h-2.5 w-2.5' />
                            {step.processing_time}
                          </span>
                        )}
                        {step.fee && (
                          <span className='text-kapwa-text-brand text-[10px] font-bold'>
                            {step.fee}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Processing time when there's no agency action box */}
                {!step.agencyAction && step.processing_time && (
                  <div className='flex items-center gap-1.5'>
                    <Clock className='text-kapwa-text-disabled h-3 w-3' />
                    <span className='text-kapwa-text-disabled text-[10px] font-bold tracking-widest uppercase'>
                      {step.processing_time}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DetailSection>
  );
}
