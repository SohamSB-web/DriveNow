import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NextSection from '../components/NextSection';

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
  const [loaded, setLoaded] = useState(0);

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
          end: '+=150%',
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

      tl.to(seq, {
        frame: FRAME_COUNT - 1,
        snap: 'frame', ease: 'none', duration: 1,
        onUpdate: () => paint(Math.round(seq.frame)),
      }, 0);
    }, sectionRef);

    const onResize = () => {
      if (imagesRef.current.length) paint(Math.round(seq.frame || 0));
    };
    window.addEventListener('resize', onResize);
    return () => { ctx.revert(); window.removeEventListener('resize', onResize); };
  }, []);

  const pct = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <>
      {/* ─────────── NAVBAR ─────────── */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 h-24 flex items-center justify-center bg-black/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="w-full max-w-7xl flex justify-between items-center px-6 sm:px-8">
          <a href="/" className="text-white font-extrabold text-3xl tracking-tighter">
            Drive<span className="text-blue-500">Now.</span>
          </a>

          <ul className="hidden md:flex items-center gap-12">
            {['Vehicles', 'Locations', 'Pricing'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-base font-medium text-gray-300 hover:text-white transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <a href="#rent" className="bg-white text-black px-7 py-3 rounded-full text-base font-bold hover:bg-gray-200 transition-colors">
            Rent Now
          </a>
        </div>
      </motion.nav>

      {/* ─────────── HERO SECTION ─────────── */}
      <section ref={sectionRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">

        {/* TEXT CONTAINER */}
        <div ref={textRef} className="relative w-full flex flex-col items-center justify-start mt-[16vh] px-4 z-20">

          <motion.div {...fadeUp(0.15)} className="flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            The Future of Car Rentals
          </motion.div>

          <motion.h1 {...fadeUp(0.3)} className="text-6xl sm:text-8xl md:text-[8.5rem] font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 text-center leading-none">
            DriveNow.
          </motion.h1>

          <motion.p {...fadeUp(0.45)} className="text-base md:text-lg text-gray-400 max-w-2xl text-center mb-10 px-4 leading-relaxed">
            Experience cinematic performance. One tap to book luxury, sport, and exotic cars delivered instantly to your door.
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="flex items-center justify-center gap-6">
            <a href="#fleet" className="bg-white text-black px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Explore Fleet
            </a>
            <a href="#how" className="bg-transparent text-white border-2 border-white/20 px-10 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-colors">
              How it works
            </a>
          </motion.div>
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
        </motion.div>

      </section>

      <NextSection />
      <div className="h-[40vh] bg-[#050505]" />
    </>
  );
}