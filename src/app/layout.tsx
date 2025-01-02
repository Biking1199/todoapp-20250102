export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Todoアプリ</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2025/1/1</p>
        </footer>
      </body>
    </html>
  );
}
