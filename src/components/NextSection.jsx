import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NextSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll('[data-animate]');

      gsap.set(els, { y: 60, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center bg-black overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-[100%] bg-blue-900/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <span
          data-animate
          className="mb-6 px-5 py-2 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-white/80 border border-white/10 bg-white/[0.03] backdrop-blur-md select-none"
        >
          Why DriveNow
        </span>

        <h2
          data-animate
          className="font-display text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-[800] tracking-tight leading-[1] max-w-4xl"
        >
          <span className="text-white">Premium. </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #60A5FA 0%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Effortless.
          </span>
        </h2>

        <p
          data-animate
          className="mt-6 max-w-2xl text-[15px] sm:text-base md:text-lg text-white/50 leading-[1.8] font-normal tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          From high-performance sport cars to elegant luxury sedans — browse, book, and drive in under a minute.
        </p>

        <div data-animate className="mt-14 flex flex-wrap justify-center gap-10 sm:gap-16 text-sm text-white/50">
          {[
            { stat: '200+', label: 'Premium Cars' },
            { stat: '50+', label: 'Cities' },
            { stat: '4.9★', label: 'User Rating' },
          ].map(({ stat, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">{stat}</span>
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white/40">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
