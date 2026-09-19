import { Phone, Video, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="border-b border-base-content/10 bg-base-100/60 px-4 backdrop-blur-sm">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-11 rounded-full object-cover ring-2 ring-base-content/10"
            />
            {isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-success ring-2 ring-base-100" />
            )}
          </div>

          <div>
            <h3 className="font-bold leading-tight tracking-tight">
              {selectedUser.fullName}
            </h3>
            <p
              className={`flex items-center gap-1.5 text-xs font-medium ${
                isOnline ? "text-success" : "text-base-content/50"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  isOnline ? "animate-pulse bg-success" : "bg-base-content/30"
                }`}
              />
              {isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-primary"
            title="Voice call (coming soon)"
          >
            <Phone className="size-[18px]" />
          </button>
          <button
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-primary"
            title="Video call (coming soon)"
          >
            <Video className="size-[18px]" />
          </button>
          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-error"
            title="Close chat"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
