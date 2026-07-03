"use client";

export default function NotificationList({
  notifications = [],
}: any) {
  if (!notifications.length) {
    return (
      <div className="bg-white p-6 rounded shadow text-gray-500">
        No notifications found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((item: any) => (
        <div
          key={item._id}
          className="bg-white p-4 rounded shadow border"
        >
          <h3 className="font-semibold">
            {item.title || "Notification"}
          </h3>

          <p className="text-gray-600 mt-1">
            {item.message || "No message"}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            {item.type || "SYSTEM"}
          </p>
        </div>
      ))}
    </div>
  );
}