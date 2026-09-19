import { useEffect, useMemo, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { MessageCircle, Search, UsersRound } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = useMemo(() => {
    let list = users;
    if (showOnlineOnly) list = list.filter((u) => onlineUsers.includes(u._id));
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (u) =>
          u.fullName?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [users, showOnlineOnly, onlineUsers, search]);

  const onlineContacts = users.filter((u) => onlineUsers.includes(u._id)).length;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex h-full w-20 flex-col border-r border-base-content/10 bg-base-100/50 backdrop-blur-sm transition-all duration-200 lg:w-80">
      {/* Header */}
      <div className="w-full border-b border-base-content/10 p-4 lg:p-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <UsersRound className="size-5" />
          </div>
          <div className="hidden min-w-0 lg:block">
            <span className="block font-bold tracking-tight">Contacts</span>
            <span className="text-xs text-base-content/50">
              {users.length} people ·{" "}
              <span className="font-semibold text-success">{onlineContacts} online</span>
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-3 hidden lg:block">
          <div className="chat-input-shell flex items-center gap-2 rounded-xl px-3 py-2">
            <Search className="size-4 shrink-0 text-base-content/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/40"
            />
          </div>
        </div>

        {/* Online filter */}
        <label className="mt-3 hidden cursor-pointer items-center gap-2.5 lg:flex">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-xs checkbox-primary"
          />
          <span className="text-xs font-medium text-base-content/60">Online only</span>
        </label>
      </div>

      {/* Contacts */}
      <div className="w-full flex-1 overflow-y-auto py-2">
        {filteredUsers.map((user, idx) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              style={{ animationDelay: `${Math.min(idx * 40, 320)}ms` }}
              className={`animate-rise-in group mx-2 mb-1 flex w-[calc(100%-1rem)] items-center gap-3 rounded-2xl p-2.5 text-left transition-all duration-200 ${
                isSelected
                  ? "contact-active"
                  : "hover:bg-base-content/5"
              }`}
            >
              <div className="relative mx-auto shrink-0 lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className={`size-12 rounded-full object-cover transition-all duration-200 ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                      : "ring-1 ring-base-content/10 group-hover:ring-primary/40"
                  }`}
                />
                {isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex size-3.5 items-center justify-center">
                    <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex size-3 rounded-full bg-success ring-2 ring-base-100" />
                  </span>
                )}
              </div>

              <div className="hidden min-w-0 flex-1 text-left lg:block">
                <div className="truncate text-sm font-semibold">{user.fullName}</div>
                <div
                  className={`flex items-center gap-1.5 text-xs ${
                    isOnline ? "text-success" : "text-base-content/45"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      isOnline ? "bg-success" : "bg-base-content/30"
                    }`}
                  />
                  {isOnline ? "Online now" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-base-content/5">
              <MessageCircle className="size-6 text-base-content/30" />
            </div>
            <p className="text-sm font-medium text-base-content/50">
              {search
                ? "No contacts match your search"
                : showOnlineOnly
                  ? "No contacts online right now"
                  : "No contacts yet — invite a friend!"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
