'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight, CheckCircle, Clock, Shield, Star } from 'lucide-react';
import { services } from '@/data/services';
import { getCityBySlug } from '@/data/locations';
import { FAQS_SERVICES, FAQS_LOCATION } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQ } from '@/components/FAQ';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { LeadFormModal } from '@/components/LeadFormModal';
import { PricingSection } from '@/components/PricingSection';
import { NearbyAreasGrid } from '@/components/NearbyAreasGrid';
import { Testimonials } from '@/components/Testimonials';

export default function CityPage({ params }: { params: { city: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cityName = getCityBySlug(params.city);
  if (!cityName) notFound();

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">

        {/* Hero with form */}
        <section className="bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/30 via-gray-900/0 to-transparent pointer-events-none" />
          <div className="container-width py-12 md:py-20 relative z-10">
            <Breadcrumbs items={[{ label: 'Locations', href: '/location/' }, { label: cityName }]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-brand-500/30">
                  <MapPin className="w-4 h-4" /> Elite Platinum Providers Available
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
                  Invisalign in <span className="text-brand-400">{cityName}</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Access {cityName}&apos;s most experienced Invisalign specialists. Choose from our comprehensive treatment options below.
                </p>
              </div>
              <div>
                <HeroLeadForm city={cityName} />
              </div>
            </div>
          </div>
        </section>

        <div className="container-width py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">

              {/* SEO Intro */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                  Find the Best Invisalign Dentist in {cityName}
                </h2>
                <div className="prose prose-gray max-w-none text-gray-600">
                  <p>
                    Looking for Invisalign treatment in {cityName}? Our network connects you directly with Platinum and Diamond tier Invisalign providers — the top 5% of dentists by case volume and clinical outcomes. Whether you need treatment for crowded teeth, gaps, an overbite, underbite, or crossbite, our {cityName} partners have the advanced training and technology to deliver predictable results.
                  </p>
                  <p>
                    Every provider in our {cityName} network uses iTero 3D scanning and ClinCheck digital treatment planning, so you can see your projected results before committing to treatment. Initial consultations are free, with no obligation to proceed.
                  </p>
                </div>
              </section>

              {/* Services Grid */}
              <section className="mb-16">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Available Treatments in {cityName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <Link key={service.id} href={`/services/${service.slug}/`} className="block group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      <div className="h-36 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-display font-bold text-gray-900 group-hover:text-brand-600 mb-1.5">{service.title} in {cityName}</h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{service.description}</p>
                        <span className="text-brand-600 font-medium text-sm flex items-center">Get free quotes <ArrowRight className="w-4 h-4 ml-1" /></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Pricing */}
              <PricingSection cityName={cityName} />

              {/* Why Choose */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">Why Choose Our {cityName} Invisalign Network?</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: <Star className="w-5 h-5" />, title: '4.95 Average Rating', desc: `Our ${cityName} providers maintain exceptional patient satisfaction scores across thousands of verified reviews.` },
                    { icon: <Shield className="w-5 h-5" />, title: 'Platinum & Diamond Only', desc: `We only list the highest-tier providers in ${cityName} — dentists who complete 50+ Invisalign cases per year.` },
                    { icon: <Clock className="w-5 h-5" />, title: 'Same-Week Consultations', desc: `Most ${cityName} partners offer free consultation slots within 7 days, including evenings and weekends.` },
                    { icon: <CheckCircle className="w-5 h-5" />, title: 'Free 3D Scan Included', desc: `Every initial consultation includes a complimentary iTero 3D scan worth £150–£300 at partnered ${cityName} clinics.` },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-brand-100 p-2 rounded-lg text-brand-600 flex-shrink-0 h-fit">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Nearby Areas */}
              <NearbyAreasGrid cityName={cityName} />

              {/* FAQs */}
              <div className="mb-12"><FAQ faqs={[...FAQS_LOCATION, ...FAQS_SERVICES]} title={`Invisalign in ${cityName} — FAQs`} /></div>

              {/* Reviews */}
              <section className="mb-16">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Patient Reviews</h2>
                <Testimonials limit={3} />
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Get Matched in {cityName}</h3>
                  <p className="text-gray-600 text-sm mb-6">Free, no-obligation match with Platinum providers in {cityName}.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full btn-primary text-center">Find a Provider</button>
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                    {[
                      { icon: <Clock className="w-4 h-4 text-brand-500" />, text: "Consultations available this week" },
                      { icon: <Shield className="w-4 h-4 text-brand-500" />, text: "Platinum & Diamond providers only" },
                      { icon: <Star className="w-4 h-4 text-brand-500" />, text: "4.95 average rating" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="bg-brand-100 p-1.5 rounded-full">{item.icon}</div>
                        <span className="text-sm font-medium text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-brand-900 text-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-display font-bold mb-3">From £50/month</h3>
                  <p className="text-brand-100 text-sm mb-4">0% finance available at most {cityName} clinics. Spread the cost over 12–60 months.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full bg-white text-brand-900 text-center font-bold py-3 px-6 rounded-xl hover:bg-brand-50 transition-colors text-sm">Check Eligibility</button>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom CTA */}
          <div className="bg-brand-50 rounded-2xl p-8 md:p-12 text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-900 mb-4">Live in {cityName}?</h2>
            <p className="text-brand-700 mb-8 max-w-2xl mx-auto">Get matched with Platinum Invisalign providers in the {cityName} area. Free consultations, no obligation.</p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary text-lg !px-8 !py-4">Find Local Providers</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
