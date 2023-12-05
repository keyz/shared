# next-font-inter

[Inter](https://rsms.me/inter/) font for [Next.js](https://nextjs.org/).

Inter from Google Fonts is wildly outdated and has no italics. This package tracks the latest version of Inter (v4+) and provides it as a pre-configured `next/font`.

## Usage

```bash
npm install next-font-inter
```

### "Vanilla" Usage

```tsx
// app/layout.tsx

import { InterVariable, InterDisplay } from "next-font-inter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${InterVariable.className} ${InterDisplay.className}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

### With Tailwind

```tsx
// app/layout.tsx

import { InterVariable, InterDisplay } from "next-font-inter";
import "./globals.css"; // See https://nextjs.org/docs/app/building-your-application/styling/tailwind-css#importing-styles

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${InterVariable.variable} ${InterDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

```typescript
// tailwind.config.js

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter-variable)", // CSS variable name for `InterVariable`
        ],
        display: [
          "var(--font-inter-display)", // CSS variable name for `InterDisplay`
        ],
      },
    },
  },
};

module.exports = config;
```

## License

Inter is licensed under the [SIL Open Font License](https://github.com/rsms/inter/blob/master/LICENSE.txt).

`next-font-inter` is licensed under MIT.
