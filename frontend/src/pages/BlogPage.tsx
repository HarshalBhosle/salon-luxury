import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../components/ui/PageHeader'
import { Blog } from '../components/sections/Blog'
import { BLOG_POSTS } from '../constants/blog'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import { Reveal } from '../components/animations/Reveal'

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Beauty Blog | Maison Aurelle</title>
        <meta name="description" content="Expert tips, seasonal trends and care rituals from our artists." />
      </Helmet>
      <PageHeader title="The" accent="Beauty Journal" description="Expert tips, seasonal trends and care rituals from our artists." tag="Blog" />

      <div className="section-container py-16 sm:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-3xl overflow-hidden border border-primary/5 bg-white/70 shadow-elegant hover:shadow-elegant-hover hover:-translate-y-1 transition-all duration-500 h-full"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-primary-light to-primary group-hover:scale-105 transition-transform duration-700" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-secondary tracking-widest uppercase">{post.category}</span>
                    <span className="text-xs text-primary/50 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime} min
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-primary mb-3 group-hover:text-secondary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-primary/60 mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-primary/50 border-t border-primary/5 pt-3">
                    <span>{post.author} · {formatDate(post.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  )
}