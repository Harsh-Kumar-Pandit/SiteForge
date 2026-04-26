"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useContext, useState } from "react";
import "./AppSidebar.css";

// ── Icons (inline SVG — no extra dep) ──────────────────────────────────────

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.5 3.5A1 1 0 012.5 2.5H6l1.5 2H13a1 1 0 011 1v6a1 1 0 01-1 1H2.5a1 1 0 01-1-1v-8z"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path
      d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
    <path
      d="M16.17 10c0-.3-.03-.6-.07-.88l1.9-1.49-1.8-3.11-2.24.9a6.47 6.47 0 00-1.52-.88L12.1 2.5H7.9l-.34 2.04a6.47 6.47 0 00-1.52.88l-2.24-.9L2 7.63l1.9 1.49c-.04.28-.07.58-.07.88s.03.6.07.88L2 12.37l1.8 3.11 2.24-.9c.47.34.98.63 1.52.88L7.9 17.5h4.2l.34-2.04a6.47 6.47 0 001.52-.88l2.24.9L18 12.37l-1.9-1.49c.04-.28.07-.58.07-.88z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

// ── Types ───────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  name: string;
}


export function AppSidebar() {
  const [projectList] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const { userDetails } = useContext(UserDetailContext);
  const { user } = useUser();

  // Credits — pull from userDetails or default to 1
  const credits: number = userDetails?.credits ?? 1;
  const maxCredits = 10;
  const creditPercent = Math.min((credits / maxCredits) * 100, 100);

  const handleNewProject = () => {
    // TODO: wire up your new-project modal/route
    console.log("New project");
  };

  return (
    <Sidebar className="sf-sidebar">
      {/* ── Header ── */}
      <SidebarHeader>
        <div className="sf-header">
          <div className="sf-logo-wrap">
            {/* Fallback to star icon if /logo.svg is missing */}
            <StarIcon />
          </div>
          <span className="sf-brand">SiteForge</span>
        </div>

        {/* New Project */}
        <button className="sf-new-project-btn" onClick={handleNewProject}>
          <PlusIcon />
          Add New Project
        </button>
      </SidebarHeader>

      {/* ── Projects ── */}
      <SidebarContent>
        <p className="sf-section-label">Projects</p>

        <div className="sf-project-list">
          {projectList.length === 0 ? (
            <div className="sf-empty-state">
              <FolderIcon />
              <p>No projects yet.<br />Create one to get started.</p>
            </div>
          ) : (
            projectList.map((project) => (
              <div
                key={project.id}
                className={`sf-project-item ${activeProject === project.id ? "active" : ""}`}
                onClick={() => setActiveProject(project.id)}
              >
                <span className="dot" />
                {project.name}
              </div>
            ))
          )}
        </div>
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter>
        <div className="sf-footer">
          {/* Credits progress */}
          <div className="sf-credits-wrap">
            <div className="sf-credits-row">
              <span className="sf-credits-label">Remaining Credits</span>
              <span className="sf-credits-count">{credits}</span>
            </div>
            <div className="sf-progress-track">
              <div
                className="sf-progress-fill"
                style={{ width: `${creditPercent}%` }}
              />
            </div>
          </div>

          {/* Upgrade */}
          <button className="sf-upgrade-btn">
            Upgrade to Unlimited ✦
          </button>

          {/* Clerk user row */}
          <div className="sf-user-row">
            {/* Clerk's pre-built avatar + dropdown */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                  },
                },
              }}
            />
            <div className="sf-user-info">
              <div className="sf-user-name">
                {user?.fullName ?? user?.firstName ?? "Guest"}
              </div>
              <div className="sf-user-email">
                {user?.primaryEmailAddress?.emailAddress ?? ""}
              </div>
            </div>
            <span className="sf-settings-icon" title="Settings">
              <SettingsIcon />
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}