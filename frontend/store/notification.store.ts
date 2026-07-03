import { create }
from "zustand";

interface NotificationStore {

 notifications:any[];

 setNotifications:
 (notifications:any[])=>void;

 addNotification:
 (notification:any)=>void;

}

export const useNotificationStore =
create<NotificationStore>(
(set)=>({

 notifications:[],

 setNotifications:
 (notifications)=>
 set({
  notifications
 }),

 addNotification:
 (notification)=>
 set((state)=>({

 notifications:[
  notification,
  ...state.notifications
 ]

 })),

}))
);