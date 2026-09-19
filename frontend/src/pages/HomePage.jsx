import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="mx-auto flex h-full max-w-7xl items-stretch px-0 pt-16 sm:px-4 sm:pt-20 sm:pb-4">
        <div className="glass-panel w-full overflow-hidden border border-base-content/10 shadow-2xl shadow-base-content/5 sm:rounded-3xl">
          <div className="flex h-full">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
