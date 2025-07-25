import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const res = await fetch(`/api/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      if (data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        toast.success("Login successful!");
        router.push("/notifications");
      } else {
        toast.error("No access token received.");
      }
    },
    onError: (error: unknown) => {
      let message = "Login failed";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "object" && error !== null && "message" in error) {
        message = String((error as { message: unknown }).message);
      }
      toast.error(message);
    },
  });

  const handleTestCredential = () => {
    const testEmail = "akun_test_fe"
    const testPassword = "mY)5cl37|iY{"
    if (
      emailRef.current?.value === testEmail &&
      passwordRef.current?.value === testPassword
    ) {
      toast.info("The form is already filled with the test credential.")
      return
    }
    if (emailRef.current) emailRef.current.value = testEmail
    if (passwordRef.current) passwordRef.current.value = testPassword
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    if (!username || !password) {
      toast.error("Please fill in both fields.");
      return;
    }
    loginMutation.mutate({ username, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  ref={passwordRef}
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                className="w-full cursor-pointer"
                onClick={handleTestCredential}
              >
                Use test credential
              </Button>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
