import React from "react";

const notifications = [
  {
    id: 28,
    clinicId: 28,
    title: "QWEWEF",
    body: "EWEWGE",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T00:16:18.478Z",
    updatedAt: "2025-07-24T00:16:18.478Z",
  },
  {
    id: 29,
    clinicId: 28,
    title: "qqqq",
    body: "qqqqqqqq",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T00:25:28.730Z",
    updatedAt: "2025-07-24T00:25:28.730Z",
  },
  {
    id: 30,
    clinicId: 28,
    title: "ASFSDDSG",
    body: "S",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T00:35:28.151Z",
    updatedAt: "2025-07-24T00:35:28.151Z",
  },
  {
    id: 31,
    clinicId: 28,
    title: "dvdsvds",
    body: "dsvsdv",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T01:01:56.724Z",
    updatedAt: "2025-07-24T01:01:56.724Z",
  },
  {
    id: 32,
    clinicId: 28,
    title: "ini testing",
    body: "testing",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T06:41:46.604Z",
    updatedAt: "2025-07-24T06:41:46.604Z",
  },
  {
    id: 33,
    clinicId: 28,
    title: "asvdsvd",
    body: "qqqqqqqqqqqqqq",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:04:23.732Z",
    updatedAt: "2025-07-24T08:04:23.732Z",
  },
  {
    id: 34,
    clinicId: 28,
    title: "ini baru",
    body: "baru baru",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:04:43.246Z",
    updatedAt: "2025-07-24T08:04:43.246Z",
  },
  {
    id: 35,
    clinicId: 28,
    title: "1111111",
    body: "11111111111",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:07:45.948Z",
    updatedAt: "2025-07-24T08:07:45.948Z",
  },
  {
    id: 36,
    clinicId: 28,
    title: "222222222222",
    body: "22222222222",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:08:02.782Z",
    updatedAt: "2025-07-24T08:08:02.782Z",
  },
  {
    id: 37,
    clinicId: 28,
    title: "2223333333333",
    body: "33333333333333",
    targe: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:14:19.187Z",
    updatedAt: "2025-07-24T08:14:19.187Z",
  },
];

export default function NotificationsPage() {
  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`rounded-lg border px-4 py-3 flex flex-col gap-1 transition bg-white dark:bg-zinc-900 ${
              n.isRead ? "opacity-60" : "border-primary/60 shadow-md"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-base">{n.title}</span>
              {!n.isRead && (
                <span className="ml-2 inline-block w-2 h-2 rounded-full bg-primary" title="Unread" />
              )}
            </div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{n.body}</span>
            <span className="text-xs text-zinc-400 mt-1">
              {new Date(n.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
