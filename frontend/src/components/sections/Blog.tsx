import { Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '../../constants/blog'
import { SectionHeader } from '../ui/SectionHeader'

export function Blog() {
  const [featured, ...rest] = BLOG_POSTS

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <section id="blog" className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-accent-muted/50">
      <div className="section-container">
        <SectionHeader
          tag="The Journal"
          title="Beauty,"
          accent="Informed"
          description="Expert tips, seasonal trends and care rituals from our artists."
        />

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Featured */}
          <Link
            to={`/blog/${featured.slug}`}
            className="group relative rounded-3xl overflow-hidden min-h-[420px] block hover:-translate-y-1 transition-transform duration-500"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img src={featured.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            </div>
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-secondary text-primary text-[10px] font-bold uppercase tracking-wider">
              Featured
            </div>
            <div className="absolute bottom-0 p-8 text-white">
              <span className="text-xs text-secondary uppercase tracking-widest">{featured.category}</span>
              <h3 className="font-display text-2xl sm:text-3xl mt-2 mb-3 leading-tight">{featured.title}</h3>
              <p className="text-white/70 text-sm mb-4 max-w-md">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-white/60">
                <span>{featured.author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime} min</span>
                <span>{formatDate(featured.publishedAt)}</span>
              </div>
            </div>
          </Link>

          {/* Secondary grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {rest.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group rounded-3xl overflow-hidden border border-primary/5 bg-white/70 shadow-elegant hover:shadow-elegant-hover hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs text-secondary tracking-widest uppercase mb-2">{post.category}</span>
                  <h3 className="font-display text-lg text-primary mb-3 group-hover:text-secondary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between text-xs text-primary/50 pt-3">
                    <span>{post.readTime} min read</span>
                    <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}