'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { LeadFormModal } from '@/components/LeadFormModal';
import { FloatingPathsBackground } from '@/components/FloatingPathsBackground';

export default function ServicesIndexPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">
        <Hero
          title="Elite Invisalign Treatments"
          subtitle="Customised clear aligner solutions for every clinical challenge, from complex bite issues to lifestyle-focused adult treatment."
          image="/images/services-candidate-invisalign.jpeg"
          showCta={false}
          showTrust={false}
        />
        <FloatingPathsBackground position={1} className="bg-[#f4efeb] py-20 md:py-28">
          <div className="container-width">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-4xl font-medium text-slate-800 md:text-6xl">Clear Aligner Treatment Paths</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Choose the concern that best matches your smile. Each path connects you with experienced providers who routinely plan these cases.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {services.map(service => (
                <Link key={service.id} href={`/services/${service.slug}/`} className="group flex gap-6 border border-slate-200 bg-white/88 p-6 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-xl hover:shadow-slate-950/8">
                  <div className="h-32 w-32 flex-shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="mb-2 text-2xl font-medium text-slate-800 group-hover:text-cyan-800">{service.title}</h2>
                    <p className="mb-4 flex-grow text-sm leading-6 text-slate-600">{service.description}</p>
                    <span className="flex items-center text-sm font-bold text-slate-600 group-hover:text-cyan-800">
                      View treatment <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FloatingPathsBackground>
      </main>
      <Footer />
    </>
  );
}
