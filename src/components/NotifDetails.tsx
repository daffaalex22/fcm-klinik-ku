import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useNotificationUI } from "@/context/NotificationUIContext";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/use-is-mobile";

const NotifDetails: React.FC = () => {
  const { open, setOpen, selected } = useNotificationUI();
  const router = useRouter();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          router.push("/notifications");
        }
      }}>
        <DrawerContent className="px-4 py-4 bg-white dark:bg-neutral-900">
          <DrawerHeader>
            <DrawerTitle className="text-black dark:text-white">
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
    );
  }
  return (
    <Dialog open={open} onOpenChange={(open) => {
      setOpen(open);
      if (!open) {
        router.push("/notifications");
      }
    }}>
      <DialogContent className="bg-white dark:bg-neutral-900">
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
                setOpen(false);
                router.push("/notifications");
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotifDetails;
