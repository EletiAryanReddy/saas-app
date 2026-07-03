

import { create }
from "zustand";

export const useCalendarStore =
create((set)=>({

events:[],
currentEvent:null,

setEvents:
(events:any)=>
set({events}),

setCurrentEvent:
(currentEvent:any)=>
set({currentEvent})

}));
