import { Instrument_Serif, Instrument_Sans, Kaisei_Decol } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const kaiseiDecol = Kaisei_Decol({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-kaisei-decol",
  display: "swap",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const fontHtmlClassName = `${instrumentSerif.variable} ${kaiseiDecol.variable} ${instrumentSans.variable}`;
