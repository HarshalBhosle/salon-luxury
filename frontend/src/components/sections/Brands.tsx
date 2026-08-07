import { BRANDS } from '../../constants/site'

export function Brands() {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <p className="text-center text-primary/40 font-heading text-xs uppercase tracking-[0.3em] mb-10">
        World-class partners we trust
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={i}
              className="mx-8 px-6 py-3 font-display text-2xl text-primary/40 hover:text-secondary grayscale hover:grayscale-0 transition-all whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}