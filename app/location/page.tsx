'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Search } from 'lucide-react';
import { LOCATIONS, toSlug } from '@/data/locations';
import { FAQS_LOCATION } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { FAQ } from '@/components/FAQ';
import { LeadFormModal } from '@/components/LeadFormModal';
import { FloatingPathsBackground } from '@/components/FloatingPathsBackground';

export default function LocationIndexPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = useMemo(() => {
    if (!searchQuery) return LOCATIONS;
    const result: Record<string, string[]> = {};
    Object.entries(LOCATIONS).forEach(([region, cities]) => {
      const filtered = cities.filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()));
      if (filtered.length > 0) result[region] = filtered;
    });
    return result;
  }, [searchQuery]);

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">
        <Hero
          title="Find Your Local Platinum Provider"
          subtitle="Access the UK's most exclusive network of clear aligner experts. Vetted for quality, verified for results."
          image="/images/location-crowns-fillings.jpeg"
          onOpenModal={() => setIsModalOpen(true)}
        />

        <FloatingPathsBackground position={-1} className="bg-[#f4efeb] py-20 md:py-28">
          <div className="container-width">
            {/* Search */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your city or town..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-slate-200 bg-white/90 py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm backdrop-blur transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Regions + City Grids */}
            <div className="space-y-12">
              {Object.entries(filteredLocations).map(([region, cities]) => (
                <div key={region}>
                  <h2 className="mb-6 text-3xl font-medium text-slate-800">{region}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {cities.map(city => (
                      <Link
                        key={city}
                        href={`/location/${toSlug(city)}/`}
                        className="group block border border-slate-200 bg-white/88 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-lg hover:shadow-slate-950/5"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-cyan-700 flex-shrink-0" />
                          <span className="font-medium text-slate-700 group-hover:text-cyan-800 text-sm">{city}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FloatingPathsBackground>

        <section className="section-padding bg-white">
          <div className="container-width max-w-3xl">
            <FAQ faqs={FAQS_LOCATION} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
