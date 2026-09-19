import { UsersRound } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="flex h-full w-20 flex-col border-r border-base-content/10 bg-base-100/50 backdrop-blur-sm transition-all duration-200 lg:w-80">
      {/* Header */}
      <div className="w-full border-b border-base-content/10 p-4 lg:p-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <UsersRound className="size-5" />
          </div>
          <span className="font-bold tracking-tight hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="w-full flex-1 overflow-y-auto py-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="mb-1 flex w-full items-center gap-3 p-2.5">
            {/* Avatar skeleton */}
            <div className="relative mx-auto shrink-0 lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden min-w-0 flex-1 text-left lg:block">
              <div className="skeleton mb-2 h-4 w-32" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
