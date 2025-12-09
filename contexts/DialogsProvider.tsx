"use client";

import { createContext, useContext, useState } from "react";

type DialogsContextType = {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFlashcardId: string;
  setSelectedFlashcardId: React.Dispatch<React.SetStateAction<string>>;
};

const DialogsContext = createContext<DialogsContextType | undefined>(undefined);

export const DialogsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedFlashcardId, setSelectedFlashcardId] = useState<string>("");

  const value = {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedFlashcardId,
    setSelectedFlashcardId,
  };

  return (
    <DialogsContext.Provider value={value}>{children}</DialogsContext.Provider>
  );
};

export const useDialogsContext = () => {
  const context = useContext(DialogsContext);
  if (!context) {
    throw new Error("useDialogsContext must be used within context provider");
  }
  return context;
};
