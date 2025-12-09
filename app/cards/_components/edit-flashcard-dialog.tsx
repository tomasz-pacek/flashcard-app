"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDialogsContext } from "@/contexts/DialogsProvider";
import EditFlashcardForm from "./edit-flashcard-form";
import { useFlashcardCategories } from "@/contexts/flashcards-categories-provider";

export default function EditFlashcardDialog() {
  const { isEditDialogOpen, setIsEditDialogOpen } = useDialogsContext();
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogOverlay className="bg-foreground/40">
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-semibold text-2xl">
              Edit your card
            </DialogTitle>
          </DialogHeader>
          <EditFlashcardForm />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
