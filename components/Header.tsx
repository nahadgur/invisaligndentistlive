'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';

interface HeaderProps {
  onOpenModal?: () => void;
}

export function Header({ onOpenModal }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Mobile is always the floating white pill (base classes); the lg: overrides restore the
          full-bleed dark bar on desktop until the user scrolls. Pure CSS, so no hydration flash. */}
      <header className={`fixed inset-x-0 z-50 pointer-events-none ${mounted ? 'transition-[top,padding] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]' : ''} top-4 px-3 ${!scrolled ? 'lg:top-0 lg:px-0' : ''}`}>
        <div className={`absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/62 via-black/24 to-transparent transition-opacity duration-500 ease-out opacity-0 ${!scrolled ? 'lg:opacity-100' : ''}`} />
        <div
          className={`relative mx-auto pointer-events-auto w-[min(64rem,calc(100vw_-_1.5rem))] ${!scrolled ? 'lg:w-full' : ''} ${mounted ? 'transition-[width] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]' : ''}`}
        >
          <div
            className={`relative flex items-center border ${mounted ? 'transition-[height,border-radius,background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]' : ''} h-16 rounded-3xl border-cyan-100 bg-white shadow-[0_18px_60px_rgba(14,165,233,0.18)] backdrop-blur-0 ${
              !scrolled
                ? 'lg:h-20 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-cyan-200/20 lg:bg-slate-950/35 lg:shadow-[0_0_42px_rgba(14,165,233,0.14)] lg:backdrop-blur-2xl'
                : ''
            }`}
          >
            {/* Content rail — locked to the floating-pill width so the logo and CTA hold their
                position while the bar morphs from full-bleed to pill (no horizontal jump) */}
            <div
              className="relative mx-auto flex w-full items-center justify-between px-4"
              style={{ maxWidth: 'min(64rem, calc(100vw - 1.5rem))' }}
            >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className={`flex items-center justify-center overflow-hidden rounded-full border bg-white transition-all duration-300 h-9 w-9 border-white/80 ${!scrolled ? 'lg:h-11 lg:w-11 lg:border-white/30' : ''}`}>
                <Image src="/logo.png" alt="Invisalign Dentists" width={40} height={40} priority className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className={`font-display font-semibold leading-none transition-colors duration-300 text-lg text-slate-800 ${!scrolled ? 'lg:text-2xl lg:text-white lg:drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]' : ''}`}>Invisalign Dentists</span>
                <span className={`font-semibold transition-colors duration-300 text-[11px] text-slate-500 ${!scrolled ? 'lg:text-xs lg:text-white/80' : ''}`}>Provider matching</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
              <Link href="/" className={`rounded-full px-4 py-2 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 ${scrolled ? 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-800' : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] hover:bg-white/16 hover:text-cyan-100'}`}>Home</Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <Link href="/services/" className={`flex items-center gap-1 rounded-full px-4 py-2 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 ${scrolled ? 'text-slate-700 group-hover:bg-cyan-50 group-hover:text-cyan-800' : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] group-hover:bg-white/16 group-hover:text-cyan-100'}`}>
                  Services <ChevronDown className="w-4 h-4" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 translate-y-3 rounded-[1.75rem] border border-slate-200 bg-white/96 p-3 opacity-0 shadow-2xl shadow-slate-950/16 backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:-translate-x-1/2 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mb-2 border-b border-slate-100 px-3 pb-3">
                    <div className="font-display text-lg font-semibold text-slate-900">Treatments</div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">Explore clear aligner options by smile concern.</p>
                  </div>
                  {services.map(service => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}/`}
                      className="group/item flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-[#eaf7fc] hover:text-cyan-900"
                    >
                      <span>{service.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/location/" className={`rounded-full px-4 py-2 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 ${scrolled ? 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-800' : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] hover:bg-white/16 hover:text-cyan-100'}`}>Locations</Link>
              <Link href="/blog/" className={`rounded-full px-4 py-2 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 ${scrolled ? 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-800' : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] hover:bg-white/16 hover:text-cyan-100'}`}>Blog</Link>

            </nav>

            <button onClick={onOpenModal} className={`group hidden h-11 items-center gap-3 rounded-full px-5 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 lg:inline-flex ${scrolled ? 'bg-slate-800 text-white hover:bg-slate-950 hover:shadow-lg' : 'bg-white text-slate-950 hover:bg-cyan-50 hover:shadow-xl'}`}>
              Find a Provider <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Toggle */}
            <button className="rounded-full p-2 text-slate-700 transition-transform duration-200 hover:bg-white/70 active:scale-90 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <span className={`block transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${mobileOpen ? 'rotate-90 scale-110' : 'rotate-0'}`}>
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </span>
            </button>
            </div>
          </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute left-3 right-3 top-[calc(100%+0.75rem)] z-50 max-h-[80vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-xl lg:hidden">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link href="/" className="block rounded-2xl px-3 py-3 text-base font-bold text-slate-700 hover:bg-cyan-50">Home</Link>
              <div className="px-3 py-2">
                {services.map(s => (
                  <Link key={s.id} href={`/services/${s.slug}/`} className="block py-2 text-sm font-semibold text-slate-600 hover:text-cyan-700">{s.title}</Link>
                ))}
              </div>
              <Link href="/location/" className="block rounded-2xl px-3 py-3 text-base font-bold text-slate-700 hover:bg-cyan-50">Locations</Link>
              <Link href="/blog/" className="block rounded-2xl px-3 py-3 text-base font-bold text-slate-700 hover:bg-cyan-50">Blog</Link>
              <div className="pt-4 px-3">
                <button onClick={() => { onOpenModal?.(); setMobileOpen(false); }} className="block w-full btn-primary text-center">Find a Provider</button>
              </div>
            </div>
          </div>
        )}
        </div>
      </header>
    </>
  );
}
