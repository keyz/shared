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

export const InterDisplay = localFont({
  src: [
    {
      path: "../../assets/InterDisplay-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../assets/InterDisplay-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../assets/InterDisplay-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/InterDisplay-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../assets/InterDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/InterDisplay-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../assets/InterDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/InterDisplay-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/InterDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/InterDisplay-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../assets/InterDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/InterDisplay-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../assets/InterDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/InterDisplay-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../assets/InterDisplay-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../assets/InterDisplay-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../assets/InterDisplay-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../assets/InterDisplay-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
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
  variable: "--font-inter-display",
});
