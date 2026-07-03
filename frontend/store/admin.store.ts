import { create }
from "zustand";

interface AdminStore {

dashboard:any;

setDashboard:
(data:any)=>void;

}

export const useAdminStore =
create<AdminStore>(
(set)=>({

dashboard:null,

setDashboard:
(data)=>
set({
dashboard:data
})

})
);