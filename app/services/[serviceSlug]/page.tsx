'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Clock, Shield, Star, Search, CheckCircle, ArrowRight, ChevronDown, Award, Users, CreditCard, Sparkles } from 'lucide-react';
import { services, getServiceBySlug } from '@/data/services';
import { LOCATIONS, toSlug } from '@/data/locations';
import { FAQS_SERVICES } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrustBadges } from '@/components/TrustBadges';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadFormModal } from '@/components/LeadFormModal';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { PricingSection } from '@/components/PricingSection';

// Service-specific long-form content
const serviceContent: Record<string, { intro: string[]; benefits: { title: string; desc: string }[]; candidateIntro: string; candidates: string[]; process: { title: string; desc: string }[] }> = {
  crowded: {
    intro: [
      "Crowded teeth are the most common orthodontic issue in UK adults. They occur when there is not enough space in the jaw for all your teeth to fit in their natural position, causing them to overlap, twist, or push forward. Beyond the cosmetic impact, crowding makes proper brushing and flossing difficult, increasing your risk of decay, gum disease, and bad breath.",
      "Invisalign treats crowded teeth by using a sequence of clear aligners that apply controlled pressure to gradually create space and guide each tooth into alignment. For mild crowding, Invisalign Lite (up to 14 aligners) is often sufficient and can be completed in 6 to 12 months. Moderate to severe crowding typically requires Invisalign Comprehensive with unlimited aligners over 12 to 18 months.",
      "Platinum and Diamond providers are particularly important for crowding cases because they understand how to use interproximal reduction (IPR), sequential distalization, and SmartForce attachments to create space without extracting teeth. Less experienced providers may default to extractions when a skilled clinician could achieve the same result with advanced aligner techniques.",
    ],
    benefits: [
      { title: 'Easier to Clean', desc: 'Straightening crowded teeth makes brushing and flossing significantly more effective, reducing your long-term risk of cavities and periodontal disease.' },
      { title: 'No Extractions Needed', desc: 'Platinum providers use IPR and sequential distalization techniques to create space without removing healthy teeth in the majority of crowding cases.' },
      { title: 'Gradual, Comfortable Movement', desc: 'SmartTrack aligners apply gentle pressure across multiple teeth simultaneously, making the process more comfortable than braces tightening.' },
      { title: 'Predictable Digital Planning', desc: 'ClinCheck maps every millimetre of movement before treatment begins, so you know exactly how your crowding will resolve and when.' },
    ],
    candidateIntro: "You may be a good candidate for Invisalign crowded teeth treatment if you experience any of the following:",
    candidates: [
      "Teeth that overlap or sit behind each other",
      "Difficulty flossing between tightly packed teeth",
      "Teeth that have shifted after childhood braces",
      "Visible twisting or rotation of front teeth",
      "Gum inflammation caused by hard-to-clean areas",
    ],
    process: [
      { title: 'Assessment and Scan', desc: 'Your provider takes a full 3D iTero scan and assesses the severity of crowding, jaw space, and gum health.' },
      { title: 'ClinCheck Treatment Plan', desc: 'A digital plan maps how each tooth will move to resolve the crowding, including any IPR needed to create space.' },
      { title: 'Aligner Treatment', desc: 'You wear each set of aligners for 1 to 2 weeks, with check-ups every 6 to 8 weeks to monitor progress.' },
      { title: 'Refinement and Retention', desc: 'If needed, refinement aligners fine-tune the final position. A fixed or removable retainer keeps your result permanent.' },
    ],
  },
  gaps: {
    intro: [
      "Gaps between teeth, known clinically as diastema, can occur anywhere in the mouth but are most commonly seen between the upper front teeth. They can be caused by a mismatch between jaw size and tooth size, missing teeth, gum disease, or habits like thumb sucking in childhood. While some people are comfortable with their gaps, others find they trap food, affect their speech, or impact their confidence.",
      "Invisalign closes gaps by applying targeted pressure to move teeth together. For small gaps affecting only the front teeth, Invisalign Express (up to 7 aligners) can achieve results in as little as 3 to 6 months. Larger or multiple gaps may require Invisalign Lite or Comprehensive depending on the overall alignment of your bite.",
      "One advantage of using a Platinum provider for gap closure is their ability to plan tooth movement that maintains proper bite alignment. Simply pushing teeth together without considering how the upper and lower arches meet can create bite problems. Experienced providers use ClinCheck to ensure gap closure improves both aesthetics and function.",
    ],
    benefits: [
      { title: 'Fast Results for Small Gaps', desc: 'Single gaps between front teeth can often be closed with Invisalign Express in 3 to 6 months, making it one of the quickest treatment types.' },
      { title: 'No Impact on Bite', desc: 'Platinum providers plan gap closure to maintain proper occlusion, ensuring your bite stays balanced as teeth move together.' },
      { title: 'Discreet Treatment', desc: 'Clear aligners are virtually invisible, so nobody needs to know you are closing gaps unless you tell them.' },
      { title: 'Permanent Results', desc: 'With proper retention after treatment, gap closure with Invisalign is a permanent solution that does not relapse.' },
    ],
    candidateIntro: "Invisalign gap treatment may be suitable if you have:",
    candidates: [
      "A visible gap between your two front teeth",
      "Multiple small spaces across your upper or lower teeth",
      "Gaps caused by a missing tooth affecting adjacent teeth",
      "Spaces that trap food and are difficult to keep clean",
      "Speech issues related to gaps in the front teeth",
    ],
    process: [
      { title: 'Gap Assessment', desc: 'Your provider measures gap sizes, checks for underlying causes, and scans your full mouth with iTero 3D technology.' },
      { title: 'Movement Planning', desc: 'ClinCheck plans how each tooth moves to close gaps while maintaining proper bite contact and symmetry.' },
      { title: 'Aligner Wear', desc: 'Clear aligners gently guide teeth together over weeks, with each set making incremental progress toward closure.' },
      { title: 'Retention', desc: 'A bonded retainer behind the teeth or removable Vivera retainer ensures gaps stay closed permanently.' },
    ],
  },
  overbite: {
    intro: [
      "An overbite occurs when the upper front teeth overlap the lower front teeth by more than the normal 2 to 3 millimetres. A deep overbite can cause the lower teeth to bite into the roof of the mouth, leading to wear on the front teeth, jaw pain, and difficulty eating. It is one of the most common bite issues in UK adults and is often accompanied by crowding.",
      "Invisalign corrects overbites using a combination of aligner pressure and, in many cases, Precision Wings. These are built-in features that encourage the lower jaw to move forward while the aligners simultaneously adjust tooth positions. This dual-action approach means Invisalign can now treat overbites that were previously considered braces-only cases.",
      "Overbite correction is one of the most technically demanding Invisalign treatments, which is why provider experience matters enormously. Platinum and Diamond providers have the clinical hours and ClinCheck expertise to plan complex vertical and horizontal tooth movements that resolve the overbite without creating new problems elsewhere in the bite.",
    ],
    benefits: [
      { title: 'Reduces Tooth Wear', desc: 'Correcting the overbite prevents the lower teeth from grinding against the upper teeth or the palate, preserving enamel long-term.' },
      { title: 'Precision Wing Technology', desc: 'Advanced Invisalign features move the jaw and teeth simultaneously, something previously only possible with braces and headgear.' },
      { title: 'Improved Jaw Comfort', desc: 'Many patients with deep overbites experience jaw tension or TMJ discomfort that improves significantly as the bite is corrected.' },
      { title: 'No Headgear Required', desc: 'Precision Wings are built into the aligners themselves, eliminating the need for external headgear or elastics in most cases.' },
    ],
    candidateIntro: "You may benefit from Invisalign overbite treatment if:",
    candidates: [
      "Your upper teeth cover more than half of your lower teeth when biting",
      "Your lower teeth touch the roof of your mouth when you close your jaw",
      "You experience jaw pain, clicking, or tension",
      "Your front teeth show excessive wear or chipping",
      "You have difficulty biting into food with your front teeth",
    ],
    process: [
      { title: 'Bite Analysis', desc: 'A detailed assessment of your overbite depth, jaw position, and any TMJ symptoms, combined with a full 3D scan.' },
      { title: 'Precision Wing Planning', desc: 'ClinCheck plans the combined tooth and jaw movement using Precision Wings and SmartForce attachments.' },
      { title: 'Active Treatment', desc: 'Aligners with built-in Precision Wings are worn for 12 to 18 months, gradually correcting the bite.' },
      { title: 'Stabilisation', desc: 'Retainers hold the corrected bite position while the jaw adapts to its new alignment.' },
    ],
  },
  underbite: {
    intro: [
      "An underbite occurs when the lower teeth sit in front of the upper teeth when the jaw is closed. This can be caused by lower jaw overgrowth, upper jaw underdevelopment, or a combination of both. Underbites affect chewing efficiency, speech clarity, and facial profile, and tend to worsen with age if left untreated.",
      "Invisalign can correct mild to moderate dental underbites by moving the lower teeth backward and the upper teeth forward using a combination of aligners and elastic attachments. For skeletal underbites caused by jaw size discrepancy, Invisalign may be used in combination with other treatments, and your provider will advise on the best approach during your consultation.",
      "Underbite cases require careful planning to avoid destabilising the bite during treatment. Platinum providers understand how to sequence tooth movements to maintain functional contact throughout the process, which is critical for cases involving both upper and lower arch adjustments.",
    ],
    benefits: [
      { title: 'Improved Chewing', desc: 'Correcting the underbite restores proper contact between upper and lower teeth, making biting and chewing significantly more efficient.' },
      { title: 'Clearer Speech', desc: 'Many underbite patients notice an improvement in speech clarity, particularly with "s" and "th" sounds.' },
      { title: 'Facial Profile Improvement', desc: 'Correcting a dental underbite can improve the appearance of the lower face and chin profile.' },
      { title: 'Non-Surgical Option', desc: 'Mild to moderate dental underbites can often be corrected with Invisalign alone, avoiding the need for jaw surgery.' },
    ],
    candidateIntro: "You may be a candidate for Invisalign underbite correction if:",
    candidates: [
      "Your lower front teeth sit in front of your upper front teeth",
      "You experience difficulty biting or chewing food evenly",
      "You have speech issues related to your bite alignment",
      "Your underbite is dental rather than skeletal in origin",
      "You want to explore a non-surgical correction option",
    ],
    process: [
      { title: 'Clinical Assessment', desc: 'Your provider examines whether the underbite is dental, skeletal, or both, and determines if Invisalign alone is suitable.' },
      { title: 'Dual Arch Planning', desc: 'ClinCheck plans coordinated upper and lower tooth movements, often using Class III elastic attachments.' },
      { title: 'Aligner Treatment', desc: 'You wear aligners with precision-cut hooks for elastics, gradually shifting the bite into correct alignment.' },
      { title: 'Monitoring and Retention', desc: 'Regular check-ups ensure both arches are moving as planned. Retainers hold the final corrected position.' },
    ],
  },
  crossbite: {
    intro: [
      "A crossbite occurs when one or more upper teeth bite inside the lower teeth rather than outside. This can affect the front teeth (anterior crossbite) or the back teeth (posterior crossbite). Crossbites cause uneven tooth wear, jaw shifting, gum recession on the affected teeth, and can lead to TMJ problems if left untreated.",
      "Invisalign corrects crossbites by expanding or shifting the affected teeth into their correct position relative to the opposing arch. Posterior crossbites may require palatal expansion in younger patients, but in adults, Invisalign can often achieve sufficient tooth movement to resolve the crossbite without additional appliances.",
      "Crossbite correction requires precise control of individual tooth movements in three dimensions. This is where provider experience is critical. Platinum providers use optimised SmartForce attachments and staging protocols to achieve crossbite correction predictably, while less experienced providers may struggle with the rotational and lateral movements required.",
    ],
    benefits: [
      { title: 'Prevents Gum Recession', desc: 'Crossbite teeth under abnormal pressure are at higher risk of gum recession. Correcting the crossbite removes this risk.' },
      { title: 'Eliminates Jaw Shifting', desc: 'Many crossbite patients unconsciously shift their jaw to compensate, causing muscle tension and TMJ symptoms that resolve with treatment.' },
      { title: 'Even Tooth Wear', desc: 'Correcting the crossbite distributes biting forces evenly, preventing premature wear on individual teeth.' },
      { title: '3D Precision Control', desc: 'SmartForce attachments give Invisalign precise control over the complex rotational movements crossbite correction demands.' },
    ],
    candidateIntro: "Invisalign crossbite treatment may be right for you if:",
    candidates: [
      "One or more upper teeth bite inside the lower teeth",
      "You notice uneven wear on certain teeth",
      "Your jaw shifts to one side when you close your mouth",
      "You experience clicking or discomfort in your jaw joint",
      "A dentist has identified a crossbite during a routine check-up",
    ],
    process: [
      { title: 'Crossbite Mapping', desc: 'A 3D scan identifies exactly which teeth are in crossbite and how they need to move in all three dimensions.' },
      { title: 'Attachment Planning', desc: 'Custom SmartForce attachments are planned to give the aligners leverage for the specific rotational and lateral movements needed.' },
      { title: 'Progressive Correction', desc: 'Aligners move the crossbite teeth in carefully staged increments to avoid destabilising the surrounding bite.' },
      { title: 'Result Verification', desc: 'Final scans confirm the crossbite is fully resolved and retainers are fitted to maintain the correction.' },
    ],
  },
  adults: {
    intro: [
      "Invisalign for adults is the most popular clear aligner treatment in the UK, suitable for patients of any age who want to straighten their teeth without visible braces. Whether you missed out on orthodontic treatment as a teenager, your teeth have shifted over the years, or you had braces as a child and your teeth have relapsed, Invisalign offers a discreet and effective solution.",
      "Adults make up the fastest-growing segment of orthodontic patients in the UK. According to the British Orthodontic Society, one in five orthodontic patients is now an adult. The primary drivers are the availability of invisible treatment options, shorter treatment times, and the ability to preview results digitally before committing.",
      "Our network specialises in connecting adults with Platinum and Diamond providers because adult treatment has specific clinical considerations. Adult bone is denser than adolescent bone, which affects how teeth move. Root resorption risk needs to be monitored. Existing dental work like crowns, bridges, or implants may need to be accounted for in the treatment plan. High-tier providers manage these factors routinely.",
    ],
    benefits: [
      { title: 'No Age Limit', desc: 'Invisalign works for adults of all ages provided your teeth and gums are healthy. We have providers treating patients well into their 60s and 70s.' },
      { title: 'Works Around Your Life', desc: 'Removable aligners mean no impact on eating, speaking, or professional appearance. Treatment fits around your schedule, not the other way around.' },
      { title: 'Existing Dental Work Compatible', desc: 'Platinum providers can plan treatment around crowns, veneers, bridges, and even implants in many cases.' },
      { title: 'Treats All Common Issues', desc: 'Crowding, gaps, overbites, underbites, and crossbites can all be addressed with adult Invisalign treatment.' },
    ],
    candidateIntro: "Adult Invisalign treatment may be suitable if you:",
    candidates: [
      "Want straighter teeth but do not want visible braces",
      "Had braces as a teenager but your teeth have shifted since",
      "Have crowding, gaps, or bite issues that bother you",
      "Need a treatment that fits around a busy professional schedule",
      "Have existing dental work that needs to be factored into treatment",
    ],
    process: [
      { title: 'Comprehensive Assessment', desc: 'A full examination of teeth, gums, bone health, and any existing dental work to confirm Invisalign suitability.' },
      { title: 'Personalised Planning', desc: 'ClinCheck creates a digital treatment plan accounting for adult-specific factors like bone density and existing restorations.' },
      { title: 'Discreet Treatment', desc: 'Clear aligners are worn for 20 to 22 hours daily with check-ups every 6 to 8 weeks. Most people will never notice.' },
      { title: 'Long-Term Retention', desc: 'A bonded or removable retainer ensures your result is maintained for life after treatment completes.' },
    ],
  },
};

