export default function PendingInvites(
{
 invitations
}:any
){

 return(

  <div>

   {
    invitations
    .filter(
      (i:any)=>
      i.status==="PENDING"
    )
    .map(
      (invite:any)=>(

       <div
        key={invite._id}
       >
        {invite.email}
       </div>

      ))
   }

  </div>

 );

}