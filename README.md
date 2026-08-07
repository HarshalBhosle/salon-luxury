# Maison Aurelle — Luxury Salon Catalogue Website (MERN Stack)

A production-ready, award-calibre luxury salon catalogue website built with the MERN stack.

## Tech Stack

### Frontend — `frontend/`
- **React 19 + Vite 8 + TypeScript**
- **Tailwind CSS v4** (design system, glassmorphism, custom animation utilities)
- **Framer Motion + GSAP + Lenis** (premium animations & smooth scrolling)
- **ShadCN-style primitives** (Button, Badge, GlassCard, Modal)
- **React Router DOM** (routing) · **React Hook Form + Zod** (validation)
- **TanStack Query** (data fetching) · **Axios** (HTTP client)
- **Lucide icons** · **react-helmet-async** (SEO)

### Backend — `backend/`
- **Node.js + Express** (REST API)
- **MongoDB + Mongoose**
- **JWT authentication** · **bcrypt** password hashing
- **Helmet, CORS, rate-limiting**, input validation
- **Nodemailer** (appointment & contact email notifications)

## Getting Started

### 1. Start MongoDB
```bash
mongod  # or start your MongoDB service
```

### 2. Backend
```bash
cd backend
npm install
npm run seed      # creates admin account + initial data
npm run dev       # runs on http://localhost:5000
```

Default admin login (from `.env`):
- Email: `admin@maisonaurelle.com`
- Password: `admin123`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev       # runs on http://localhost:5173
```

## Features

- **Home**: cinematic hero, animated statistics, brand marquee, about + timeline, why choose us (3D tilt cards), searchable/filterable service catalogue, masonry gallery with lightbox + before/after slider, salon interior hotspot showcase, stylist cards, infinite testimonial carousel, pricing + wedding packages + memberships, blog, FAQ accordion, appointment form, contact + map
- **Pages**: Home, About, Services, Gallery, Stylists, Pricing, Blog, Blog Post, Contact, Book Appointment, Admin
- **Admin Dashboard** (`/admin`): overview analytics, full CRUD for services, stylists, gallery, testimonials, FAQs, blog posts, appointment management, contact messages
- **UX**: glass navbar with mega menu, custom cursor, magnetic buttons, scroll progress, WhatsApp FAB, toast notifications, skeleton loading, light/dark mode, reduced-motion support
- **SEO**: meta/OG/Twitter tags, canonical URLs, JSON-LD (BeautySalon schema), robots.txt, sitemap.xml

## Scripts

| Script | Description |
|---|---|
| `frontend: npm run dev` | Start Vite dev server |
| `frontend: npm run build` | Production build |
| `backend: npm run dev` | Start API with nodemon |
| `backend: npm run seed` | Seed database with initial data |
