import { Instrument_Serif, Instrument_Sans } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
