"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFlashcardCategories } from "@/contexts/flashcards-categories-provider";
import { createCardFormSchema } from "@/utils/validations/create-card-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import CategorySelect from "./category-select";
import { useState } from "react";
import SubmitButton from "@/components/submit-button";
import { editFlashcard } from "@/actions/editFlashcard";
import { useDialogsContext } from "@/contexts/DialogsProvider";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function EditFlashcardForm() {
  const categories = useFlashcardCategories();
  const { selectedFlashcardId, setIsEditDialogOpen } = useDialogsContext();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAuth();

  const form = useForm<z.infer<typeof createCardFormSchema>>({
    resolver: zodResolver(createCardFormSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createCardFormSchema>) => {
    setIsLoading(true);
    if (!user) return;
    const data = {
      question: values.question,
      answer: values.answer,
      categoryId: selectedCategoryId,
    };

    const response = await editFlashcard(selectedFlashcardId, user.id, data);

    if (response.status) {
      toast(response.message);
      form.reset();
      setIsLoading(false);
      setIsEditDialogOpen(false);
    } else {
      toast(response.message);
      setIsLoading(false);
    }
  };

  return (
    <form id="edit-flashcard-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="question"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-base font-medium"
              >
                Question
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="What does HTML stand for?"
                autoComplete="off"
                className="border-2 border-foreground py-6 placeholder:text-base placeholder:leading-[1.4rem]"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="answer"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-base font-medium"
              >
                Question
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="HyperText Markup Language"
                autoComplete="off"
                className="border-2 border-foreground py-6 placeholder:text-base placeholder:leading-[1.4rem]"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <CategorySelect
          flashcardCategories={categories}
          selectedCategory={selectedCategoryId}
          setSelectedCategory={setSelectedCategoryId}
        />
      </FieldGroup>
      <div className="w-full flex items-center justify-end">
        <SubmitButton
          text="Update Card"
          className="mt-6 rounded-full shadow-right-bottom border-2 border-foreground cursor-pointer transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
          submittingText="Updating card..."
          isSubmitting={isLoading}
        />
      </div>
    </form>
  );
}
