import Comment from "./comment.model";

export const createComment =
async(data:any)=>{
 return Comment.create(data);
};


export const getComments =
async(
 entityId:string
)=>{
 return Comment.find({
  entityId
 })
 .populate(
  "userId",
  "name email"
 )
 .sort({
  createdAt:-1
 });
};


export const updateComment = async (
  id: string,
  comment: string
) => {
  return Comment.findByIdAndUpdate(
    id,
    { comment },
    { new: true }
  );
};

export const deleteComment =
async(id:string)=>{
 return Comment.findByIdAndDelete(id);
};