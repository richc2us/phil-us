import React from "react";
import { auth } from "@/lib/nextAuthOptions";
import { redirect } from "next/navigation";
import MainPageLayout from "./MainPageLayout";

export default async function DefaultLayout({children}: {children: React.ReactNode}) {
  const user = await auth()
  if(!user) {
      redirect("/user/signin")
  }
  return ( <MainPageLayout user={user}>{children}</MainPageLayout> );
}
