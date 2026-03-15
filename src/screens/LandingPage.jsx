import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NextSection from '../components/NextSection';
import Footer from '../components/Footer';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

/* ── Animation presets ── */
const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease, delay },
});

/* ── Image sequence ── */
const FRAME_COUNT = 290;
const frameSrc = (i) =>
  `/bmw-images/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;

export default function LandingPage() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const canvasBoxRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const overlay1Ref = useRef(null);
  const overlay2Ref = useRef(null);
  const [loaded, setLoaded] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const lenis = useLenis();

  /* ── Smooth Scroll Helper ── */
  const smoothScrollTo = (e, id) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  /* ── 1 · Preload ── */
  useEffect(() => {
    let count = 0;
    const imgs = [];
    (async () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = frameSrc(i);
        await new Promise((r) => {
          img.onload = () => { count++; setLoaded(count); r(); };
          img.onerror = r;
        });
        imgs.push(img);
      }
      imagesRef.current = imgs;
      paint(0);
    })();
  }, []);

  /* ── 2 · Paint (object-cover + DPR) ── */
  const paint = (idx) => {
    const cvs = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!cvs || !img) return;
    const ctx = cvs.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const { width: cw, height: ch } = cvs.getBoundingClientRect();
    if (!cw || !ch) return;
    const pw = Math.round(cw * dpr), ph = Math.round(ch * dpr);
    if (cvs.width !== pw || cvs.height !== ph) { cvs.width = pw; cvs.height = ph; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const ir = img.width / img.height, cr = cw / ch;
    let dw, dh, ox, oy;
    if (cr > ir) { dw = cw; dh = cw / ir; ox = 0; oy = (ch - dh) / 2; }
    else { dh = ch; dw = ch * ir; ox = (cw - dw) / 2; oy = 0; }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, dw, dh);
  };

  /* ── 3 · GSAP ScrollTrigger ── */
  useEffect(() => {
    const seq = { frame: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Increased scroll end to give enough room for scrubbing frames + overlays
          scrub: 0.6,
          pin: true,
        },
      });

      tl.to(textRef.current, {
        y: -100, opacity: 0,
        ease: 'power3.inOut', duration: 0.4,
      }, 0);

      tl.to(canvasBoxRef.current, {
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh',
        bottom: '0vh',
        borderRadius: '0px',
        borderWidth: '0px',
        ease: 'power3.inOut', duration: 0.6,
      }, 0);

      // Scrub through frames linearly
      tl.to(seq, {
        frame: FRAME_COUNT - 1,
        snap: 'frame', ease: 'none', duration: 3, // Base duration for mapping
        onUpdate: () => paint(Math.round(seq.frame)),
      }, 0);

      // --- OVERLAY 1 ("Skip the grunt work.") ---
      // Fade in around frame 60
      tl.to(overlay1Ref.current, { opacity: 1, y: -30, duration: 0.3 }, (3 * (60 / FRAME_COUNT)));
      // Fade out around frame 130
      tl.to(overlay1Ref.current, { opacity: 0, y: -60, duration: 0.3 }, (3 * (130 / FRAME_COUNT)));

      // --- OVERLAY 2 ("Just ask.") ---
      // Fade in around frame 160
      tl.to(overlay2Ref.current, { opacity: 1, y: -30, duration: 0.3 }, (3 * (160 / FRAME_COUNT)));
      // Fade out around frame 240
      tl.to(overlay2Ref.current, { opacity: 0, y: -60, duration: 0.3 }, (3 * (240 / FRAME_COUNT)));

    }, sectionRef);

    const onResize = () => {
      if (imagesRef.current.length) paint(Math.round(seq.frame || 0));
    };
    window.addEventListener('resize', onResize);
    return () => { ctx.revert(); window.removeEventListener('resize', onResize); };
  }, []);

  /* ── 4 · Active Section Observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const pct = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <>
      {/* ─────────── NAVBAR ─────────── */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 h-24 flex items-center justify-center bg-black/40 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      >
        <div className="w-full max-w-[98vw] flex justify-between items-center px-4 sm:px-8">
          <button onClick={(e) => smoothScrollTo(e, 'hero')} className="text-white font-[Outfit] font-extrabold text-3xl tracking-tighter cursor-pointer bg-transparent border-none">
            Drive<span className="text-blue-500">Now.</span>
          </button>

          <ul className="hidden md:flex items-center gap-12 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md">
            {['Vehicles', 'Locations', 'Experience'].map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;
              return (
                <li key={link} className="relative">
                  <button 
                    onClick={(e) => smoothScrollTo(e, id)} 
                    className={`text-sm font-medium transition-all duration-300 uppercase tracking-wider bg-transparent border-none cursor-pointer ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    {link}
                  </button>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <button 
              onClick={() => window.location.href = '/login'} 
              className="nav-cta text-white px-7 py-3 rounded-full text-sm font-bold tracking-wide uppercase cursor-pointer"
          >
              Rent Now
          </button>
        </div>
      </motion.nav>

      {/* ─────────── HERO SECTION ─────────── */}
      <section id="hero" ref={sectionRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">

        {/* TEXT CONTAINER */}
        <div ref={textRef} className="relative w-full flex flex-col items-center justify-start mt-[18vh] px-4 z-20">

          <motion.div {...fadeUp(0.15)} className="flex items-center gap-2 px-6 py-2.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            The Future of Car Rentals
          </motion.div>

          <motion.h1 {...fadeUp(0.3)} className="text-5xl sm:text-7xl md:text-[6.5rem] font-extrabold tracking-tighter mb-4 text-center leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-100 to-gray-500 pr-2 -mr-2">Drive</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-blue-600">Now.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.45)} className="text-base md:text-lg text-gray-400 max-w-2xl text-center mb-8 px-4 leading-relaxed">
            Experience cinematic performance. One tap to book luxury, sport, and exotic cars delivered instantly to your door.
          </motion.p>
        </div>

        {/* CANVAS CONTAINER (Perfect Centering) */}
        <motion.div
          ref={canvasBoxRef}
          className="absolute bottom-[4vh] left-0 right-0 mx-auto w-[90vw] max-w-5xl h-[40vh] rounded-3xl overflow-hidden z-10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8),_inset_0_-40px_80px_rgba(0,0,0,0.5)]" />

          {loaded < FRAME_COUNT && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-md">
              <span className="text-white/40 text-xs font-bold mb-3 tracking-widest uppercase">Loading Assets</span>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}

          {/* ─────────── CANVAS TEXT OVERLAYS ─────────── */}
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center text-center">
            
            {/* Overlay 1 */}
            <div ref={overlay1Ref} className="absolute bottom-10 right-10 flex flex-col items-end text-right opacity-0 translate-y-10 pr-4 sm:pr-8">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                Skip the grunt work.
              </h2>
              <p className="text-base md:text-xl text-gray-400 max-w-lg font-medium">
                No rental counters, no endless paperwork. Just drop a pin and we hand you the keys.
              </p>
            </div>

            {/* Overlay 2 */}
            <div ref={overlay2Ref} className="absolute bottom-10 left-10 flex flex-col items-start text-left opacity-0 translate-y-10 pl-4 sm:pl-8">
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                Just ask.
              </h2>
              
              {/* Fake UI Mockup */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col items-start min-w-[320px] max-w-md w-full mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-300">"Deliver an M4 GT3 to my hotel at 8 AM"</span>
                </div>
                
                <div className="w-full h-px bg-white/10 mb-4"></div>
                
                <div className="flex items-center gap-2 text-green-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-bold tracking-wide">Processed instantly</span>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>

      </section>

      <NextSection />
      
      {/* ─────────── NEW SECTIONS ─────────── */}
      <section id="vehicles" className="relative w-full min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#0A0A0A] flex flex-col pt-32 px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">Our Premium Fleet</h2>
          <p className="text-gray-400 max-w-xl text-lg mb-16">Select from our perfectly maintained collection of high-performance vehicles, delivered right to your door.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Elite SUV Collection',
                image: '/suvs.png',
                desc: 'Uncompromising power meets versatile luxury for every terrain.'
              },
              {
                name: 'Precision Sports',
                image: '/sportcars.png',
                desc: 'Aerodynamic excellence designed for pure driving engagement.'
              },
              {
                name: 'Ultimate Supercars',
                image: '/supercars.png',
                desc: 'The pinnacle of automotive engineering and raw performance.'
              }
            ].map((vehicle, i) => (
              <div key={i} className="group relative bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                <div className="h-64 overflow-hidden relative">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{vehicle.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{vehicle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="relative w-full min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#050505] flex flex-col pt-32 px-8">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-center">Global Coverage</h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto text-lg mb-16">Expanding our luxury network to cinematic destinations worldwide.</p>
          
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[40px] border border-white/10 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] group">
            <img 
              src="/map.png" 
              alt="DriveNow Service Map" 
              className="w-full h-full object-cover" 
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            {/* Bottom Glass Panel */}
            <div className="absolute bottom-8 left-12 right-12 py-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl flex justify-center items-center gap-16 md:gap-32">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white">24</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Major Cities</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-blue-500">100%</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Digital Check-in</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white">60m</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Delivery Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="relative w-full min-h-screen bg-gradient-to-b from-[#050505] to-[#0A0A0A] flex flex-col pt-32 px-8">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-10 pb-32">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-center">The DriveNow Experience</h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto text-lg mb-16">Elevating every mile with premium services designed around your lifestyle.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Instant Delivery',
                desc: 'Get your performance car delivered in under 60 minutes, wherever you are.',
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Digital Key',
                desc: 'Unlock and start your vehicle directly from our mobile app. No physical keys needed.',
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                )
              },
              {
                title: 'Concierge Support',
                desc: '24/7 dedicated assistance for your journey, from route planning to roadside aid.',
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-md flex flex-col hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}