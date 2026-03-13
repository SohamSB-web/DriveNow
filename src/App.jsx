import { useEffect, useRef } from 'react';
import LandingPage from './screens/LandingPage';
import Login from './screens/Login';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';

export default function App() {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  });

  const path = window.location.pathname;

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      {path === '/login' ? <Login /> : <LandingPage />}
    </ReactLenis>
  );
}
