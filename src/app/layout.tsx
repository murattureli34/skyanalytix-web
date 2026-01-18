export const metadata = {
  title: "SkyAnalytix",
  description: "SkyAnalytix website",
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
