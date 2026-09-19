const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 space-y-5 overflow-y-auto p-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex gap-2.5 ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}
        >
          <div className="skeleton mt-auto size-8 shrink-0 rounded-full" />

          <div
            className={`flex max-w-[75%] flex-col ${
              idx % 2 === 0 ? "items-start" : "items-end"
            }`}
          >
            <div
              className={`skeleton h-16 w-[200px] rounded-2xl ${
                idx % 2 === 0 ? "rounded-bl-md" : "rounded-br-md"
              }`}
            />
            <div className="skeleton mt-1.5 h-2.5 w-12 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
