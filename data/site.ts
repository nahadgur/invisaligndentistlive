export const siteConfig = {
  name: 'Invisalign Dentists',
  // The deploy serves www and redirects the apex to it, so every canonical,
  // og:url and sitemap entry has to name www or we publish redirect URLs.
  domain: 'www.invisaligndentists.uk',
  url: 'https://www.invisaligndentists.uk',
  phone: '020 1234 5678',
  phoneHref: 'tel:+442012345678',
  email: 'hello@invisaligndentists.uk',
  description: 'Connecting discerning patients with the top 1% of Platinum Invisalign providers for verified orthodontic results across the UK.',
  tagline: 'Only the Top 5% of Invisalign Providers',
};

export const testimonials = [
  {
    id: 1,
    name: "Sophie L.",
    location: "Wimbledon, SW London",
    text: "I was nervous about getting Invisalign but this site connected me with a Diamond provider who made the whole process seamless. My teeth look incredible after just 8 months.",
    rating: 5,
    service: "Full Invisalign"
  },
  {
    id: 2,
    name: "Marcus T.",
    location: "Islington, North London",
    text: "Finding a Platinum provider made all the difference. They'd done thousands of cases and knew exactly how to handle my complex bite. Couldn't be happier with the results.",
    rating: 5,
    service: "Full Invisalign"
  },
  {
    id: 3,
    name: "Rachel K.",
    location: "Bristol, South West",
    text: "My daughter used Invisalign Teen and it was so much better than traditional braces. The dentist we found through this site was brilliant with teenagers.",
    rating: 5,
    service: "Invisalign Teen"
  },
  {
    id: 4,
    name: "James P.",
    location: "Manchester, North West",
    text: "I only needed minor straightening so Invisalign Lite was perfect. Done in 5 months and the results speak for themselves. Great to find a verified top-tier provider so easily.",
    rating: 5,
    service: "Invisalign Lite"
  },
  {
    id: 5,
    name: "Aisha M.",
    location: "Birmingham, West Midlands",
    text: "I combined Invisalign with whitening at the end and the transformation is unreal. The provider they matched me with had over 1,500 cases under their belt.",
    rating: 5,
    service: "Invisalign + Whitening"
  }
];

export const trustBadges = [
  {
    title: "Platinum & Diamond Only",
    description: "We only list the top 5% of Invisalign providers by case volume",
    icon: "Award"
  },
  {
    title: "Verified Credentials",
    description: "Every provider's Invisalign tier is independently verified",
    icon: "ShieldCheck"
  },
  {
    title: "Free Consultations",
    description: "Book a free initial Invisalign assessment with any listed provider",
    icon: "UserCheck"
  },
  {
    title: "Finance Available",
    description: "Most providers offer 0% interest payment plans from £50/month",
    icon: "PoundSterling"
  }
];

export const FAQS_HOME = [
  { question: "How does this service differ from a normal dentist?", answer: "We are an independent referral network focusing on Platinum tier providers. We prioritise matching you with clinical experts who handle thousands of cases annually. This ensures you receive the highest standard of specialised care." },
  { question: "How do I get matched with the right provider?", answer: "Our matching service is completely free and takes less than 2 minutes. Simply complete our quick form with your requirements and location, and we'll connect you with vetted Invisalign specialists in your area. We only work with experienced providers who meet our quality standards." },
  { question: "Is there a cost for the referral?", answer: "Our referral facilitation service is completely free for patients. We help you find the perfect match and arrange your initial consultation at no charge. You only pay the clinic directly if you choose to proceed with treatment." },
];

export const FAQS_SERVICES = [
  { question: "How long does treatment usually take?", answer: "Treatment duration varies but most adult cases are completed within 6 to 18 months. Lite cases can often be resolved in as little as 3 months. Your specialist will provide a precise digital timeline during your scan." },
  { question: "Will Invisalign affect my speech?", answer: "Most patients experience a slight lisp for the first few days as the tongue adjusts to the aligners. This typically disappears quickly as you get used to wearing them. The aligners are ultra-thin to minimize any impact on daily conversation." },
  { question: "Can I see my results before I start?", answer: "Yes, we use advanced 3D ClinCheck software to map out your entire smile transformation. You will be able to view a digital animation of your teeth moving into their final position. This happens before you even order your first set of aligners." },
];

export const FAQS_LOCATION = [
  { question: "How do you vet your local providers?", answer: "We only partner with clinics that maintain Platinum or Diamond status from Invisalign. This signifies they have achieved the highest level of experience and successful case volume. We also monitor patient reviews to ensure consistently high service standards." },
  { question: "Are the clinics easily accessible?", answer: "Our network specifically targets major city centres and high-value towns for maximum convenience. Most partners offer flexible evening or weekend appointments to fit your schedule. We prioritise locations with excellent transport links and modern facilities." },
  { question: "What if there isn't a provider in my exact town?", answer: "If your specific town is not listed, we will match you with the nearest elite hub. Platinum providers are worth the short travel as they offer superior technology and clinical outcomes. We ensure the travel time is minimised for your convenience." },
];
