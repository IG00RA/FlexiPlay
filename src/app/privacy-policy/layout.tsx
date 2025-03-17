export const metadata = {
  title: 'FlexiFun | Zmluva s používateľom',
  description: 'FlexiFun | Zmluva s používateľom',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
