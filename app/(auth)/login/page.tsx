import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
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
