import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="h-screen w-full bg-dark-900 text-white flex flex-col md:flex-row p-4 sm:p-6 overflow-hidden">

      {/* ── Left Column (Form) ── */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full mx-auto"
        >
          {/* Brand */}
          <div className="mb-8">
            <div className="text-white font-[Outfit] font-extrabold text-4xl tracking-tighter">
              Drive<span className="text-blue-500">Now.</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-header' : 'signup-header'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4 text-white">
                {isLogin ? 'Welcome Back' : 'Welcome to'}<br />
                DriveNow
              </h1>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed font-medium">
                {isLogin 
                  ? 'Log in to your account to continue your performance journey.' 
                  : 'Get behind the wheel. DriveNow is optimizing the future of high-performance car rentals.'}
              </p>
            </motion.div>
          </AnimatePresence>

          <form className="space-y-5" onSubmit={(e) => {
            e.preventDefault();
            window.location.href = '/dashboard';
          }}>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@drivenow.inc"
                className="w-full pl-11 pr-4 py-3.5 bg-dark-700/50 border border-white/10 rounded-2xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
               <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-11 pr-11 py-3.5 bg-dark-700/50 border border-white/10 rounded-2xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm"
              />
              <div 
                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg className={`h-5 w-5 ${showPassword ? 'text-blue-400' : 'text-gray-500'} hover:text-gray-300 transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {showPassword ? (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line strokeLinecap="round" strokeLinejoin="round" x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle strokeLinecap="round" strokeLinejoin="round" cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.button 
                key={isLogin ? 'login-btn' : 'signup-btn'}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                type="submit" 
                className="w-full btn-primary py-3.5 rounded-2xl text-sm font-bold tracking-wide mt-2"
              >
                {isLogin ? 'Login' : 'Sign up'}
              </motion.button>
            </AnimatePresence>

            <div className="flex items-center justify-center space-x-4 my-6 opacity-60">
              <span className="h-px w-full bg-white/10"></span>
              <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">or</span>
              <span className="h-px w-full bg-white/10"></span>
            </div>

            <AnimatePresence mode="wait">
              <motion.button 
                key={isLogin ? 'google-login' : 'google-signup'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                type="button" 
                className="w-full btn-secondary py-3.5 rounded-2xl text-sm font-bold tracking-wide flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {isLogin ? 'Login with Google' : 'Signup with Google'}
              </motion.button>
            </AnimatePresence>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-blue-500 hover:text-blue-400 transition-colors bg-transparent border-none cursor-pointer font-bold"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </motion.div>



      </div>

      {/* ── Right Column (Graphic/Image) ── */}
      <div className="hidden md:block w-1/2 relative p-4 pl-0">
        <div className="w-full h-full rounded-[40px] overflow-hidden relative">
          {/* Abstract background image from Unsplash */}
          <img
            src="/login_img.jpg"
            alt="Login background"
            className="w-full h-full object-cover object-center absolute inset-0 opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent"></div>

          <div className="relative h-full z-10 p-12 flex flex-col justify-between">
            <h2 className="text-[34px] lg:text-[44px] tracking-tight text-white/90 leading-tight font-medium max-w-lg mt-8">
              AI Revolutionizing the way we <span className="text-blue-400 font-bold">experience</span> driven speed.
            </h2>

            {/* Glassmorphic Back Button */}
            <div className="flex justify-end">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 group transition-all hover:bg-white/20 hover:border-white/30"
              >
                <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
