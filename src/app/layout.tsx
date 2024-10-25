"use server"
import "jsvectormap/dist/jsvectormap.css"
import "flatpickr/dist/flatpickr.min.css"
import "@/css/satoshi.css"
import "@/css/style.css"
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

// import dbConnect from "@/lib/mongodb"
import MainClientLayout from "./MainClientLayout"
import { auth } from "@/lib/nextAuthOptions"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  // await dbConnect()
  const user = await auth()
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex">
              <MainClientLayout user={user}>
                {children}
              </MainClientLayout>
            </div>
          </div>
      </body>
    </html>
  );
}
