import localFont from "next/font/local";
import { Instrument_Serif, Instrument_Sans } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const kaiseiDecol = localFont({
  src: [
    {
      path: "../public/fonts/kaisei-decol-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/kaisei-decol-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-kaisei-decol",
  display: "swap",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const fontHtmlClassName = `${instrumentSerif.variable} ${kaiseiDecol.variable} ${instrumentSans.variable}`;
