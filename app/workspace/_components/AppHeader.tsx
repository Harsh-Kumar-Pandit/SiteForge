"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import "./AppHeader.css";

export function AppHeader() {
  return (
    <header className="sf-header-bar">
      <div className="sf-header-left">
        <SidebarTrigger className="sf-sidebar-trigger" />
      </div>

      <div className="sf-header-right">
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: 32,
                height: 32,
                borderRadius: "50%",
              },
            },
          }}
        />
      </div>
    </header>
  );
}