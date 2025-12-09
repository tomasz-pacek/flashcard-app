"use client";

import { deleteFlashcard } from "@/actions/deleteFlashcard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogsContext } from "@/contexts/DialogsProvider";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function DeleteFlashcardDialog() {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen, selectedFlashcardId } =
    useDialogsContext();
  const { user } = useAuth();
  if (!user) return;

  const handleDeleteCard = async () => {
    const response = await deleteFlashcard(selectedFlashcardId, user.id);
    setIsDeleteDialogOpen(false);
    toast(response?.message);
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogOverlay className="bg-foreground/40">
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-semibold text-2xl">
              Delete this card?
            </DialogTitle>
            <DialogDescription className="leading-[1.4rem] text-base text-foreground">
              This action can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex flex-row items-center justify-end gap-x-2">
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="rounded-full bg-white border border-foreground font-semibold cursor-pointer p-3 py-2 transition-all duration-200 hover:bg-background"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteCard}
              className="rounded-full shadow-right-bottom border border-foreground cursor-pointer transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Delete Card
            </Button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
