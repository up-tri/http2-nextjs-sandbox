import "./globals.css";
import StoreProvider from "./providers/StoreProvider";

// https://redux-toolkit.js.org/usage/nextjs
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
