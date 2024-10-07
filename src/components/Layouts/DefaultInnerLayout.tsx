"use client"
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MainPageLayout from "./MainPageLayout";

export default function DefaultInnerLayout({user,children}: { children: ReactNode, user:any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col lg:ml-72.5">
                {/* <!-- ===== Header Start ===== --> */}
                  <Header sidebarOpen={sidebarOpen} user={user} setSidebarOpen={setSidebarOpen} />
                  {/* <!-- ===== Header End ===== --> */}

                  {/* <!-- ===== Main Content Start ===== --> */}
                  <MainPageLayout user={user}>{children}</MainPageLayout>
                {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
