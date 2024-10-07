"use server"
import dbConnect from "@/lib/mongodb";
// import ClientLayout from "./client-layout";
import DetermineLayout from "@/components/Layouts/DetermineLayout";

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
            {/* <ClientLayout>{children}</ClientLayout> */}
            <DetermineLayout>{children}</DetermineLayout>
          </div>
      </body>
    </html>
  );
}
