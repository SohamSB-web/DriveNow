export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0A0A0A] to-[#050505] text-white relative overflow-hidden">
      {/* ─────────── GLOWING CTA HALF ─────────── */}
      <div className="relative w-full max-w-[98vw] mx-auto px-4 sm:px-8 pt-32 pb-24 flex flex-col items-center justify-center text-center">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none"></div>

        <span className="text-blue-500 font-bold tracking-[0.2em] text-xs uppercase mb-6 z-10">
          Join the Revolution
        </span>
        
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-10 z-10 max-w-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Ready to experience the future of driving?
        </h2>

        {/* Glowing Pill Button */}
        <button className="relative group z-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
          <div className="relative px-10 py-5 bg-black rounded-full border border-white/10 flex items-center gap-3 hover:bg-[#0A0A0A] transition-colors">
            <span className="text-sm font-bold tracking-wider uppercase">Get Early Access</span>
            <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* ─────────── GRID HALF ─────────── */}
      <div className="max-w-[98vw] mx-auto px-4 sm:px-8 py-20 w-[98vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 justify-between">
          
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col items-start">
            <a href="/" className="font-[Outfit] font-extrabold text-3xl tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Drive<span className="text-blue-500 bg-none -ml-0.5">Now.</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Experience cinematic performance. One tap to book luxury, sport, and exotic cars delivered instantly to your door.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="flex flex-col items-start">
            <h4 className="text-white font-bold tracking-wider text-sm uppercase mb-6">Product</h4>
            <ul className="flex flex-col gap-4">
              {['Features', 'Pricing', 'Fleet', 'How it Works'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col items-start">
            <h4 className="text-white font-bold tracking-wider text-sm uppercase mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col items-start">
            <h4 className="text-white font-bold tracking-wider text-sm uppercase mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest fleet additions and exclusive offers.
            </p>
            <form className="w-full relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1.5 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ─────────── BOTTOM BAR ─────────── */}
      <div className="w-full border-t border-white/10 bg-black/20">
        <div className="max-w-[98vw] w-[98vw] mx-auto px-4 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DriveNow Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
