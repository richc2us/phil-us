import React from "react";
import { AuthProvider } from "../Providers/authProvider";
import DefaultInnerLayout from "./DefaultInnerLayout";

export default function DefaultLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <AuthProvider>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        <DefaultInnerLayout>{children}</DefaultInnerLayout>
      </div>
      </AuthProvider>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
