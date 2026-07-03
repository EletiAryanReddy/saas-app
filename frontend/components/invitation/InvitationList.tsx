export default function InvitationList(
{
 invitations
}:any
){

 return(

  <div>

   {
    invitations.map(
    (invite:any)=>(

     <div
      key={invite._id}
     >

      {invite.email}
      -
      {invite.status}

     </div>

    ))
   }

  </div>

 );

}