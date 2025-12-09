"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialogsContext } from "@/contexts/DialogsProvider";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

type Props = {
  flashcardId: string;
};

export default function FlashcardSettings({ flashcardId }: Props) {
  const { setIsDeleteDialogOpen, setIsEditDialogOpen, setSelectedFlashcardId } =
    useDialogsContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border border-foreground p-0 divide-y divide-foreground">
        <DropdownMenuItem
          onClick={() => {
            setIsEditDialogOpen(true);
            setSelectedFlashcardId(flashcardId);
          }}
          className="text-foreground font-medium leading-[1.4rem] text-sm rounded-none cursor-pointer hover:bg-background"
        >
          <Pencil className="font-medium" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setIsDeleteDialogOpen(true);
            setSelectedFlashcardId(flashcardId);
          }}
          className="text-foreground font-medium leading-[1.4rem] text-sm rounded-none cursor-pointer hover:bg-background"
        >
          <Trash2 className="font-bold" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
