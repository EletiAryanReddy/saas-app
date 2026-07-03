import Channel from "./channel.model";

export const createChannel =
async(data:any)=>{
 return Channel.create(data);
};

export const getWorkspaceChannels =
async(workspaceId:string)=>{
 return Channel.find({
  workspaceId
 });
};

export const getChannelById =
async(id:string)=>{
 return Channel.findById(id);
};

export const sendMessage =
async(
 channelId:string,
 message:any
)=>{

 return Channel.findByIdAndUpdate(
  channelId,
  {
   $push:{
    messages:message
   }
  },
  {
   new:true
  }
 );

};

export const deleteChannel =
async(id:string)=>{
 return Channel.findByIdAndDelete(id);
};