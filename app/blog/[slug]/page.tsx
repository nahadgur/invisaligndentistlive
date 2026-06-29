'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronUp } from "lucide-react";
import Papa from 'papaparse';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadFormModal } from '@/components/LeadFormModal';
import { FloatingPathsBackground } from '@/components/FloatingPathsBackground';

/* =======================
   TYPES
======================= */

interface Article {
  'Article Title': string;
  'Article Content': string;
  'wp_category': string;
  'Slug': string;
  'Meta Title': string;
  'Meta Description': string;
  'Schema Markup': string;
  'Status': string;
}

interface ArticleWithDate extends Article {
  publishDate: Date;
  index: number;
  featuredImage?: string;
  cleanedHtml?: string;
}

/* =======================
   SLUG HELPERS
======================= */

const slugify = (s: string) =>
  (s || '')
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const makeUniqueSlug = (base: string, used: Set<string>) => {
  const cleanBase = base && base.length ? base : 'post';
  let slug = cleanBase;
  let i = 2;
  while (used.has(slug)) slug = `${cleanBase}-${i++}`;
  used.add(slug);
  return slug;
};

/* =======================
   IMAGE + HTML CLEANUP
======================= */

const extractImageUrls = (html: string): string[] => {
  const out: string[] = [];
  const s = html || '';

  const srcRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = srcRe.exec(s))) out.push(m[1]);

  const urlRe = /(https?:\/\/[^\s"']+\.(?:png|jpe?g|webp|gif))(?:\?[^\s"']*)?/gi;
  while ((m = urlRe.exec(s))) out.push(m[1]);

  return Array.from(new Set(out));
};

const cleanArticleHtml = (html: string) => {
  let h = html || '';

  // remove <strong> / <b>
  h = h.replace(/<\/?(strong|b)\b[^>]*>/gi, '');

  // strip inline styles
  h = h.replace(/\sstyle=["'][^"']*["']/gi, '');

  // remove width/height attrs on images
  h = h.replace(/\s(width|height)=["'][^"']*["']/gi, '');

  return h;
};

// If CSV content is mostly plain text / line breaks (no <p> tags), wrap into paragraphs
// so spacing + typography styles apply consistently.
const ensureParagraphs = (html: string) => {
  let h = (html || '').trim();
  if (!h) return '';

  // If it already has block-level structure, leave it alone.
  const hasBlocks =
    /<\s*p\b/i.test(h) ||
    /<\s*h[1-6]\b/i.test(h) ||
    /<\s*(ul|ol|table|blockquote|pre)\b/i.test(h);
  if (hasBlocks) return h;

  // Split into paragraphs based on double <br> or blank lines.
  const brSplit = h.split(/<br\s*\/?>\s*<br\s*\/?>/i).map((s) => s.trim()).filter(Boolean);
  if (brSplit.length > 1) {
    return brSplit
      .map((p) => `<p>${p.replace(/\n/g, '<br />')}</p>`)
      .join('');
  }

  const nlSplit = h.split(/\n\s*\n+/).map((s) => s.trim()).filter(Boolean);
  if (nlSplit.length > 1) {
    return nlSplit
      .map((p) => `<p>${p.replace(/\n/g, '<br />')}</p>`)
      .join('');
  }

  // Fallback: single paragraph, preserve single newlines as <br />.
  return `<p>${h.replace(/\n/g, '<br />')}</p>`;
};

/* =======================
   CTA BANNER INJECTION
======================= */

const splitHtmlAfterFirstH2Section = (html: string): [string, string] => {
  if (!html) return ['', ''];

  // Strategy 1: split before the 2nd heading after the 1st h2
  const firstH2Match = html.match(/<h2[\s>]/i);
  if (firstH2Match && firstH2Match.index !== undefined) {
    const afterFirstH2 = html.slice(firstH2Match.index + firstH2Match[0].length);
    const nextHeadingMatch = afterFirstH2.match(/<h[23][\s>]/i);
    if (nextHeadingMatch && nextHeadingMatch.index !== undefined) {
      const splitPoint = firstH2Match.index + firstH2Match[0].length + nextHeadingMatch.index;
      return [html.slice(0, splitPoint), html.slice(splitPoint)];
    }
  }

  // Strategy 2: fallback — split after the 3rd closing </p> tag
  let count = 0;
  let pos = 0;
  while (pos < html.length && count < 3) {
    const idx = html.indexOf('</p>', pos);
    if (idx === -1) break;
    pos = idx + 4;
    count++;
  }
  if (count >= 3 && pos < html.length) {
    return [html.slice(0, pos), html.slice(pos)];
  }

  return [html, ''];
};

function BlogCtaBanner({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="my-10 rounded-3xl overflow-hidden border border-gray-200 bg-gradient-to-r from-slate-900 to-slate-900/80 shadow-2xl relative">
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
      <div className="px-6 py-6 md:px-10 md:py-7 flex flex-col md:flex-row items-center gap-8">
        {/* Icon */}
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-600 mb-1.5">
            Free Consultation
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-1.5">
            Ready to Start Your Invisalign Journey?
          </h3>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">
            Get matched with a specialist provider near you. No obligation, no cost.
          </p>
        </div>
        {/* CTA */}
        <div className="flex-shrink-0">
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-400/30 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Book Free Consultation
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================
   PAGE
======================= */

export default function ArticlePage() {
  const params = useParams();
  const rawSlug = params?.slug as string | string[] | undefined;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const [article, setArticle] = useState<ArticleWithDate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* Scroll */
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setShowScrollTop(h > 0 && window.scrollY / h > 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /* Load article */
  useEffect(() => {
    if (!slug) return;

    fetch('/articles.csv')
      .then((r) => r.text())
      .then((csvText) => {
        Papa.parse<Article>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const startDate = new Date('2026-02-10T00:00:00');
            const articlesPerDay = 3;
            const usedSlugs = new Set<string>();

            const all: ArticleWithDate[] = (results.data || [])
              .filter((a) => a?.['Article Title'])
              .map((a, index) => {
                const publishDate = new Date(startDate);
                publishDate.setDate(
                  publishDate.getDate() + Math.floor(index / articlesPerDay)
                );

                const uniqueSlug = makeUniqueSlug(
                  (a['Slug'] || '').trim() || slugify(a['Article Title']),
                  usedSlugs
                );

                const images = extractImageUrls(a['Article Content']);
                const featuredImage =
                  images.length > 0 ? images[0] : undefined;

                return {
                  ...a,
                  Slug: uniqueSlug,
                  publishDate,
                  index,
                  featuredImage,
                  cleanedHtml: ensureParagraphs(cleanArticleHtml(a['Article Content'])),
                };
              });

            // NOTE: We do not gate article visibility by publishDate on the article page.
            const found = all.find((a) => a.Slug === slug) || null;

            setArticle(found);
          },
        });
      });
  }, [slug]);

  if (!article) {
    return (
      <div className="relative min-h-screen bg-[#f6fbff] text-gray-900">
        <Header onOpenModal={() => setIsModalOpen(true)} />
        {/* Dark brand band keeps the translucent navbar legible over the light page bg */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-600 via-brand-500 to-[#f6fbff]" />
        <div className="relative pt-36 px-6 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Article not found</h1>
          <Link href="/blog" className="text-brand-600 underline mt-6 inline-block">
            Back to blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="relative min-h-screen bg-[#f6fbff] text-gray-900">
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Dark brand band keeps the translucent navbar legible over the light page bg */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-600 via-brand-500 to-[#f6fbff]" />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/5 border border-gray-200"
        >
          <ChevronUp />
        </button>
      )}

      <FloatingPathsBackground position={1} className="px-6 pb-20 pt-36">
      <div className="max-w-5xl mx-auto">
        <Link href="/blog" className="text-cyan-800 hover:text-cyan-600 transition-colors text-sm font-bold">
          ← Back to blog
        </Link>

        <div className="mt-10 overflow-hidden border border-slate-200 bg-white/92 shadow-2xl shadow-slate-950/8 backdrop-blur">
          <div className="relative h-[420px] md:h-[520px]">
            {article.featuredImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.featuredImage}
                alt={article['Article Title']}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-sm text-gray-600">
                {article.publishDate.toDateString()}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {article['Article Title']}
              </h1>
            </div>
          </div>

          {(() => {
            const articleClasses = [
              'p-10 max-w-none',
              '[&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-gray-900 [&_h1]:mt-10 [&_h1]:mb-5',
              '[&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4',
              '[&_h3]:text-2xl [&_h3]:md:text-3xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3',
              '[&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-gray-900 [&_h4]:mt-7 [&_h4]:mb-3',
              '[&_p]:text-gray-600 [&_p]:font-medium [&_p]:leading-relaxed [&_p]:mb-5',
              '[&_a]:text-brand-600 [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-400',
              '[&_ul]:my-6 [&_ul]:pl-7 [&_ul]:list-disc [&_ul]:list-outside [&_ul]:space-y-3 [&_ul]:text-gray-600 [&_ul]:font-medium',
              '[&_ol]:my-6 [&_ol]:pl-7 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:space-y-3 [&_ol]:text-gray-600 [&_ol]:font-medium',
              '[&_li]:leading-relaxed [&_li]:pl-1 [&_li]:marker:text-brand-600',
              '[&_blockquote]:my-8 [&_blockquote]:rounded-3xl [&_blockquote]:border [&_blockquote]:border-cyan-100 [&_blockquote]:bg-cyan-50/70 [&_blockquote]:p-6 [&_blockquote]:text-gray-900 [&_blockquote]:font-medium',
              '[&_blockquote_p]:mb-0',
              '[&_hr]:my-10 [&_hr]:border-gray-200',
              '[&_img]:w-full [&_img]:h-auto [&_img]:rounded-3xl [&_img]:border [&_img]:border-gray-200 [&_img]:shadow-2xl [&_img]:my-8',
              '[&_table]:w-full [&_table]:my-10 [&_table]:overflow-hidden [&_table]:rounded-3xl [&_table]:border [&_table]:border-gray-200 [&_table]:bg-white/5 [&_table]:shadow-2xl',
              '[&_thead]:bg-gray-100',
              '[&_th]:text-left [&_th]:px-5 [&_th]:py-4 [&_th]:text-gray-900 [&_th]:text-sm [&_th]:font-bold [&_th]:tracking-wide',
              '[&_td]:px-5 [&_td]:py-4 [&_td]:text-gray-900 [&_td]:text-sm [&_td]:font-medium [&_td]:border-t [&_td]:border-gray-200',
              'hover:[&_tbody_tr]:bg-white/5',
              '[&_code]:px-2 [&_code]:py-1 [&_code]:rounded-lg [&_code]:bg-gray-100 [&_code]:text-gray-700 [&_code]:text-[0.95em]',
              '[&_pre]:my-8 [&_pre]:p-6 [&_pre]:rounded-3xl [&_pre]:bg-white/5 [&_pre]:border [&_pre]:border-gray-200 [&_pre]:overflow-x-auto',
            ].join(' ');

            const [htmlBefore, htmlAfter] = splitHtmlAfterFirstH2Section(article.cleanedHtml || '');

            return htmlAfter ? (
              <>
                <div className={articleClasses} dangerouslySetInnerHTML={{ __html: htmlBefore }} />
                <div className="px-10 pb-2">
                  <BlogCtaBanner onOpenModal={() => setIsModalOpen(true)} />
                </div>
                <div className={articleClasses} dangerouslySetInnerHTML={{ __html: htmlAfter }} />
              </>
            ) : (
              <div className={articleClasses} dangerouslySetInnerHTML={{ __html: article.cleanedHtml || '' }} />
            );
          })()}
        </div>

        <div className="mt-10">
          <BlogCtaBanner onOpenModal={() => setIsModalOpen(true)} />
        </div>
      </div>
      </FloatingPathsBackground>

      <Footer />
    </div>
  );
}
