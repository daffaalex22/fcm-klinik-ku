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
import { useRouter } from "next/router";
import { NotificationUIProvider, useNotificationUI } from "@/context/NotificationUIContext";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import Navbar from "@/components/Navbar";

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
  const router = useRouter();
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

  const markReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `/api/notification/mark-read/${notificationId}`,
        {
          method: "PATCH",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (!res.ok) throw new Error("Failed to mark notification as read");
      return res.json();
    },
    onMutate: (notificationId: string) => {
      queryClient.setQueryData(["notifications", { page: 1, limit: 100 }], (old: Notification[] | undefined) => {
        if (!old) return old;
        return old.map(n => n.id === notificationId ? { ...n, isRead: true } : n);
      });
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

  const notifications: Notification[] = data || [];
  const {
    open,
    setOpen,
    selected,
    setSelected,
    showUnreadOnly,
    setShowUnreadOnly,
    page,
    setPage,
  } = useNotificationUI();

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
  const paginatedNotifications = filteredNotifications.slice(
    (page - 1) * 5,
    page * 5
  );

  const { notifPermissionStatus } = useNotification();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      <ul className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
            <React.Fragment key={i}>
              <li>
                <Card className="bg-background border-none shadow-none px-0 py-0">
                  <CardContent className="flex flex-col gap-1 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </CardContent>
                </Card>
              </li>
              {i < 5 - 1 && <Separator className="my-2" />}
            </React.Fragment>
          ))
          : paginatedNotifications.map((n, i) => (
              <React.Fragment key={n.id}>
                <li>
                  <button
                    className="w-full text-left focus:outline-none cursor-pointer"
                    onClick={() => {
                      if (!n.isRead) {
                        markReadMutation.mutate(n.id);
                      }
                      setSelected(n);
                      setOpen(true);
                      router.push(`/notifications?id=${n.id}`);
                    }}
                  >
                    <Card
                      className={cn(
                        "bg-background border-none shadow-none px-0 py-0  transition hover:bg-accent hover:shadow",
                        n.isRead ? "opacity-60" : ""
                      )}
                    >
                      <CardContent className="flex flex-col gap-1 px-4 py-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-base line-clamp-1">
                            {n.title}
                          </span>
                          {!n.isRead && (
                            <Badge
                              variant="outline"
                              className="ml-2 px-2 py-0.5 text-xs border-primary text-primary bg-transparent"
                            >
                              New
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground line-clamp-2">
                          {n.body}
                        </span>
                        <span className="text-xs text-zinc-400 mt-1">
                          {new Date(n.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </CardContent>
                    </Card>
                  </button>
                </li>
                {i < notifications.length - 1 && <Separator className="my-2" />}
              </React.Fragment>
            ))}
      </ul>
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
      {isMobile ? (
        <Drawer open={open} onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            router.push("/notifications");
          }
        }}>
          <DrawerContent className="px-4 py-4">
            <DrawerHeader>
              <DrawerTitle>
                {selected?.title || "Notification Details"}
              </DrawerTitle>
            </DrawerHeader>
            <div className="py-2">
              <p className="mb-4">
                {selected?.body ||
                  "This is a dummy dialog. You can put more details here."}
              </p>
              <div className="flex justify-end">
                <Button
                  className="mt-2 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
          <Dialog open={open} onOpenChange={(open) => {
            setOpen(open);
            if (!open) {
              router.push("/notifications");
            }
          }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selected?.title || "Notification Details"}
                </DialogTitle>
              </DialogHeader>
              <div className="py-2">
                <p className="mb-4">
                  {selected?.body ||
                    "This is a dummy dialog. You can put more details here."}
                </p>
                <div className="flex justify-end">
                  <Button
                    className="mt-2 cursor-pointer"
                      onClick={() => {
                        setOpen(false)
                        router.push("/notifications");
                      }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
      )}
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
