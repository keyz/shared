// eslint-disable-next-line import/no-extraneous-dependencies
import localFont from "next/font/local";

export const InterVariable = localFont({
  src: [
    { path: "../../assets/InterVariable.woff2", style: "normal" },
    { path: "../../assets/InterVariable-Italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
  adjustFontFallback: "Arial",
  variable: "--font-inter-variable",
});
