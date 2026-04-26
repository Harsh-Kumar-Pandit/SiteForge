import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import { AppHeader } from "./_components/AppHeader";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar/>
    <div className="flex flex-col flex-1 w-full">
      <AppHeader/>
      {children}
    </div>
    </SidebarProvider>
  );
}

export default Layout;