import ThemeToggle from "@/components/settings/ThemeToggle";

export default function SettingsPage(){

return(

<div className="space-y-8">

<h1 className="text-3xl font-bold">
Settings
</h1>

<div
className="
bg-[var(--card)]
border
border-[var(--border)]
rounded-2xl
p-6
"
>

<h2 className="text-xl font-semibold mb-4">
Appearance
</h2>

<ThemeToggle/>

</div>

</div>

);

}