
import MetricCard from "@/components/ui/MetricCard";
import DataTable from "@/components/ui/DataTable";
import SaaSCard from "@/components/ui/SaaSCard";
import PageHeader from "@/components/ui/PageHeader";
import BarChart from "@/components/ui/BarChart";
import ActivityTimeline from "@/components/ui/ActivityTimeline";


export default function AdminPage() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Monitor users, revenue and workspace health"
        action={
          <button className="rounded-xl border border-[var(--border)] px-5 py-2">
            Export Report
          </button>
        }
      />

      <div className="grid grid-cols-4 gap-6">
        <SaaSCard>
          <p className="text-[var(--muted)]">Total Users</p>
          <h2 className="mt-3 text-3xl font-bold">1,248</h2>
          <p className="text-sm text-green-400">+12.5%</p>
        </SaaSCard>

        <SaaSCard>
          <p className="text-[var(--muted)]">Active Workspaces</p>
          <h2 className="mt-3 text-3xl font-bold">320</h2>
          <p className="text-sm text-green-400">+8.2%</p>
        </SaaSCard>

        <SaaSCard>
          <p className="text-[var(--muted)]">Revenue</p>
          <h2 className="mt-3 text-3xl font-bold">₹24,580</h2>
          <p className="text-sm text-green-400">+16.7%</p>
        </SaaSCard>

        <SaaSCard>
          <p className="text-[var(--muted)]">System Health</p>
          <h2 className="mt-3 text-3xl font-bold">99.9%</h2>
          <p className="text-sm text-green-400">Operational</p>
        </SaaSCard>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <SaaSCard className="col-span-2">
          <h3 className="text-xl font-semibold">Revenue Overview</h3>
          <div className="mt-6 flex h-72 items-end gap-4">
            {[40, 55, 45, 70, 62, 80, 72, 90].map((h, i) => (
              <div
                key={i}
                className="w-full rounded-t-xl bg-gradient-to-t from-purple-600 to-blue-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </SaaSCard>

        <SaaSCard>
          <h3 className="text-xl font-semibold">Top Workspaces</h3>
          {["Aryan Workspace", "Design Team", "Dev Team", "Marketing Team"].map(
            (item, i) => (
              <div key={item} className="flex justify-between py-4">
                <span>{i + 1}. {item}</span>
                <span>₹{(4500 - i * 500).toLocaleString()}</span>
              </div>
            )
          )}
        </SaaSCard>
      </div>
    </div>
  );
}