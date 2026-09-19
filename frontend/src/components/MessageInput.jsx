import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { ImagePlus, Send, Smile, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="w-full border-t border-base-content/10 bg-base-100/60 p-4 backdrop-blur-sm">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 rounded-xl border border-base-content/10 object-cover shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-error text-white shadow-md transition-transform hover:scale-110"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        <div className="chat-input-shell flex flex-1 items-center gap-2 rounded-2xl px-3 py-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-base-content/40 transition-colors hover:bg-base-content/10 hover:text-primary"
            title="Attach image"
          >
            <ImagePlus className="size-5" />
          </button>
          <input
            type="text"
            className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-base-content/40"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="button"
            onClick={() => toast("Emoji picker coming soon! 😄")}
            className="hidden size-8 shrink-0 items-center justify-center rounded-full text-base-content/40 transition-colors hover:bg-base-content/10 hover:text-primary sm:flex"
            title="Emoji"
          >
            <Smile className="size-5" />
          </button>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          className="btn-brand flex size-11 shrink-0 items-center justify-center rounded-2xl transition-all disabled:cursor-not-allowed"
          disabled={!text.trim() && !imagePreview}
          title="Send message"
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
