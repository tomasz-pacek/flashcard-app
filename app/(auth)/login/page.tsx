import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./_components/login-form";
import { getCurrentUser } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Flashcards",
  description:
    "Log in to your flashcard account to continue learning, review your cards, and track your study progress.",
  alternates: {
    canonical: "https://localhost:3000/login",
  },
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/?error=not_authenticated");
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[30%] border-2 border-foreground shadow-right-bottom">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
