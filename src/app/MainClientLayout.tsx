"use client"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";

export default function MainClientLayout({children, user}:any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
    return(<>
          { user?.user ? <> <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col lg:ml-72.5">
            <Header sidebarOpen={sidebarOpen} user={user} setSidebarOpen={setSidebarOpen} />
            {children}
          </div></> : <div className="relative flex flex-1 flex-col">{children}</div>
          }
   </>)
}