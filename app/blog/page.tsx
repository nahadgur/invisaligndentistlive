'use client';

import { useState, useMemo, useEffect } from 'react';
import Papa from 'papaparse';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { LeadFormModal } from '@/components/LeadFormModal';
import { FloatingPathsBackground } from '@/components/FloatingPathsBackground';

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
}

const slugify = (s: string) =>
  (s || '').toLowerCase().trim().replace(/['"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const makeUniqueSlug = (base: string, used: Set<string>) => {
  const cleanBase = base && base.length ? base : 'post';
  let slug = cleanBase;
  let i = 2;
  while (used.has(slug)) slug = `${cleanBase}-${i++}`;
  used.add(slug);
  return slug;
};

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

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogPage, setBlogPage] = useState(1);
  const [articles, setArticles] = useState<ArticleWithDate[]>([]);
  const postsPerPage = 6;

  useEffect(() => {
    let cancelled = false;
    fetch('/articles.csv')
      .then(r => r.text())
      .then(csvText => {
        Papa.parse<Article>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const startDate = new Date('2026-02-10T00:00:00');
            const articlesPerDay = 3;
            const usedSlugs = new Set<string>();
            const articlesWithDates: ArticleWithDate[] = (results.data || [])
              .filter((a: Article) => a && a['Article Title'] && a['Article Title'].trim())
              .map((a: Article, index: number) => {
                const dayOffset = Math.floor(index / articlesPerDay);
                const publishDate = new Date(startDate);
                publishDate.setDate(publishDate.getDate() + dayOffset);
                const baseSlug = (a['Slug'] || '').trim() || slugify(a['Article Title']);
                const uniqueSlug = makeUniqueSlug(baseSlug, usedSlugs);
                const imgs = extractImageUrls(a['Article Content'] || '');
                const featuredImage = imgs.length ? imgs[imgs.length - 1] : undefined;
                return { ...a, Slug: uniqueSlug, publishDate, index, featuredImage };
              });
            if (!cancelled) setArticles(articlesWithDates);
          },
        });
      })
      .catch(() => { if (!cancelled) setArticles([]); });
    return () => { cancelled = true; };
  }, []);

  const publishedArticles = useMemo(() => {
    const today = new Date();
    return articles.filter(a => a.publishDate <= today);
  }, [articles]);

  const filteredPosts = useMemo(() => {
    if (!blogSearchQuery) return publishedArticles;
    const q = blogSearchQuery.toLowerCase().trim();
    return publishedArticles.filter(post => (post['Article Title'] || '').toLowerCase().includes(q));
  }, [blogSearchQuery, publishedArticles]);

  const paginatedPosts = useMemo(() => {
    const start = (blogPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, blogPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const getExcerpt = (content: string, length = 120) => {
    const text = (content || '').replace(/<[^>]*>/g, '');
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">
        <Hero
          title="Invisalign Insights"
          subtitle="Expert clinical advice, pricing updates, and patient success stories from our network of Platinum providers."
          image="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2000&auto=format&fit=crop"
          showCta={false}
          showTrust={false}
        />

        <FloatingPathsBackground position={1} className="bg-[#f6fbff] py-16 md:py-20">
          <div className="container-width">
            {/* Search */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles by topic..."
                  value={blogSearchQuery}
                  onChange={(e) => { setBlogSearchQuery(e.target.value); setBlogPage(1); }}
                  className="w-full border border-slate-200 bg-white/90 py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm backdrop-blur transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Article Grid — Garden Rooms editorial card pattern */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map(post => (
                <article key={post.Slug} className="group flex flex-col overflow-hidden border border-slate-200 bg-white/90 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-xl hover:shadow-slate-950/8">
                  <Link href={`/blog/${post.Slug}/`} className="block h-48 overflow-hidden relative bg-gray-100">
                    {post.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.featuredImage} alt={post['Article Title']} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand-50">
                        <span className="text-4xl opacity-30">📝</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur">
                      {post.wp_category}
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <Link href={`/blog/${post.Slug}/`}>
                      <h2 className="text-xl font-display font-medium text-slate-900 mb-2 group-hover:text-cyan-800 transition-colors">{post['Article Title']}</h2>
                    </Link>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">{getExcerpt(post['Article Content'])}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <Link href={`/blog/${post.Slug}/`} className="text-cyan-800 font-bold text-sm flex items-center hover:underline">
                        Read article <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                      <span className="text-xs text-gray-400">
                        {post.publishDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center text-gray-500 py-12">No articles found.</div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-12">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => { setBlogPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                      blogPage === page ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </FloatingPathsBackground>
      </main>
      <Footer />
    </>
  );
}
