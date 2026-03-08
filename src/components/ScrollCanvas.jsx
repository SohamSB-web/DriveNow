import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 348;
const padIndex = (i) => String(i).padStart(5, '0');
const frameSrc = (i) => `/bmw-images/Sequence ${padIndex(i + 1000)}.jpg`;

export default function ScrollCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef({ value: 0 });
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  /* Draw a specific frame on canvas */
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    /* Maintain aspect ratio, cover the canvas */
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* Resize canvas to viewport */
  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(frameIndexRef.current.value));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  /* Preload images */
  useEffect(() => {
    let loaded = 0;
    const images = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          setIsLoaded(true);
          drawFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame]);

  /* GSAP ScrollTrigger — scrub through frames */
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      /* Animate frame index */
      gsap.to(frameIndexRef.current, {
        value: FRAME_COUNT - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: () => {
            drawFrame(Math.round(frameIndexRef.current.value));
          },
        },
      });

      /* Pin the canvas */
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: canvasRef.current,
        pinSpacing: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, drawFrame]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '350vh' }}>
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark-900">
          <div className="w-48 h-1 rounded-full bg-dark-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent-blue transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="mt-3 text-xs text-gray-500 tracking-widest uppercase font-medium">
            Loading {loadProgress}%
          </span>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-screen h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
