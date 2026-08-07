import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react'
import { BLOG_POSTS } from '../constants/blog'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/animations/Reveal'
import { AppointmentCTA } from '../components/sections/AppointmentCTA'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return (
      <>
        <Helmet><title>Post Not Found | Maison Aurelle</title></Helmet>
        <PageHeader title="Post Not" accent="Found" />
        <div className="section-container py-24 text-center">
          <p className="text-primary/60 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-gold inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Maison Aurelle</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Helmet>

      <PageHeader title={post.category} accent={post.title.split('—')[0]} tag={post.category} />

      <article className="section-container py-16 sm:py-24 max-w-3xl">
        <Reveal>
          <div className="round h-72 sm:h-96 rounded-3xl bg-gradient-to-br from-primary-light to-primary mb-8" />
          <div className="flex flex-wrap items-center gap-5 text-sm text-primary/50 mb-8">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-secondary" /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-secondary" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-secondary" /> {post.readTime} min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-primary leading-tight mb-6">{post.title}</h1>
          {post.content.split('\n').filter(Boolean).map((para, i) => (
            <p key={i} className="text-primary/70 leading-relaxed mb-5">{para}</p>
          ))}
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">#{t}</span>
            ))}
          </div>
        </Reveal>
      </article>
      <AppointmentCTA />
    </>
  )
}