import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { CalendarDays, Camera, Mail, ShieldCheck, UserRound } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pb-10 pt-24">
      <div className="mx-auto max-w-2xl px-4">
        <div className="glass-panel animate-rise-in space-y-8 rounded-3xl border border-base-content/10 p-6 shadow-xl sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-tight">Profile</h1>
            <p className="mt-1 text-sm text-base-content/60">Your profile information</p>
          </div>

          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full border-4 border-base-100 object-cover shadow-xl ring-4 ring-primary/25"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-1 right-1 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary p-2.5 shadow-lg transition-transform duration-200 hover:scale-110 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="size-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/50">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Info fields */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                <UserRound className="size-3.5" />
                Full Name
              </div>
              <p className="chat-input-shell rounded-2xl px-4 py-3 text-sm font-medium">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                <Mail className="size-3.5" />
                Email Address
              </div>
              <p className="chat-input-shell rounded-2xl px-4 py-3 text-sm font-medium">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account info */}
          <div className="rounded-2xl border border-base-content/10 bg-base-content/5 p-5">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-base-content/60">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-base-content/10 py-2.5">
                <span className="flex items-center gap-2 text-base-content/60">
                  <CalendarDays className="size-4" /> Member Since
                </span>
                <span className="font-semibold">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="flex items-center gap-2 text-base-content/60">
                  <ShieldCheck className="size-4" /> Account Status
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-success">
                  <span className="size-2 rounded-full bg-success" /> Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
