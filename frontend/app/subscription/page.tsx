"use client";

import { useEffect, useState } from "react";
import { Crown, CheckCircle, CreditCard } from "lucide-react";

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<any>(null);
  const workspaceId =
    typeof window !== "undefined"
      ? localStorage.getItem("workspaceId")
      : null;

  useEffect(() => {
    async function fetchSubscription() {
      if (!workspaceId) return;

      const res = await fetch(
        `http://localhost:5000/api/subscription/workspace/${workspaceId}`
      );

      const data = await res.json();
      setSubscription(data);
    }

    fetchSubscription();
  }, [workspaceId]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="text-slate-400 mt-1">
          Manage your workspace plan and billing.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-purple-600/20 flex items-center justify-center">
            <Crown className="text-purple-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {subscription?.plan || "FREE"} Plan
            </h2>
            <p className="text-slate-400">
              Status: {subscription?.status || "No subscription found"}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          <Card title="Amount" value={`₹${subscription?.amount || 0}`} />
          <Card
            title="Start Date"
            value={
              subscription?.startDate
                ? new Date(subscription.startDate).toLocaleDateString()
                : "Not available"
            }
          />
          <Card
            title="End Date"
            value={
              subscription?.endDate
                ? new Date(subscription.endDate).toLocaleDateString()
                : "Not available"
            }
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <PlanCard plan="FREE" price="₹0" />
        <PlanCard plan="PRO" price="₹999" popular />
        <PlanCard plan="BUSINESS" price="₹2999" />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-950 border border-white/10 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-xl font-bold mt-2">{value}</p>
    </div>
  );
}

function PlanCard({
  plan,
  price,
  popular,
}: {
  plan: string;
  price: string;
  popular?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      {popular && (
        <span className="text-xs bg-purple-600 px-3 py-1 rounded-full">
          Popular
        </span>
      )}

      <h3 className="text-2xl font-bold mt-4">{plan}</h3>
      <p className="text-3xl font-bold mt-3">{price}</p>

      <div className="space-y-3 mt-6 text-slate-300">
        <p className="flex gap-2">
          <CheckCircle className="text-green-400" size={18} /> Projects
        </p>
        <p className="flex gap-2">
          <CheckCircle className="text-green-400" size={18} /> Team Members
        </p>
        <p className="flex gap-2">
          <CheckCircle className="text-green-400" size={18} /> Analytics
        </p>
      </div>

      <button className="w-full mt-6 bg-blue-600 py-3 rounded-xl flex items-center justify-center gap-2">
        <CreditCard size={18} />
        Choose Plan
      </button>
    </div>
  );
}