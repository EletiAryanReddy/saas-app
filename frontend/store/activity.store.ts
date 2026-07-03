import { create }
from "zustand";

export const useActivityStore =
create((set)=>({

activities:[],
stats:{},

setActivities:
(activities:any)=>
set({
activities
}),

setStats:
(stats:any)=>
set({
stats
})

}));
