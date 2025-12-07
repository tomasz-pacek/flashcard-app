"use client";

import { createCategory } from "@/actions/createCategory";
import SubmitButton from "@/components/submit-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { createCategoryFormSchema } from "@/utils/validations/create-category-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function CreateNewCategoryForm() {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof createCategoryFormSchema>>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createCategoryFormSchema>) => {
    const response = await createCategory(values.category, user?.id as string);

    if (response.status) {
      toast(response.message);
      form.reset();
    } else {
      toast(response.message);
    }
  };

  return (
    <form id="create-category-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor={field.name}>Category</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g JavaScript"
                autoComplete="off"
                className="border-2 border-foreground py-6"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <SubmitButton
        text="Create Category"
        className="border-2 py-5 cursor-pointer border-foreground shadow-right-bottom rounded-full font-semibold mt-4 transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
      >
        <CirclePlus />
      </SubmitButton>
    </form>
  );
}
