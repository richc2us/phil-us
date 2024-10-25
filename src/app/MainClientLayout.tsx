"use client"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

export default function MainClientLayout({children, user}:any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useEffect(()=> {

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js') // path to your bundled service worker with GoldenRetriever service worker
        .then((registration) => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope,
          );
        })
        .catch((error) => {
          console.log(`Registration failed with ${error}`);
        });
    }

  },[])
    return(<>
          { user?.user ? <> <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col lg:ml-62.5">
            <Header sidebarOpen={sidebarOpen} user={user} setSidebarOpen={setSidebarOpen} />
            {children}
          </div></> : <div className="relative flex flex-1 flex-col">{children}</div>
          }
   </>)
}