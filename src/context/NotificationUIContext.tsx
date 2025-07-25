import React, { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  // Other fields
}

interface NotificationUIContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: Notification | null;
  setSelected: (selected: Notification | null) => void;
  showUnreadOnly: boolean;
  setShowUnreadOnly: (show: boolean) => void;
  page: number;
  setPage: (page: number) => void;
}

const NotificationUIContext = createContext<NotificationUIContextType | undefined>(undefined);

export const NotificationUIProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Notification | null>(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <NotificationUIContext.Provider
      value={{ open, setOpen, selected, setSelected, showUnreadOnly, setShowUnreadOnly, page, setPage }}
    >
      {children}
    </NotificationUIContext.Provider>
  );
};

export const useNotificationUI = () => {
  const context = useContext(NotificationUIContext);
  if (!context) throw new Error("useNotificationUI must be used within a NotificationUIProvider");
  return context;
};
