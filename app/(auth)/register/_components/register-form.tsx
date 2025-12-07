"use client";
import SubmitButton from "@/components/submit-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "@/utils/validations/register-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import AuthSpacer from "../../_components/auth-spacer";
import GoogleLoginButton from "../../_components/google-login-button";
import NewHere from "../../_components/new-here";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    await authClient.signUp.email(
      {
        name: values.fullName,
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast("You've successfully created an account");
          router.push("/");
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast(ctx.error.message || "Error while registering");
          console.log(ctx);
        },
      }
    );
  };

  return (
    <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="register-form-full-name">
                Full Name
              </FieldLabel>
              <Input
                {...field}
                id="register-form-full-name"
                aria-invalid={fieldState.invalid}
                placeholder="e.g Alice Mess"
                autoComplete="off"
                className="border-foreground border-2"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="register-form-email">E-mail</FieldLabel>
              <Input
                {...field}
                id="register-form-email"
                aria-invalid={fieldState.invalid}
                placeholder="e.g name@example.com"
                autoComplete="off"
                className="border-foreground border-2"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="register-form-password">Password</FieldLabel>
              <Input
                {...field}
                id="register-form-password"
                aria-invalid={fieldState.invalid}
                placeholder="•••••••••••"
                autoComplete="off"
                type="password"
                className="border-foreground border-2"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="repeatPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="register-form-repeat-password">
                Repeat Password
              </FieldLabel>
              <Input
                {...field}
                id="register-form-repeat-password"
                aria-invalid={fieldState.invalid}
                placeholder="•••••••••••"
                autoComplete="off"
                type="password"
                className="border-foreground border-2"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <SubmitButton
        text="Register"
        className="w-full my-6 border-2 border-foreground shadow-right-bottom cursor-pointer transition-all duration-200 ease-out hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        isSubmitting={isLoading}
        submittingText="Registering..."
      />
      <AuthSpacer />
      <GoogleLoginButton />
      <NewHere text="Already been here?" url="/login" urlText="Login" />
    </form>
  );
}
