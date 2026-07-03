"use client";

export default function TagList({
  tags = [],
}: any) {
  const safeTags = Array.isArray(tags)
    ? tags
    : [];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {safeTags.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          No tags found
        </div>
      ) : (
        safeTags.map((tag: any, index: number) => (
          <div
            key={tag?._id || index}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor:
                    tag?.color || "#3B82F6",
                }}
              />

              <h3 className="font-semibold">
                {tag?.name || "Untitled Tag"}
              </h3>
            </div>

            <p className="text-gray-500 mt-2 text-sm">
              {tag?.description || "No description"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}