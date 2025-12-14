import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./_components/register-form";
import { getCurrentUser } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Flashcards",
  description:
    "Create a free account to start learning with flashcards. Build custom card sets and study more effectively.",
  alternates: {
    canonical: "https://localhost:3000/register",
  },
};

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect("/?error=not_authenticated");
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[30%] border-2 border-foreground shadow-right-bottom">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
