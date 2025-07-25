import { Geist, Geist_Mono } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans flex min-h-screen w-full items-center justify-center p-6 md:p-10`}
    >
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Notify</CardTitle>
            <CardDescription className="text-center text-base mt-2">
              Notifications with Firebase Cloud Messaging
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full mt-4 cursor-pointer" size="lg" onClick={() => router.push("/login")}>Login to your account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
