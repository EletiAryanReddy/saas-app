"use client";

import PageHeader from "@/components/ui/PageHeader";
import SaaSCard from "@/components/ui/SaaSCard";

export default function DriveFolderPage() {
  return (
    <div>
      <PageHeader
        title="Drive Folder"
        subtitle="View and manage files inside this folder"
      />

      <SaaSCard>
        <p className="text-[var(--muted)]">
          Folder files will appear here.
        </p>
      </SaaSCard>
    </div>
  );
}