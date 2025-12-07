"use client";

import SubmitButton from "@/components/submit-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/category";
import { createCardFormSchema } from "@/utils/validations/create-card-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import CategorySelect from "./category-select";
import { useState } from "react";
import { createFlashcard } from "@/actions/createFlashcard";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Props = {
  flashcardCategories: Category[];
};

export default function CreateCardForm({ flashcardCategories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { user } = useAuth();
  const form = useForm<z.infer<typeof createCardFormSchema>>({
    resolver: zodResolver(createCardFormSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createCardFormSchema>) => {
    if (!user) return;
    const response = await createFlashcard(
      values.question,
      values.answer,
      selectedCategory,
      user.id
    );

    if (response.status) {
      toast(response.message);
      form.reset();
      setSelectedCategory("");
    } else {
      toast(response.message);
    }
  };

  return (
    <form id="create-card-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="question"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor={field.name}>Question</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. What is the capital of France?"
                autoComplete="off"
                className="border-2 border-foreground py-6 placeholder:leading-[1.4rem]"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="answer"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor={field.name}>Answer</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. Paris"
                autoComplete="off"
                className="border-2 border-foreground py-6 placeholder:leading-[1.4rem]"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <CategorySelect
          flashcardCategories={flashcardCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </FieldGroup>
      <SubmitButton
        text="Create Card"
        className="border-2 py-5 cursor-pointer border-foreground shadow-right-bottom rounded-full font-semibold mt-4 transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
      >
        <CirclePlus />
      </SubmitButton>
    </form>
  );
}
