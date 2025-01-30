export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="nl">
        <body className="bg-gray-50 dark:bg-gray-900">
          <main className="p-8">{children}</main>
        </body>
      </html>
    )
  }