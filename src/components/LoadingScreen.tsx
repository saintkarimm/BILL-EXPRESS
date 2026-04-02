import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress over 2 seconds
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Start fade out animation
          setTimeout(() => {
            setFadeOut(true);
            // Complete loading after fade animation
            setTimeout(() => {
              onLoadingComplete();
            }, 500);
          }, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1D2F42] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Logo Container */}
      <div className="relative mb-8">
        {/* Animated rings */}
        <div className="absolute inset-0 -m-8">
          <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-4 border-2 border-white/20 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
        </div>
        
        {/* Logo */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-2xl animate-pulse" style={{ animationDuration: '2s' }}>
          <img
            src="/images/logo.jpeg"
            alt="Hayyu GoldCoast Logistics"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
          Welcome to
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-[#D8D8D0]">
          Hayyu GoldCoast Logistics
        </h2>
      </div>

      {/* Loading Bar */}
      <div className="w-64 sm:w-80 max-w-[80vw]">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D8D8D0] to-white rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-white/60 text-sm font-medium">Loading</span>
          <span className="text-white font-bold text-sm">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Loading dots */}
      <div className="flex items-center gap-2 mt-8">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Tagline */}
      <p className="text-white/50 text-sm mt-8 text-center max-w-md px-4">
        Global trade made simple
      </p>
    </div>
  );
}
