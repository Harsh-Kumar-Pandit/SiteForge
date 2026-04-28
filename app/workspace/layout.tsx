import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import { AppHeader } from "./_components/AppHeader";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider className="h-screen">
      <AppSidebar />
      <div className="flex flex-col flex-1 w-full h-screen">
        <AppHeader />
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;