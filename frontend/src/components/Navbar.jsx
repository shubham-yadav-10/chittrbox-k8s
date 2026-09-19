import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, Sparkles, UserRound } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 z-40 w-full border-b border-base-content/10 bg-base-100/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-sky-400 to-secondary shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <Sparkles className="size-5 text-white" />
          </div>
          <div className="leading-tight">
            <h1 className="text-lg font-extrabold tracking-tight">
              Chittrbox<span className="brand-gradient-text">.</span>
            </h1>
            <p className="hidden text-[11px] font-medium text-base-content/50 sm:block">
              Realtime messaging
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {authUser && (
            <div className="mr-1 hidden items-center gap-2.5 rounded-full border border-base-content/10 bg-base-200/60 py-1 pl-1 pr-3 md:flex">
              <div className="relative">
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt={authUser.fullName}
                  className="size-7 rounded-full object-cover ring-2 ring-primary/40"
                />
              </div>
              <span className="text-sm font-semibold">{authUser.fullName}</span>
            </div>
          )}

          <Link
            to="/settings"
            className="btn btn-ghost btn-sm gap-2 rounded-xl text-base-content/70 hover:text-base-content"
          >
            <Settings className="size-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="btn btn-ghost btn-sm gap-2 rounded-xl text-base-content/70 hover:text-base-content"
              >
                <UserRound className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="btn btn-sm gap-2 rounded-xl border border-error/30 bg-error/10 text-error hover:border-error/50 hover:bg-error/20"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
