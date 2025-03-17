export const metadata = {
  title: 'FlexiFun | Договір з користувачем',
  description: 'FlexiFun | Договір з користувачем',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
