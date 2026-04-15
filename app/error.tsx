"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "./assets/Logo.png";
import { Button } from "@/components/ui/button";
import { fontHtmlClassName } from "./fonts";
import "./globals.css";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={fontHtmlClassName}>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-center">
            <Image
              src={Logo}
              alt="Lucky Ranch Logo"
              width={120}
              height={120}
              className="mx-auto mb-12"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              500 - Server Error
            </h1>
            <p className="text-gray-600 mb-8">
              Something went wrong on our end. Please try again later.
            </p>
            <div className="space-x-4">
              <Button size="lg" onClick={() => reset()}>
                Try Again
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">Return to Homepage</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
