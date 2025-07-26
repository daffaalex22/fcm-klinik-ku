import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Megaphone } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import useNotification from "@/hooks/use-notification";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { NotificationUIProvider, useNotificationUI } from "@/context/NotificationUIContext";
import Navbar from "@/components/Navbar";
import NotifDetails from "@/components/NotifDetails";
import NotificationList from "@/components/NotificationList";

interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  // Other fields
}

function NotificationsUI() {
  const queryClient = useQueryClient();
  const { notifPermissionStatus } = useNotification();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications", { page: 1, limit: 100 }],
    queryFn: async () => {
      const params = new URLSearchParams({ page: "1", limit: "100" });
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `/api/notification?${params}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const json = await res.json();
      return json.data.notification;
    },
  });

  // Mutation for sending notification
  const sendNotifMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `/api/notification/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            title: "Pasien Dini udah lama ga kontrol KB!",
            body: "Yuk, kasih pengingat ke Bu Dini supaya ga lupa kontrol KB. Cuma butuh beberapa detik!",
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to send notification");
      return res.json();
    },
    onError: () => {
      toast.error("Failed to send notification");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", { page: 1, limit: 100 }] });
    },
  });

  const {
    showUnreadOnly,
    setShowUnreadOnly,
    page,
    setPage,
  } = useNotificationUI();

  const notifications: Notification[] = data || [];
  const sortedNotifications = notifications
    .slice()
    .sort(
    (a: Notification, b: Notification) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredNotifications: Notification[] = showUnreadOnly
    ? sortedNotifications.filter((n: Notification) => !n.isRead)
    : sortedNotifications;
  const pageCount = Math.ceil(filteredNotifications.length / 5);

  return (
    <>
      <Navbar />
    <main className="max-w-lg mx-auto py-10 px-4 relative">
      <div className={`transition-all duration-300 ease-in-out ${notifPermissionStatus !== null && notifPermissionStatus !== "granted" ? 'mb-6 opacity-100 max-h-40' : 'mb-0 opacity-0 max-h-0 pointer-events-none overflow-hidden'}`}>
        {notifPermissionStatus !== null && notifPermissionStatus !== "granted" && (
          <Alert variant="destructive">
            <AlertDescription>
              Please allow notification permission in your browser to receive push notifications.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Notifications
        </h1>
        <div className="flex items-center gap-2">
          <label
            htmlFor="unread-only"
            className="text-sm select-none cursor-pointer"
          >
            Unread only
          </label>
          <Switch
            className="hover:cursor-pointer"
            id="unread-only"
            checked={showUnreadOnly}
            onCheckedChange={setShowUnreadOnly}
          />
        </div>
      </div>
        {/* Notification List */}
        <NotificationList
          notifications={filteredNotifications}
          isLoading={isLoading}
        />
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          className="cursor-pointer"
          disabled={page === 1}
          onClick={() => setPage(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {pageCount || 1}
        </span>
        <Button
          className="cursor-pointer"
          disabled={page === pageCount || pageCount === 0}
          onClick={() => setPage(Math.min(pageCount, page + 1))}
        >
          Next
        </Button>
      </div>
      {/* Dialog/Drawer for Notification Details */}
        <NotifDetails />
      {/* Floating Test Notif Button */}
      <Button
        className="sticky bottom-6 right-6 float-right z-50 shadow-lg rounded-full w-12 h-12 p-0 flex items-center justify-center cursor-pointer"
        onClick={() => {
          sendNotifMutation.mutate();
        }}
        aria-label="Test Notification"
      >
        <Megaphone size={28} />
      </Button>
    </main>
    </>
  );
}

export default function NotificationsPage() {
  return (
    <NotificationUIProvider>
      <NotificationsUI />
    </NotificationUIProvider>
  );
}
