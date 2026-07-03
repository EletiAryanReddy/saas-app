export default function
NotificationItem({
 notification
}:any) {

 return (

  <div className="border p-3">

   <h3>
    {notification.title}
   </h3>

   <p>
    {notification.message}
   </p>

  </div>

 );

}