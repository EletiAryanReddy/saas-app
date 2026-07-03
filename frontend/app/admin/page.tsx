"use client";

import AdminStats
from "@/components/admin/AdminStats";

import UserTable
from "@/components/admin/UserTable";

import WorkspaceTable
from "@/components/admin/WorkspaceTable";

import RevenueChart
from "@/components/admin/RevenueChart";

export default function AdminPage(){

return(

<div className="p-5">

<h1>
Admin Dashboard
</h1>

<AdminStats/>

<RevenueChart/>

<UserTable/>

<WorkspaceTable/>

</div>

);

}