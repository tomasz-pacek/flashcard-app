import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./_components/register-form";

export default function RegisterPage() {
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
