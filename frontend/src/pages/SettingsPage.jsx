import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pb-10 pt-24">
      <div className="animate-rise-in space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-extrabold tracking-tight">Appearance</h2>
          <p className="text-sm text-base-content/60">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-2 rounded-2xl p-2.5 transition-all ${
                theme === t
                  ? "bg-primary/15 ring-2 ring-primary"
                  : "hover:bg-base-content/5"
              }`}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-9 w-full overflow-hidden rounded-lg" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="w-full truncate text-center text-[11px] font-semibold">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview */}
        <h3 className="pt-2 text-lg font-bold">Preview</h3>
        <div className="overflow-hidden rounded-3xl border border-base-content/10 shadow-lg">
          <div className="bg-base-200 p-4 sm:p-6">
            <div className="mx-auto max-w-lg">
              {/* Mock Chat UI */}
              <div className="overflow-hidden rounded-2xl bg-base-100 shadow-sm ring-1 ring-base-content/10">
                {/* Header */}
                <div className="border-b border-base-content/10 bg-base-100 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-bold text-white">
                        J
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-success ring-2 ring-base-100" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">John Doe</h3>
                      <p className="text-xs text-success">Online</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="min-h-[200px] max-h-[200px] space-y-4 overflow-y-auto bg-base-100 p-4">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-2xl p-3 shadow-sm
                          ${
                            message.isSent
                              ? "rounded-br-md bg-gradient-to-br from-primary via-sky-400 to-secondary text-white"
                              : "rounded-bl-md border border-base-content/10 bg-base-200"
                          }
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`mt-1.5 text-[10px] font-medium ${
                            message.isSent ? "text-white/70" : "text-base-content/50"
                          }`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-base-content/10 bg-base-100 p-4">
                  <div className="chat-input-shell flex items-center gap-2 rounded-2xl px-3 py-1.5">
                    <input
                      type="text"
                      className="flex-1 bg-transparent py-1.5 text-sm outline-none"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn-brand flex size-8 items-center justify-center rounded-xl">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
