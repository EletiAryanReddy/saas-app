import { User, Mail, Shield, Building2, CalendarDays } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Aryan Reddy",
    role: "Administrator",
    workspace: "Aryan Workspace",
    plan: "Pro Plan",
    email: "aryanreddy@example.com",
    joined: "Feb 2026",
  };

  return (
    <main className="min-h-screen bg-[#070b16] text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Profile</h1>
      <p className="text-slate-400 mb-8">Manage your personal information</p>

      <section className="rounded-3xl border border-white/10 bg-[#101827] p-8 max-w-4xl">
        <div className="flex items-center gap-6 border-b border-white/10 pb-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
            AR
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-slate-400">{user.role}</p>
            <span className="mt-3 inline-block rounded-full bg-purple-500/20 px-4 py-1 text-sm text-purple-300">
              {user.plan}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <Info icon={<User />} label="Full Name" value={user.name} />
          <Info icon={<Mail />} label="Email Address" value={user.email} />
          <Info icon={<Shield />} label="Role" value={user.role} />
          <Info icon={<Building2 />} label="Workspace" value={user.workspace} />
          <Info icon={<CalendarDays />} label="Joined" value={user.joined} />
        </div>
      </section>
    </main>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex gap-4 items-center">
      <div className="text-purple-400">{icon}</div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}