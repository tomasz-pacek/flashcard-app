"use client";
import { loginFormSchema } from "@/utils/validations/login-form";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import GoogleLoginButton from "../../_components/google-login-button";
import NewHere from "../../_components/new-here";
import AuthSpacer from "../../_components/auth-spacer";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast("You've successfully logged in!");
          router.push("/");
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast(ctx.error.message || "Error while logging in");
        },
      }
    );
  };

  return (
    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="login-form-email">E-mail</FieldLabel>
              <Input
                {...field}
                id="login-form-email"
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
              <FieldLabel htmlFor="login-form-password">Password</FieldLabel>
              <Input
                {...field}
                id="login-form-password"
                aria-invalid={fieldState.invalid}
                placeholder="•••••••••••"
                autoComplete="off"
                type="password"
                className="border-2 border-foreground"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <SubmitButton
        text="Log in"
        className="w-full my-6 border-2 border-foreground shadow-right-bottom cursor-pointer transition-all duration-200 ease-out hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        isSubmitting={isLoading}
        submittingText="Loggin in..."
      />
      <AuthSpacer />
      <GoogleLoginButton />
      <NewHere text="New here?" url="/register" urlText="Register" />
    </form>
  );
}