export default function ServicePage({ params }: { params: { serviceSlug: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocations, setShowLocations] = useState(false);
  const service = getServiceBySlug(params.serviceSlug);
  if (!service) notFound();

  const content = serviceContent[service.id] || serviceContent.adults;
  const relatedServices = services.filter(s => s.id !== service.id);

  const filteredLocations = useMemo(() => {
    if (!searchQuery) return LOCATIONS;
    const result: Record<string, string[]> = {};
    Object.entries(LOCATIONS).forEach(([region, cities]) => {
      const filtered = cities.filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()));
      if (filtered.length > 0) result[region] = filtered;
    });
    return result;
  }, [searchQuery]);

  const totalCities = Object.values(LOCATIONS).flat().length;

  const combinedFaqs = [
    ...(service.faqs || []),
    ...FAQS_SERVICES,
  ];

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">

        {/* Hero with form */}
        <section className="bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.image} alt="" className="w-full h-full object-cover opacity-40" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40" />
          </div>
          <div className="container-width py-12 md:py-20 relative z-10">
            <Breadcrumbs items={[{ label: 'Treatments', href: '/services/' }, { label: service.title }]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{service.description}</p>
                <div className="space-y-3">
                  {['Compare up to 3 free quotes', 'Platinum and Diamond providers only', `${totalCities}+ UK locations available`].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-400 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <HeroLeadForm service={service.title} />
              </div>
            </div>
          </div>
        </section>

        <TrustBadges />

        <div className="container-width py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">

              {/* Long-form intro */}
              <section className="mb-14">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">{service.title}: What You Need to Know</h2>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  {content.intro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>

              {/* Benefits */}
              <section className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Benefits of {service.title}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {content.benefits.map((b, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-brand-100 p-2 rounded-lg text-brand-600 flex-shrink-0 h-fit">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                        <p className="text-sm text-gray-600">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Am I a candidate? */}
              <section className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Am I a Candidate for {service.title}?</h2>
                <p className="text-gray-600 mb-4">{content.candidateIntro}</p>
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
                  <ul className="space-y-3">
                    {content.candidates.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  The best way to confirm your suitability is a free consultation with a Platinum provider. The 3D iTero scan takes 5 minutes and gives your dentist a complete picture of your teeth, bite, and jaw to determine the ideal treatment approach.
                </p>
              </section>

              {/* Treatment Process */}
              <section className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">The Treatment Process</h2>
                <div className="space-y-4">
                  {content.process.map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-0.5">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pricing */}
              <PricingSection serviceId={service.id} serviceName={service.title} />

              {/* FAQs - merged */}
              <div className="mb-14">
                <FAQ faqs={combinedFaqs} title={`${service.title} FAQs`} />
              </div>

              {/* Testimonials */}
              <section className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Patient Reviews</h2>
                <Testimonials limit={3} />
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-3">Get Matched for {service.title}</h3>
                  <p className="text-gray-600 mb-5 text-sm">Free, no-obligation match with Platinum providers in your area.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full btn-primary text-center">Find a Provider</button>
                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                    {[
                      { icon: <Clock className="w-4 h-4 text-brand-500" />, text: "Consultations this week" },
                      { icon: <Shield className="w-4 h-4 text-brand-500" />, text: "Platinum and Diamond only" },
                      { icon: <Star className="w-4 h-4 text-brand-500" />, text: "4.95 average rating" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="bg-brand-100 p-1.5 rounded-full">{item.icon}</div>
                        <span className="text-sm font-medium text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-900 text-white p-6 rounded-2xl">
                  <h3 className="font-display font-bold mb-2">From £50/month</h3>
                  <p className="text-brand-100 text-sm mb-4">0% finance available. Spread the cost over 12 to 60 months.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full bg-white text-brand-900 text-center font-bold py-3 px-6 rounded-xl hover:bg-brand-50 transition-colors text-sm">Get Free Quotes</button>
                </div>

                {/* Other Treatments */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Other Treatments</h3>
                  <div className="space-y-2">
                    {relatedServices.map(s => (
                      <Link key={s.id} href={`/services/${s.slug}/`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600 transition-colors">
                        <ArrowRight className="w-3 h-3" /> {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Locations — at the bottom, collapsed by default */}
          <section className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">Find {service.title} Providers Near You</h2>
                <p className="text-gray-600">
                  We have Platinum and Diamond providers for {service.title.toLowerCase()} in over {totalCities} cities and towns across the UK.
                </p>
              </div>
              <button
                onClick={() => setShowLocations(!showLocations)}
                className="flex items-center gap-2 text-brand-600 font-bold text-sm hover:underline self-start md:self-auto whitespace-nowrap"
              >
                {showLocations ? 'Hide locations' : `Show all ${totalCities}+ locations`}
                <ChevronDown className={`w-4 h-4 transition-transform ${showLocations ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Search always visible */}
            <div className="mb-6 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search your city or town..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); if (!showLocations) setShowLocations(true); }}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* 
              City grid: always in the DOM for Googlebot (aria-hidden false, links crawlable).
              CSS hides overflow when collapsed. No JS removal from DOM.
            */}
            <div
              className={`transition-all duration-500 overflow-hidden ${showLocations ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'}`}
              aria-hidden={!showLocations}
            >
              <div className="space-y-8 pb-4">
                {Object.entries(filteredLocations).map(([region, cities]) => (
                  <div key={region}>
                    <h3 className="text-lg font-display font-bold text-gray-900 mb-3">{region}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {cities.map(city => (
                        <Link
                          key={city}
                          href={`/location/${toSlug(city)}/`}
                          className="group flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg hover:bg-brand-50 transition-all border border-gray-100 hover:border-brand-200"
                        >
                          <MapPin className="w-3 h-3 text-brand-400 flex-shrink-0" />
                          <span className="text-gray-700 group-hover:text-brand-700 text-xs font-medium truncate">{city}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!showLocations && (
              <p className="text-sm text-gray-500">
                Search for your city above or <button onClick={() => setShowLocations(true)} className="text-brand-600 font-medium hover:underline">browse all locations</button> to find {service.title.toLowerCase()} providers near you.
              </p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
