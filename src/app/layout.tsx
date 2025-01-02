import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header>
          <h1>Todoアプリ</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; Hibiki Hangai</p>
        </footer>
      </body>
    </html>
  );
}
