import React from "react";
import DefaultInnerLayout from "./DefaultInnerLayout";
import { auth } from "@/lib/nextAuthOptions";

export default async function DefaultLayout({children}: {children: React.ReactNode}) {
  const user = await auth()

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        <DefaultInnerLayout user={user}>{children}</DefaultInnerLayout>
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
