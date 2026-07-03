
import { create }
from "zustand";

export const useWhiteboardStore =
create((set)=>({

boards:[],
currentBoard:null,
elements:[],

setBoards:
(boards:any)=>
set({boards}),

setCurrentBoard:
(currentBoard:any)=>
set({currentBoard}),

setElements:
(elements:any)=>
set({elements})

}));
