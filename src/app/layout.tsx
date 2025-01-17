import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="mb-2">
          <h1>Todoアプリ</h1>
        </header>
        <main>{children}</main>
        <footer className="mt-2">
          <p>&copy; Hibiki Hangai</p>
        </footer>
      </body>
    </html>
  );
}
