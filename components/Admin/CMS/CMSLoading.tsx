export default function CMSLoading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617]">
      
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-sky-900/10 to-transparent" />

      {/* Floating dots */}
      <div className="absolute inset-0 animate-pulse opacity-30">
        <div className="absolute top-1/4 left-1/3 h-2 w-2 rounded-full bg-sky-400" />
        <div className="absolute top-1/2 right-1/4 h-1.5 w-1.5 rounded-full bg-indigo-400" />
        <div className="absolute bottom-1/3 left-1/4 h-2 w-2 rounded-full bg-sky-300" />
      </div>

      {/* Main Loader */}
      <div className="relative flex flex-col items-center gap-6">
        
        {/* Pulse Rings */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-40 w-40 animate-ping rounded-full border border-sky-400/30" />
          <div className="absolute h-28 w-28 animate-ping rounded-full border border-indigo-400/40 delay-300" />
          
          {/* Core */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-xl shadow-sky-500/30">
            <span className="text-xl font-bold text-white">AI</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold tracking-wide text-gray-200">
            Loading Experience
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Preparing something amazing for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-loading-bar rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
