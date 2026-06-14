import "./globals.css";

export const metadata = {
  title: "Price Sentry",
  description: "A price tracking app",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
