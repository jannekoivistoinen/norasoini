import Image from "next/image";
import Link from "next/link";
import Logo from "./assets/Logo.png";
import { Button } from "@/components/ui/button";
import { fontHtmlClassName } from "./fonts";
import "./globals.css";

export default function NotFound() {
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
              404 - Page Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The page you are looking for doesn't exist or it has moved.
            </p>
            <Button size="lg" asChild>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
