import dbConnect from "@/lib/mongodb";
import ClientLayout from "./client-layout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  await dbConnect()
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <ClientLayout>{children}</ClientLayout>
          </div>
      </body>
    </html>
  );
}
