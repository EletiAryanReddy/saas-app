import PageHeader from "@/components/ui/PageHeader";
import SaaSCard from "@/components/ui/SaaSCard";

export default function AIPage() {
  return (
    <div>
      <PageHeader
        title="AI Assistant"
        subtitle="Generate ideas, automate tasks and summarize workspace data"
      />

      <SaaSCard>
        <h2 className="text-xl font-semibold">AI Workspace Assistant</h2>
        <p className="mt-2 text-[var(--muted)]">
          AI features are coming soon.
        </p>
      </SaaSCard>
    </div>
  );
}