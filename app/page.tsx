'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, MapPin, Shield, Sparkles, Calendar, Globe, Users, CreditCard, Award, Zap } from 'lucide-react';
import { services } from '@/data/services';
import { toSlug } from '@/data/locations';
import { pricingTiers, financeInfo, treatmentIncludes } from '@/data/pricing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { TrustBadges } from '@/components/TrustBadges';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { LeadFormModal } from '@/components/LeadFormModal';
import { FloatingPathsBackground } from '@/components/FloatingPathsBackground';

const topCities = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Bristol', 'Edinburgh', 'Glasgow', 'Cardiff', 'Sheffield', 'Nottingham', 'Newcastle upon Tyne'];

const homepageFaqs = [
  { question: "How much does Invisalign cost in the UK?", answer: "Invisalign prices in the UK typically range from £1,500 for minor cosmetic cases up to £5,500 for complex full treatment. The exact cost depends on which Invisalign product your provider recommends (Express, Lite, or Comprehensive), the severity of your misalignment, and the experience tier of your dentist. Platinum and Diamond providers may charge slightly more than general dentists, but their higher case volume translates to better outcomes and fewer refinement rounds. Most providers in our network offer 0% interest finance starting from £50 per month spread over 12 to 60 months." },
  { question: "How long does Invisalign treatment take?", answer: "Treatment duration depends on the complexity of your case. Invisalign Express handles minor cosmetic corrections such as slight crowding or small gaps in 3 to 6 months using up to 7 aligner sets. Invisalign Lite is designed for moderate cases and typically takes 6 to 12 months with up to 14 aligner sets. Full Invisalign Comprehensive treats complex cases including bite correction and severe crowding in 12 to 18 months with unlimited aligner sets and refinements. Your provider will map out a precise digital timeline using ClinCheck 3D software during your free initial consultation so you know exactly what to expect before you commit." },
  { question: "Is Invisalign as effective as traditional braces?", answer: "For the vast majority of adult orthodontic cases, Invisalign delivers results that are equal to or better than traditional braces. Clinical studies show equivalent outcomes for mild to moderate crowding, spacing, and bite issues. Platinum providers also have access to advanced Invisalign features like Precision Wings for bite correction and SmartForce attachments for complex tooth movements that were previously only achievable with fixed braces. The cases where braces may still be preferable are severe skeletal jaw discrepancies requiring surgical intervention, which account for a small percentage of adult cases." },
  { question: "Does Invisalign hurt?", answer: "Most patients experience mild pressure and tightness when switching to a new set of aligners, typically lasting 2 to 3 days. This is a normal sign that the aligners are actively moving your teeth. The discomfort is consistently rated as significantly less than traditional braces tightening. Invisalign uses patented SmartTrack material that is engineered to apply gentle, constant force rather than the sharp intermittent pressure of wire adjustments. Over-the-counter pain relief is rarely needed but can be used if the pressure feels uncomfortable during the first day of a new tray." },
  { question: "What is a Platinum Invisalign provider and why does it matter?", answer: "Invisalign manufacturer Align Technology ranks dentists and orthodontists into tiers based on how many Invisalign cases they complete each year. Bronze providers complete 10 or more cases, Gold providers complete 20 or more, Platinum providers complete 80 or more, and Diamond providers complete 150 or more per year. Higher-tier providers have substantially more clinical experience, access to advanced Invisalign features, better refinement rates, and statistically superior patient outcomes. Our network exclusively features Platinum and Diamond providers because the difference in quality between a provider who does 10 cases a year and one who does 150 is enormous." },
  { question: "How does your free matching service work?", answer: "We are not a dental clinic. We are a free, independent referral service. You fill in a 60-second form with your location, treatment needs, and contact details. We then search our network of over 350 Platinum and Diamond Invisalign providers across the UK and shortlist the best matches for your specific case. Up to 3 matched providers will contact you directly within 2 hours to arrange a free consultation. Each consultation includes a complimentary iTero 3D scan and personalised treatment plan. There is no cost to use our service and no obligation to proceed with any provider." },
  { question: "Can I eat and drink normally with Invisalign?", answer: "Yes. You remove your aligners every time you eat or drink anything other than water. This means there are zero dietary restrictions, unlike traditional braces where hard foods, sticky sweets, popcorn, and chewy items are off limits for the entire treatment. The recommendation is to wear your aligners for 20 to 22 hours per day, which gives you around 2 to 4 hours for meals and snacking. You should brush your teeth before reinserting your aligners to prevent staining and maintain hygiene." },
  { question: "Can I see what my teeth will look like before I start treatment?", answer: "Yes. Every Invisalign consultation with our providers includes a 3D iTero digital scan of your mouth. Your dentist then uses ClinCheck software to create a complete digital treatment plan showing exactly how each tooth will move, week by week, from your current position to your final result. You can watch an animated preview of your entire smile transformation before you agree to anything. This is one of the biggest advantages of Invisalign over braces, where the final result is largely predicted by your orthodontist rather than visualised in advance." },
  { question: "Is Invisalign available on the NHS?", answer: "Invisalign is not typically available on the NHS. NHS orthodontic treatment is generally limited to children and young people under 18 with severe orthodontic issues, and even then the treatment is usually fixed metal braces rather than clear aligners. Adult Invisalign treatment is almost always private. However, the cost is often more accessible than people expect, especially with 0% finance options. Through our network, full treatment starts from around £3,500 with monthly payments from as low as £50." },
  { question: "How often do I need to visit the dentist during Invisalign treatment?", answer: "Most Invisalign patients visit their provider every 6 to 8 weeks for progress checks. These appointments are typically short, around 15 to 20 minutes, because there are no wires to adjust. Your provider will check that your teeth are tracking correctly, provide your next sets of aligners, and make any adjustments to attachments if needed. This is significantly fewer visits than traditional braces, which usually require monthly appointments for wire tightening." },
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow bg-slate-50">

        <Hero
          title="Find a Top-Rated Invisalign Dentist Near You"
          subtitle="Compare Platinum and Diamond Invisalign providers in your area. Get up to 3 free quotes from the UK's highest-rated clear aligner specialists. Our service is 100% free."
          image="https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?q=80&w=1800&auto=format&fit=crop"
          onOpenModal={() => setIsModalOpen(true)}
        />

        <TrustBadges />

        {/* Expert intro inspired by the oral surgery reference */}
        <FloatingPathsBackground position={1} className="bg-[#f4efeb] py-20 md:py-28">
          <div className="container-width">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/6502308/pexels-photo-6502308.jpeg"
                  alt="Smiling Invisalign patient"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="max-w-xl text-4xl font-medium leading-tight text-slate-800 md:text-6xl">
                  Invisalign care without the guesswork.
                </h2>
                <div className="mt-7 max-w-2xl space-y-4 text-sm leading-7 text-slate-600 md:text-base">
                  <p>
                    We connect you with experienced Platinum and Diamond Invisalign providers, so you can compare trusted clinicians before committing to treatment.
                  </p>
                  <p>
                    Every consultation includes clinical assessment, provider guidance, and a clear quote. You get the reassurance of expert-led care without calling clinic after clinic.
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="mt-8 rounded-full border border-slate-400 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-800 hover:text-white">
                  Meet Your Provider
                </button>
              </div>
            </div>
          </div>
        </FloatingPathsBackground>

        {/* Why Invisalign — short intro, then cards do the heavy lifting */}
        <section className="bg-[#f6fbff] py-20 md:py-28">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-4xl font-medium text-slate-800 md:text-6xl">Why Thousands of UK Adults Are Choosing Invisalign Over Braces</h2>
              <p className="mx-auto max-w-3xl text-lg text-slate-600">
                Demand for adult orthodontics in the UK has increased by over 80% since 2010, with Invisalign accounting for the majority of that growth. Adults are choosing clear aligners because they fit around their existing lifestyle in ways fixed braces cannot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <CheckCircle className="w-6 h-6 text-brand-500" />, title: 'Virtually Invisible', desc: 'Made from patented SmartTrack material that is clear and nearly undetectable. Most people will not notice during conversation, meetings, or photos. The go-to choice for professionals and anyone in a client-facing role.' },
                { icon: <Users className="w-6 h-6 text-brand-500" />, title: 'No Food Restrictions', desc: 'Remove to eat, so nothing is off limits. With braces you cannot eat hard, sticky, or chewy foods for 12 to 24 months. With Invisalign you eat whatever you want and brush before reinserting.' },
                { icon: <Shield className="w-6 h-6 text-brand-500" />, title: 'More Comfortable', desc: 'No brackets cutting your cheeks, no wires poking your gums. SmartTrack applies gentle, calibrated pressure that patients consistently rate as far more comfortable than monthly wire tightening.' },
                { icon: <Sparkles className="w-6 h-6 text-brand-500" />, title: 'Preview Results First', desc: 'ClinCheck 3D shows your full treatment digitally before you start. See exactly how each tooth moves, week by week, and what your final smile looks like. No other system offers this certainty.' },
                { icon: <Calendar className="w-6 h-6 text-brand-500" />, title: 'From Just 3 Months', desc: 'Express handles minor corrections in 3 to 6 months. Lite covers moderate cases in 6 to 12 months. Full Comprehensive averages 12 to 18 months. Many adults are surprised how quickly results become visible.' },
                { icon: <Globe className="w-6 h-6 text-brand-500" />, title: 'Better Oral Hygiene', desc: 'With braces, food traps around brackets causing white spots and cavities. With Invisalign you remove trays to brush and floss normally, significantly reducing decay and gum disease risk during treatment.' },
              ].map((item, i) => (
                <div key={i} className="group flex gap-4 border border-slate-200 bg-white p-6 transition-all hover:bg-slate-50">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#cfe4ee] text-slate-700">{item.icon}</div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-slate-800">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing — table-led, text supports */}
        <section className="bg-[#4f6073] py-20 text-white md:py-28">
          <div className="container-width">
            <h2 className="mb-3 text-4xl font-medium text-white md:text-6xl">How Much Does Invisalign Cost in the UK in 2025?</h2>
            <p className="mb-8 max-w-3xl text-white/78">
              Pricing depends on case complexity, Invisalign product type, and your provider's tier. Below are current costs from Platinum and Diamond providers. London and the South East tend toward the higher end; Midlands, North, Scotland and Wales sit lower.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full overflow-hidden border border-white/20 text-sm">
                <thead>
                  <tr className="bg-white/10 text-left">
                    <th className="px-5 py-3 font-bold text-white">Treatment Type</th>
                    <th className="px-5 py-3 font-bold text-white">Price (GBP)</th>
                    <th className="hidden px-5 py-3 font-bold text-white md:table-cell">Duration</th>
                    <th className="hidden px-5 py-3 font-bold text-white lg:table-cell">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTiers.map((tier, i) => (
                    <tr key={tier.slug} className={i % 2 === 0 ? 'bg-white/[0.04]' : 'bg-white/[0.08]'}>
                      <td className="px-5 py-4 font-bold text-white">{tier.treatment}</td>
                      <td className="px-5 py-4"><span className="font-bold text-cyan-200">£{tier.priceFrom.toLocaleString()} to £{tier.priceTo.toLocaleString()}</span></td>
                      <td className="hidden px-5 py-4 text-slate-200 md:table-cell">{tier.typicalDuration}</td>
                      <td className="hidden px-5 py-4 text-xs text-slate-300 lg:table-cell">{tier.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-white/20 bg-white/[0.08] p-6">
                <h3 className="mb-3 text-sm font-bold text-white">What Is Included</h3>
                <ul className="space-y-2">
                  {treatmentIncludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-white/30 bg-[#cfe4ee] p-6 text-slate-950">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-4 w-4 text-slate-900" />
                  <h3 className="text-sm font-bold text-slate-950">0% Finance Available</h3>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-slate-700">{financeInfo.description}</p>
                <div className="rounded-2xl border border-slate-950/10 bg-white p-3">
                  <div className="text-xl font-black text-slate-950">From £{financeInfo.monthlyFrom}/month</div>
                  <span className="text-xs text-slate-500">Over {financeInfo.spreadOver} at 0% APR</span>
                </div>
              </div>
            </div>

            <p className="max-w-4xl text-sm leading-relaxed text-white/76">
              Platinum and Diamond providers may charge slightly more than general dentists, but their experience means fewer complications, fewer refinement rounds, and better results. Most patients find the slightly higher upfront cost saves money overall through less total treatment time. Our free service lets you compare quotes from multiple top-tier providers so you can decide based on both cost and credentials.
            </p>
          </div>
        </section>

        {/* Conditions / Treatments — reference-style service panel */}
        <section className="bg-[#cfe4ee] py-20 md:py-28">
          <div className="container-width">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-4 text-4xl font-medium text-slate-800 md:text-6xl">Precision-Crafted Smile Solutions</h2>
              <p className="text-sm leading-7 text-slate-600">
                Our Platinum providers routinely treat complex bite and alignment issues that previously required fixed braces, using advanced features like SmartForce attachments and Precision Wings. Select a condition to find specialists near you.
              </p>
            </div>

            <div className="grid overflow-hidden bg-white shadow-sm md:grid-cols-[1.05fr_1fr]">
              <div className="min-h-[520px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/precision-crafted-smile.jpeg"
                  alt="Clear Invisalign aligner held up to a healthy smile"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid sm:grid-cols-2">
                {services.map(service => (
                  <article key={service.id} className="group flex min-h-44 flex-col border-b border-r border-slate-200 p-6 transition hover:bg-slate-50">
                    <Link href={`/services/${service.slug}/`}>
                      <h3 className="mb-3 text-xl font-medium leading-tight text-slate-800 transition-colors group-hover:text-cyan-800">{service.title}</h3>
                    </Link>
                    <p className="mb-5 line-clamp-3 flex-grow text-sm leading-6 text-slate-600">{service.description}</p>
                    <Link href={`/services/${service.slug}/`} className="mt-auto text-sm font-bold text-slate-500 transition group-hover:text-cyan-800">
                      Explore treatment
                    </Link>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => setIsModalOpen(true)} className="rounded-full border border-slate-500 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-800 hover:text-white">
                Explore All Services
              </button>
            </div>
          </div>
        </section>

        {/* How It Works — visual steps first, text after */}
        <FloatingPathsBackground position={-1} className="bg-white py-16 md:py-20">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-black text-slate-950 md:text-5xl">How Our Free Matching Service Works</h2>
              <p className="mx-auto max-w-2xl text-slate-600">
                We are not a dental clinic. We are a free referral service that connects you with the right Invisalign specialist. You pay nothing and there is no obligation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { step: 1, title: "Submit Your Details", desc: "60-second form with your location and treatment type. No account needed. Your details are only shared with matched providers." },
                { step: 2, title: "We Find Your Matches", desc: "We search 350+ Platinum and Diamond providers and shortlist the best fit based on case type, location, reviews, and availability." },
                { step: 3, title: "Get Up to 3 Free Quotes", desc: "Matched providers contact you within 2 hours. Each offers a free consultation with an iTero 3D scan and personalised treatment plan." },
              ].map(item => (
                <div key={item.step} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-slate-950 shadow-lg">
                    <span className="text-2xl font-black text-cyan-200">{item.step}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-black text-slate-950">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="mb-3 text-lg font-black text-white">Why we built this service</h3>
                  <p className="mb-3 text-sm leading-relaxed text-slate-300">
                    Finding a genuinely experienced Invisalign provider is harder than it should be. Any general dentist can offer Invisalign after a short training course, but the quality of your result depends heavily on case experience. Our vetting ensures you only see providers with a proven track record across hundreds of cases.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Our network covers over 350 clinics across England, Scotland, Wales, and Northern Ireland. There is no catch. We earn a referral fee from the provider only if you choose to proceed with treatment, so the service is always free for you.
                  </p>
                </div>
                <div className="text-center">
                  <button onClick={() => setIsModalOpen(true)} className="btn-primary text-lg !px-8 !py-4">Get Your Free Quotes</button>
                  <p className="mt-2 text-xs text-slate-400">100% free · No obligation · 60 seconds</p>
                </div>
              </div>
            </div>
          </div>
        </FloatingPathsBackground>

        {/* Invisalign vs Braces — side by side, compact */}
        <section className="section-padding bg-[#f6fbff]">
          <div className="container-width">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">Invisalign vs Braces: Which Is Better for Adults?</h2>
            <p className="text-gray-600 mb-8 max-w-3xl">
              For most adult cases, Invisalign delivers comparable or better results with significantly less disruption. The specifics depend on your case, which is why the free consultation and 3D scan is so valuable.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 border border-slate-200 shadow-sm">
                <h3 className="font-display font-medium text-cyan-800 text-lg mb-4">Invisalign Clear Aligners</h3>
                <ul className="space-y-2.5">
                  {['Virtually invisible during wear', 'Removable for eating and brushing', 'No metal brackets or wires', 'Visits every 6 to 8 weeks', 'Digital preview of final results', 'Average 6 to 18 months', 'Smooth plastic, no sharp edges', '£1,500 to £5,500'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 border border-slate-200 shadow-sm">
                <h3 className="font-display font-bold text-gray-400 text-lg mb-4">Traditional Metal Braces</h3>
                <ul className="space-y-2.5">
                  {['Visible metal on teeth', 'Fixed, cannot remove', 'Strict food restrictions', 'Monthly adjustments needed', 'No result preview', 'Average 18 to 36 months', 'Can cause sores and irritation', '£1,500 to £6,000'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5" /><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-4xl">
              The most important factor with either system is provider experience. A Platinum specialist who has treated hundreds of cases will outperform a less experienced dentist regardless of the system used. The few cases where braces remain superior are severe skeletal issues requiring surgical jaw repositioning, which affects a small minority of adults.
            </p>
          </div>
        </section>

        {/* Testimonials — compact header */}
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">What Patients Say</h2>
                <p className="text-gray-600">Over 12,000 patients have used our free service to find a top-tier Invisalign provider.</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="btn-primary whitespace-nowrap self-start md:self-auto">Get Matched Free</button>
            </div>
            <Testimonials limit={5} />
          </div>
        </section>

        {/* Locations — compact header */}
        <FloatingPathsBackground position={1} className="bg-[#f6fbff] py-16 md:py-20">
          <div className="container-width">
            <h2 className="mb-3 text-3xl font-black text-slate-950 md:text-5xl">Compare Invisalign Dentists in Your City</h2>
            <p className="mb-8 max-w-3xl text-slate-600">
              Our network covers over 350 cities across England, Scotland, Wales, and Northern Ireland. Each page shows available providers, treatments, local pricing, and reviews.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {topCities.map(city => (
                <Link key={city} href={`/location/${toSlug(city)}/`} className="group flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 hover:shadow-lg hover:shadow-slate-950/5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-950 transition-transform group-hover:scale-110">
                    <MapPin className="h-4 w-4 text-cyan-200" />
                  </div>
                  <div>
                    <span className="block text-sm font-black text-slate-950 group-hover:text-cyan-900">Invisalign {city}</span>
                    <span className="text-[11px] text-slate-500">Providers and prices</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/location/" className="text-sm font-bold text-cyan-700 hover:underline">View all 350+ locations →</Link>
            </div>
          </div>
        </FloatingPathsBackground>

        {/* FAQ — 10 questions */}
        <section className="section-padding bg-white">
          <div className="container-width max-w-3xl">
            <FAQ faqs={homepageFaqs} title="Invisalign FAQs: Everything You Need to Know" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop" alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="container-width text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to Find Your Invisalign Dentist?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              60-second form. Up to 3 free quotes from Platinum providers. Free consultation and 3D scan included. No obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsModalOpen(true)} className="btn-primary text-lg !px-10 !py-4">Compare Providers Free</button>
              <Link href="/services/" className="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 text-lg !px-10 !py-4">
                Browse Treatments
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              {['Always 100% free', 'Platinum and Diamond only', 'Free 3D scan included'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-400" /> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
