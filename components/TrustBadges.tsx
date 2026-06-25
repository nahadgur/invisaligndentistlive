import { ShieldCheck, UserCheck, Award, PoundSterling } from 'lucide-react';
import { trustBadges } from '@/data/site';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="h-5 w-5 text-cyan-700" />,
  UserCheck: <UserCheck className="h-5 w-5 text-cyan-700" />,
  Award: <Award className="h-5 w-5 text-cyan-700" />,
  PoundSterling: <PoundSterling className="h-5 w-5 text-cyan-700" />,
};

export function TrustBadges() {
  return (
    <section className="border-y border-slate-200 bg-white py-8">
      <div className="container-width">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map(badge => (
            <div key={badge.title} className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100">
                {iconMap[badge.icon]}
              </div>
              <div>
                <div className="text-sm font-black text-slate-950">{badge.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-slate-600">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
