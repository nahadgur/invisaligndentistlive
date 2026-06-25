'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'id_consent_v1';
const COOKIE_NAME = 'id_consent';
const COOKIE_MAX_AGE_DAYS = 180;

type ConsentValue = 'granted' | 'denied' | null;

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtagConsentUpdate(state: 'granted' | 'denied') {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag('consent', 'update', {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

export function ConsentBanner() {
  const [decision, setDecision] = useState<ConsentValue>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cookie = getCookie(COOKIE_NAME);
    if (cookie === 'granted' || cookie === 'denied') {
      setDecision(cookie);
      gtagConsentUpdate(cookie);
    }
  }, []);

  function setConsent(state: 'granted' | 'denied') {
    setCookie(COOKIE_NAME, state);
    try {
      localStorage.setItem(STORAGE_KEY, state);
    } catch {
      // private mode etc.
    }
    setDecision(state);
    gtagConsentUpdate(state);
  }

  if (!mounted || decision === 'granted' || decision === 'denied') {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="consent-banner-title"
      aria-describedby="consent-banner-desc"
      className="fixed bottom-3 inset-x-3 z-50 mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-3.5 shadow-2xl sm:bottom-4 sm:inset-x-4 sm:p-6"
    >
      <h2 id="consent-banner-title" className="text-sm font-display font-bold text-gray-900 mb-1 sm:text-base sm:mb-1.5">
        Cookies on Invisalign Dentists
      </h2>
      <p id="consent-banner-desc" className="text-xs text-gray-600 leading-snug mb-2.5 sm:text-sm sm:leading-relaxed sm:mb-4">
        We use essential cookies to keep the site working. With your permission we also use analytics
        cookies to understand which content helps patients find the right provider.
      </p>
      <div className="flex flex-wrap justify-end gap-2 sm:gap-2.5">
        <button
          onClick={() => setConsent('denied')}
          className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors sm:px-4 sm:py-2 sm:text-sm"
        >
          Essential only
        </button>
        <button
          onClick={() => setConsent('granted')}
          className="rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-brand-700 transition-colors sm:px-4 sm:py-2 sm:text-sm"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
