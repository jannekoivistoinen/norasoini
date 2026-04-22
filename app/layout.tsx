import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <>
   {children}
   <GoogleAnalytics gaId="G-1HM4VJEXGE" />
  </>
 );
}
