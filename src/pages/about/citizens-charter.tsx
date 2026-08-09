import { Layers, Clock, ShieldCheck, Scale, FileText } from 'lucide-react';
import { PageHeader } from '@/components/layout';

export default function CitizensCharterPage() {
  return (
    <div className='animate-in fade-in mx-auto max-w-4xl space-y-12 pb-24 duration-500 mt-8 px-4'>
      <PageHeader
        variant='hero'
        title="About ARTA & The Citizen's Charter"
        description='Understanding your rights to efficient government service delivery.'
        autoBreadcrumbs={true}
      />

      <div className='space-y-8'>
        {/* Intro */}
        <section className='bg-kapwa-bg-surface-raised border-kapwa-border-weak rounded-3xl border p-8 shadow-sm md:p-10'>
          <h2 className='text-kapwa-text-strong mb-4 text-2xl font-bold'>
            What is the Anti-Red Tape Act (ARTA)?
          </h2>
          <p className='text-kapwa-text-support leading-relaxed mb-4'>
            Republic Act No. 11032, also known as the{' '}
            <strong>
              Ease of Doing Business and Efficient Government Service Delivery
              Act of 2018
            </strong>
            , is an act that aims to streamline the current systems and
            procedures of government services. The Anti-Red Tape Authority
            (ARTA) is the government agency mandated to administer and implement
            this law.
          </p>
          <p className='text-kapwa-text-support leading-relaxed'>
            Its core purpose is to promote integrity, accountability, and proper
            management of public affairs and public property, and to establish
            effective practices aimed at the prevention of graft and corruption
            in government.
          </p>
        </section>

        {/* The Citizen's Charter */}
        <section className='space-y-6'>
          <div className='flex items-center gap-3'>
            <div className='bg-kapwa-bg-brand-weak text-kapwa-text-brand rounded-lg p-2'>
              <FileText className='h-6 w-6' />
            </div>
            <h2 className='text-kapwa-text-strong text-2xl font-bold'>
              The Citizen&rsquo;s Charter
            </h2>
          </div>
          <p className='text-kapwa-text-support leading-relaxed'>
            The Citizen’s Charter is an official document, a pledge, that
            communicates, in simple terms, the service standards or pledges of
            an agency. It details exactly what you need to provide, step-by-step
            procedures, maximum processing times, and fees required to avail of
            a government service.
          </p>
          <p className='text-kapwa-text-support leading-relaxed'>
            By publishing our Citizen&rsquo;s Charter in this digital format, we
            aim to empower you with the exact knowledge of your rights and
            expectations when transacting with the local government.
          </p>
        </section>

        {/* Classifications Grid */}
        <section className='space-y-6 pt-4'>
          <div className='flex items-center gap-3'>
            <div className='bg-kapwa-bg-brand-weak text-kapwa-text-brand rounded-lg p-2'>
              <Layers className='h-6 w-6' />
            </div>
            <h2 className='text-kapwa-text-strong text-2xl font-bold'>
              Service Classifications & Time Guarantees
            </h2>
          </div>
          <p className='text-kapwa-text-support leading-relaxed mb-6'>
            Under ARTA, all government transactions are strictly categorized
            into three classifications based on their complexity. The law
            dictates a maximum processing time for each classification:
          </p>

          <div className='grid gap-6 md:grid-cols-3'>
            <div className='border-kapwa-border-weak bg-kapwa-bg-surface hover:border-kapwa-border-brand group rounded-2xl border p-6 transition-all shadow-sm'>
              <div className='bg-kapwa-bg-surface-raised mb-4 inline-flex rounded-xl p-3'>
                <Clock className='text-kapwa-text-brand h-6 w-6' />
              </div>
              <h3 className='text-kapwa-text-strong mb-2 text-lg font-bold'>
                Simple
              </h3>
              <p className='text-kapwa-text-brand mb-3 font-bold'>Max 3 Days</p>
              <p className='text-kapwa-text-support text-sm leading-relaxed'>
                Applications or requests submitted by applicants or requesting
                parties of a government office or agency which only require
                ministerial actions on the part of the public officer or
                employee, or that which present only inconsequential issues for
                the resolution by an officer or employee of said government
                office.
              </p>
            </div>

            <div className='border-kapwa-border-weak bg-kapwa-bg-surface hover:border-kapwa-border-brand group rounded-2xl border p-6 transition-all shadow-sm'>
              <div className='bg-kapwa-bg-surface-raised mb-4 inline-flex rounded-xl p-3'>
                <Scale className='text-kapwa-text-brand h-6 w-6' />
              </div>
              <h3 className='text-kapwa-text-strong mb-2 text-lg font-bold'>
                Complex
              </h3>
              <p className='text-kapwa-text-brand mb-3 font-bold'>Max 7 Days</p>
              <p className='text-kapwa-text-support text-sm leading-relaxed'>
                Requests or applications submitted by applicants or requesting
                parties of a government office which necessitate the use of
                discretion in the resolution of complicated issues by an officer
                or employee of said government office, such as transactions to
                be evaluated by a superior officer.
              </p>
            </div>

            <div className='border-kapwa-border-weak bg-kapwa-bg-surface hover:border-kapwa-border-brand group rounded-2xl border p-6 transition-all shadow-sm'>
              <div className='bg-kapwa-bg-surface-raised mb-4 inline-flex rounded-xl p-3'>
                <ShieldCheck className='text-kapwa-text-brand h-6 w-6' />
              </div>
              <h3 className='text-kapwa-text-strong mb-2 text-lg font-bold'>
                Highly Technical
              </h3>
              <p className='text-kapwa-text-brand mb-3 font-bold'>
                Max 20 Days
              </p>
              <p className='text-kapwa-text-support text-sm leading-relaxed'>
                Transactions which require the use of technical knowledge,
                specialized skills and/or training in the creation of computer
                programs, evaluation of technical documents, or any other
                transaction requiring specialized skills.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
