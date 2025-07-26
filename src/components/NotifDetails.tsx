import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface NotifDetailsProps {
  isMobile: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: { title?: string; body?: string } | null;
  router: import("next/router").NextRouter;
}

const NotifDetails: React.FC<NotifDetailsProps> = ({ isMobile, open, setOpen, selected, router }) => {
  if (isMobile) {
    return (
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
    );
  }
  return (
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
