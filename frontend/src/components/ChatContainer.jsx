import { useEffect, useMemo, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const groupedMessages = useMemo(() => {
    const groups = [];
    let currentDay = null;

    messages.forEach((message) => {
      const day = new Date(message.createdAt).toDateString();
      if (day !== currentDay) {
        groups.push({ type: "divider", id: `div-${day}`, label: formatDayLabel(day) });
        currentDay = day;
      }
      groups.push({ type: "message", message });
    });

    return groups;
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ChatHeader />

      <div className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
        {groupedMessages.map((item) =>
          item.type === "divider" ? (
            <div key={item.id} className="flex items-center justify-center py-3">
              <span className="rounded-full bg-base-content/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-base-content/50">
                {item.label}
              </span>
            </div>
          ) : (
            <div
              key={item.message._id}
              className={`animate-pop-in flex gap-2.5 ${
                item.message.senderId === authUser._id ? "flex-row-reverse" : ""
              }`}
            >
              <div className="mt-auto shrink-0">
                <img
                  src={
                    item.message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="size-8 rounded-full object-cover ring-1 ring-base-content/10"
                />
              </div>

              <div
                className={`flex max-w-[75%] flex-col ${
                  item.message.senderId === authUser._id ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`
                    rounded-2xl px-4 py-2.5 text-sm shadow-sm
                    ${
                      item.message.senderId === authUser._id
                        ? "rounded-br-md btn-brand"
                        : "rounded-bl-md border border-base-content/10 bg-base-200"
                    }
                  `}
                >
                  {item.message.image && (
                    <img
                      src={item.message.image}
                      alt="Attachment"
                      className="mb-2 max-w-[220px] rounded-xl border border-base-content/10"
                    />
                  )}
                  {item.message.text && <p className="leading-relaxed">{item.message.text}</p>}
                </div>
                <span className="mt-1 px-1 text-[10px] font-medium text-base-content/40">
                  {formatMessageTime(item.message.createdAt)}
                </span>
              </div>
            </div>
          )
        )}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

function formatDayLabel(dayString) {
  const day = new Date(dayString);
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (dayString === today) return "Today";
  if (dayString === yesterday) return "Yesterday";
  return day.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default ChatContainer;
