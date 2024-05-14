import "./globals.css";

export const metadata = {
  title: "QR Authentication",
  description: "A secure QR code authentication system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
