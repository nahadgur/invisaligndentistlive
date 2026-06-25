'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  showCta?: boolean;
  showTrust?: boolean;
  onOpenModal?: () => void;
}

export function Hero({ title, subtitle, image, showCta = true, showTrust = true, onOpenModal }: HeroProps) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover object-[65%_center]" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/86 via-slate-900/48 to-slate-900/8" />
        <div className="absolute inset-0 opacity-[0.16] mix-blend-multiply [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.9)_0.6px,transparent_0.8px)] [background-size:4px_4px]" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/50 to-transparent" />
      </div>

      <div className="container-width relative flex min-h-screen items-center py-28 md:py-32">
        {/* On mobile the glass panel is dropped so the hero runs full-bleed and the smile shows through;
            the frosted "mirror" container only returns at md+ */}
        <div className="relative max-w-2xl md:overflow-hidden md:rounded-[2rem] md:border md:border-white/25 md:bg-slate-950/34 md:p-7 md:shadow-2xl md:shadow-black/25 md:backdrop-blur-md md:before:absolute md:before:inset-x-6 md:before:top-0 md:before:h-px md:before:bg-gradient-to-r md:before:from-transparent md:before:via-white/70 md:before:to-transparent md:after:absolute md:after:-right-24 md:after:-top-24 md:after:h-64 md:after:w-64 md:after:rounded-full md:after:bg-white/10 md:after:blur-3xl md:p-10">
          <div className="relative z-10">
          <h1 className="max-w-2xl text-[3.25rem] font-semibold leading-[1.0] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl md:leading-[0.95] md:drop-shadow-sm">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] md:text-lg md:text-white/86 md:drop-shadow-none">{subtitle}</p>

          {showCta && (
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              {onOpenModal ? (
                <button onClick={onOpenModal} className="group inline-flex h-14 w-full items-center justify-between overflow-hidden rounded-full bg-white px-2 pl-6 text-left text-sm font-black text-slate-950 shadow-2xl shadow-slate-950/25 transition-all duration-300 hover:w-full hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-56 sm:hover:w-72">
                  <span className="whitespace-nowrap">Find My Provider</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </button>
              ) : (
                <Link href="/contact/" className="group inline-flex h-14 w-full items-center justify-between overflow-hidden rounded-full bg-white px-2 pl-6 text-left text-sm font-black text-slate-950 shadow-2xl shadow-slate-950/25 transition-all duration-300 hover:w-full hover:bg-cyan-50 sm:w-56 sm:hover:w-72">
                  <span className="whitespace-nowrap">Find My Provider</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Link>
              )}
              <Link href="/services/" className="inline-flex h-14 items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">
                View Treatments
              </Link>
            </div>
          )}

          {showTrust && (
            <div className="mt-9 flex flex-wrap gap-3 text-xs font-bold text-white/85">
              {['Platinum & Diamond Providers', 'Free Consultations', '4.95 Star Rated'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur">
                  <CheckCircle className="h-4 w-4 text-cyan-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
