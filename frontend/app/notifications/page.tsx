"use client";

import {
 useEffect,
 useState
}
from "react";

import {
 getNotifications
}
from "@/services/api/notification.service";

import NotificationList
from "@/components/notification/NotificationList";

export default function
NotificationsPage() {

 const [
 notifications,
 setNotifications
 ]=useState([]);

 useEffect(()=>{

  loadNotifications();

 },[]);

 const loadNotifications=
 async()=>{

  const res=
  await getNotifications(
   "USER_ID"
  );

  setNotifications(
   res.data
  );

 };

 return (

  <div>

   <h1>
    Notifications
   </h1>

   <NotificationList
   notifications={
    notifications
   }
   />

  </div>

 );

}