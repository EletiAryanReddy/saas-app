import { Request, Response }
from "express";

import {
 createChannel,
 getWorkspaceChannels,
 getChannelById,
 sendMessage,
 deleteChannel
}
from "./channel.service";

export const createChannelController =
async(req,res)=>{

 const channel =
 await createChannel(
  req.body
 );

 res.json({
  success:true,
  channel
 });

};

export const getChannelsController =
async(req,res)=>{

 const channels =
 await getWorkspaceChannels(
  String(req.params.workspaceId)
 );

 res.json(channels);

};

export const getChannelController =
async(req,res)=>{

 const channel =
 await getChannelById(
  String(req.params.channelId)
 );

 res.json(channel);

};

export const sendMessageController =
async(req,res)=>{

 const channel =
 await sendMessage(
  String(req.params.channelId),
  req.body
 );

 res.json({
  success:true,
  channel
 });

};

export const deleteChannelController =
async(req,res)=>{

 await deleteChannel(
  String(req.params.channelId)
 );

 res.json({
  success:true
 });

};
