const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="relative hidden items-center justify-center overflow-hidden bg-base-200 p-12 lg:flex">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 animate-float-slow rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 size-96 animate-float-slower rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="animate-rise-in relative max-w-md text-center">
        {/* Floating mock chat cards */}
        <div className="relative mx-auto mb-10 h-44 w-72">
          <div className="glass-panel absolute left-0 top-6 w-56 rounded-2xl rounded-bl-md border border-base-content/10 p-4 text-left shadow-xl">
            <p className="text-sm">Hey! Welcome aboard 🎉</p>
            <span className="mt-2 block text-[10px] font-medium text-base-content/40">Ava · 09:41</span>
          </div>
          <div className="absolute right-0 top-16 w-52 rounded-2xl rounded-br-md border border-base-content/10 bg-gradient-to-br from-primary via-sky-400 to-secondary p-4 text-left text-white shadow-xl shadow-primary/25">
            <p className="text-sm">Thanks! Excited to be here ✨</p>
            <span className="mt-2 block text-[10px] font-medium text-white/70">You · 09:42</span>
          </div>
          <div className="glass-panel absolute bottom-0 left-10 w-44 rounded-full border border-base-content/10 px-4 py-2.5 text-left shadow-lg">
            <p className="text-xs font-medium text-base-content/60">💬 Messages sync in realtime</p>
          </div>
        </div>

        <h2 className="mb-3 bg-gradient-to-r from-primary via-sky-400 to-secondary bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          {title}
        </h2>
        <p className="leading-relaxed text-base-content/60">{subtitle}</p>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-base-content/40">
          <span className="size-2 rounded-full bg-success" />
          <span>Trusted by teams worldwide</span>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
