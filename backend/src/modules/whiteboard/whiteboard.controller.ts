
import { Request, Response } from "express";

import {
createWhiteboard,
getWorkspaceWhiteboards,
getWhiteboardById,
updateWhiteboard,
addElement,
clearWhiteboard,
duplicateWhiteboard,
searchWhiteboards,
getWhiteboardStats,
deleteWhiteboard
} from "./whiteboard.service";

export const createWhiteboardController =
async (
req: Request,
res: Response
) => {

try {

const board =
await createWhiteboard(
  req.body
);

res.json({
  success:true,
  board
});

} catch(error){

console.log(error);

res.status(500).json({
  success:false,
  message:
  "Failed To Create Whiteboard"
});

}

};

export const getWorkspaceWhiteboardsController =
async (
req: Request,
res: Response
) => {

try {

const boards =
await getWorkspaceWhiteboards(
  req.params.workspaceId
);

res.json(boards);

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Failed To Fetch Whiteboards"
});

}

};

export const getWhiteboardController =
async (
req: Request,
res: Response
) => {

try {

const board =
await getWhiteboardById(
  req.params.boardId
);

if(!board){

  return res.status(404).json({
    success:false,
    message:
    "Whiteboard Not Found"
  });

}

res.json(board);

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Failed To Fetch Whiteboard"
});

}

};

export const updateWhiteboardController =
async (
req: Request,
res: Response
) => {

try {

const board =
await updateWhiteboard(
  req.params.boardId,
  req.body
);

if(!board){

  return res.status(404).json({
    success:false,
    message:
    "Whiteboard Not Found"
  });

}

res.json({
  success:true,
  board
});

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Failed To Update Whiteboard"
});

}

};

export const addElementController =
async (
req: Request,
res: Response
) => {

try {

const board =
await addElement(
  req.params.boardId,
  req.body
);

res.json({
  success:true,
  board
});

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Failed To Add Element"
});


}

};

export const clearWhiteboardController =
async (
req: Request,
res: Response
) => {

try {

const board =
await clearWhiteboard(
  req.params.boardId
);

res.json({
  success:true,
  board
});

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Failed To Clear Whiteboard"
});
}

};

export const duplicateWhiteboardController =
async (
req: Request,
res: Response
) => {

try {

const board =
await duplicateWhiteboard(
  req.params.boardId
);

res.json({
  success:true,
  board
});

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Failed To Duplicate Whiteboard"
});

}

};

export const searchWhiteboardsController =
async (
req: Request,
res: Response
) => {

try {

const boards =
await searchWhiteboards(
  req.params.workspaceId,
  req.query.keyword as string
);

res.json(boards);

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Search Failed"
});
}

};

export const getWhiteboardStatsController =
async (
req: Request,
res: Response
) => {

try {

const stats =
await getWhiteboardStats(
  req.params.workspaceId
);

res.json(stats);

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Failed To Fetch Stats"
});

}

};

export const deleteWhiteboardController =
async (
req: Request,
res: Response
) => {

try {

const board =
await deleteWhiteboard(
  req.params.boardId
);

if(!board){

  return res.status(404).json({
    success:false,
    message:
    "Whiteboard Not Found"
  });

}

res.json({
  success:true,
  message:
  "Whiteboard Deleted Successfully"
});

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Failed To Delete Whiteboard"
});

}

};
