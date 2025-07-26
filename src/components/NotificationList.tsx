import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotificationUI } from "@/context/NotificationUIContext";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, isLoading }) => {
  const { setSelected, setOpen, page } = useNotificationUI();
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const paginatedNotifications = notifications.slice((page - 1) * 5, page * 5);

  return (
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
  );
};

export default NotificationList;
