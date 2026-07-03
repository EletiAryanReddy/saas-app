
import { create }
from "zustand";

export const useAutomationStore =
create((set)=>({

automations:[],
logs:[],

setAutomations:
(data:any)=>
set({
automations:data
}),

setLogs:
(data:any)=>
set({
logs:data
})

}));
