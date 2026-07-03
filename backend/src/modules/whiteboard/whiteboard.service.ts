
import Whiteboard from "./whiteboard.model";

export const createWhiteboard =
async (
data:any
) => {

return await Whiteboard.create(
data
);

};

export const getWorkspaceWhiteboards =
async (
workspaceId:string
) => {

return await Whiteboard.find({
workspaceId
})
.sort({
createdAt:-1
});

};

export const getWhiteboardById =
async (
boardId:string
) => {

return await Whiteboard.findById(
boardId
);

};

export const updateWhiteboard =
async (
boardId:string,
updateData:any
) => {

return await Whiteboard.findByIdAndUpdate(
boardId,
updateData,
{
returnDocument:"after"
}
);

};

export const saveWhiteboardElements =
async (
boardId:string,
elements:any
) => {

return await Whiteboard.findByIdAndUpdate(
boardId,
{
elements
},
{
returnDocument:"after"
}
);

};

export const addElement =
async (
boardId:string,
element:any
) => {

return await Whiteboard.findByIdAndUpdate(
boardId,
{
$push:{
elements:element
}
},
{
returnDocument:"after"
}
);

};

export const clearWhiteboard =
async (
boardId:string
) => {

return await Whiteboard.findByIdAndUpdate(
boardId,
{
elements:[]
},
{
returnDocument:"after"
}
);

};

export const duplicateWhiteboard =
async (
boardId:string
) => {

const board =
await Whiteboard.findById(
boardId
);

if(!board){
return null;
}

const newBoard =
await Whiteboard.create({

workspaceId:
board.workspaceId,

title:
`${board.title} Copy`,

createdBy:
board.createdBy,

elements:
board.elements
});

return newBoard;

};

export const deleteWhiteboard =
async (
boardId:string
) => {

return await Whiteboard.findByIdAndDelete(
boardId
);

};

export const searchWhiteboards =
async (
workspaceId:string,
keyword:string
) => {

return await Whiteboard.find({

workspaceId,

title:{
  $regex:keyword,
  $options:"i"
}
});

};

export const getWhiteboardStats =
async (
workspaceId:string
) => {

const boards =
await Whiteboard.find({
workspaceId
});

const totalBoards =
boards.length;

const totalElements =
boards.reduce(
(
sum:number,
board:any
)=>
sum +
(
board.elements?.length || 0
),
0
);

return {

totalBoards,

totalElements

};

};
