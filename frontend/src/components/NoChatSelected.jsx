import { MessageSquareHeart, ShieldCheck, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden bg-base-200/40 p-16">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-80 animate-float-slow rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 animate-float-slower rounded-full bg-secondary/15 blur-3xl" />

      <div className="animate-rise-in relative max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping-slow rounded-3xl bg-primary/25" />
            <div className="relative flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-sky-400 to-secondary shadow-xl shadow-primary/30">
              <MessageSquareHeart className="size-10 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Welcome to Chittrbox!</h2>
          <p className="text-base-content/60">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 pt-2 text-xs font-medium text-base-content/45">
          <span className="flex items-center gap-1.5">
            <Zap className="size-3.5 text-secondary" /> Realtime
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" /> Private
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquareHeart className="size-3.5 text-accent" /> Free
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
