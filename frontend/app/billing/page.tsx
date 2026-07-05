import PageHeader from "@/components/ui/PageHeader";
import MetricCard from "@/components/ui/MetricCard";
import SaaSCard from "@/components/ui/SaaSCard";
import StatusBadge from "@/components/ui/StatusBadge";
import GradientButton from "@/components/ui/GradientButton";


export default function BillingPage() {
  return (
    <div>
      <PageHeader
        title="Billing & Subscription"
        subtitle="Manage your plan, usage and invoices"
        action={
          <button className="rounded-xl bg-[var(--primary)] px-5 py-2 text-white">
            Upgrade Plan
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-6">
        <SaaSCard>
          <p className="text-sm text-[var(--muted)]">Current Plan</p>
          <h2 className="mt-3 text-3xl font-bold">Pro Plan</h2>
          <p className="mt-2 text-[var(--muted)]">₹999 / month</p>
        </SaaSCard>

        <SaaSCard>
          <p className="text-sm text-[var(--muted)]">Usage</p>
          <h2 className="mt-3 text-3xl font-bold">51%</h2>
          <div className="mt-4 h-3 rounded-full bg-slate-800">
            <div className="h-3 w-1/2 rounded-full bg-[var(--primary)]" />
          </div>
        </SaaSCard>

        <SaaSCard>
          <p className="text-sm text-[var(--muted)]">Status</p>
          <h2 className="mt-3 text-3xl font-bold text-green-400">Active</h2>
          <p className="mt-2 text-[var(--muted)]">Your plan is active</p>
        </SaaSCard>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <SaaSCard>
          <h3 className="mb-4 text-xl font-semibold">Plan Features</h3>
          {[
            "Unlimited Projects",
            "Unlimited Members",
            "Advanced Analytics",
            "Priority Support",
          ].map((item) => (
            <p key={item} className="mb-3 text-sm text-[var(--muted)]">
              ✅ {item}
            </p>
          ))}
        </SaaSCard>

        <SaaSCard className="col-span-2">
          <h3 className="mb-4 text-xl font-semibold">Billing History</h3>
          {["Jul 03, 2026", "Jun 03, 2026", "May 03, 2026"].map((date) => (
            <div
              key={date}
              className="flex justify-between border-b border-[var(--border)] py-3 text-sm"
            >
              <span>{date}</span>
              <span>Pro Plan - Monthly</span>
              <span className="text-green-400">Paid</span>
              <span>₹999</span>
            </div>
          ))}
        </SaaSCard>
      </div>
    </div>
  );
}