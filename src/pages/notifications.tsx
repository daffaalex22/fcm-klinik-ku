import React, { useState } from "react";
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

const notifications = [
  {
    id: 28,
    clinicId: 28,
    title: "Appointment Reminder",
    body: "You have an appointment scheduled for tomorrow at 10:00 AM.",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T00:16:18.478Z",
    updatedAt: "2025-07-24T00:16:18.478Z",
  },
  {
    id: 29,
    clinicId: 28,
    title: "Lab Results Ready",
    body: "Your recent lab results are now available. Please check your patient portal.",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T00:25:28.730Z",
    updatedAt: "2025-07-24T00:25:28.730Z",
  },
  {
    id: 30,
    clinicId: 28,
    title: "Prescription Update",
    body: "Your prescription for Amoxicillin has been updated.",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T00:35:28.151Z",
    updatedAt: "2025-07-24T00:35:28.151Z",
  },
  {
    id: 31,
    clinicId: 28,
    title: "New Message from Doctor",
    body: "Dr. Smith has sent you a new message regarding your recent visit.",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T01:01:56.724Z",
    updatedAt: "2025-07-24T01:01:56.724Z",
  },
  {
    id: 32,
    clinicId: 28,
    title: "Follow-up Required",
    body: "A follow-up appointment is recommended. Please schedule at your convenience.",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T06:41:46.604Z",
    updatedAt: "2025-07-24T06:41:46.604Z",
  },
  {
    id: 33,
    clinicId: 28,
    title: "Insurance Information Needed",
    body: "Please update your insurance information before your next visit.",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:04:23.732Z",
    updatedAt: "2025-07-24T08:04:23.732Z",
  },
  {
    id: 34,
    clinicId: 28,
    title: "Clinic Holiday Notice",
    body: "The clinic will be closed on July 30th for a public holiday.",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:04:43.246Z",
    updatedAt: "2025-07-24T08:04:43.246Z",
  },
  {
    id: 35,
    clinicId: 28,
    title: "Payment Received",
    body: "Your payment for the last visit has been received. Thank you!",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:07:45.948Z",
    updatedAt: "2025-07-24T08:07:45.948Z",
  },
  {
    id: 36,
    clinicId: 28,
    title: "Vaccination Reminder",
    body: "It is time for your annual flu vaccination. Book your slot now.",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:08:02.782Z",
    updatedAt: "2025-07-24T08:08:02.782Z",
  },
  {
    id: 37,
    clinicId: 28,
    title: "Profile Update Successful",
    body: "Your profile information has been updated successfully.",
    target: null,
    targetId: null,
    isRead: false,
    createdAt: "2025-07-24T08:14:19.187Z",
    updatedAt: "2025-07-24T08:14:19.187Z",
  },
];

export default function NotificationsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | typeof notifications[number]>(
    null
  );
  return (
    <main className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-8 tracking-tight">
        Notifications
      </h1>
      <ul className="space-y-2">
        {notifications.map((n, i) => (
          <React.Fragment key={n.id}>
            <li>
              <button
                className="w-full text-left focus:outline-none cursor-pointer"
                onClick={() => {
                  setSelected(n);
                  setOpen(true);
                }}
              >
                <Card
                  className={cn(
                    "bg-background border-none shadow-none px-0 py-0",
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title || "Notification Details"}</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <p className="mb-4">
              {selected?.body || "This is a dummy dialog. You can put more details here."}
            </p>
            <div className="flex justify-end">
              <Button
                className="mt-2"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
