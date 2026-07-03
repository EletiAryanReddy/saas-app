"use client";

import CreateTag from "@/components/tag/CreateTag";
import TagList from "@/components/tag/TagList";

export default function TagsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Workspace Tags
      </h1>

      <CreateTag />

      <TagList tags={tags} />
    </div>
  );
}