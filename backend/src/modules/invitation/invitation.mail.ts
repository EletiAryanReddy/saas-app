import nodemailer from "nodemailer";

export const sendInviteMail =
async(
 email:string,
 workspaceId:string
)=>{

 const transporter =
 nodemailer.createTransport({
  service:"gmail",
  auth:{
   user:process.env.EMAIL,
   pass:process.env.EMAIL_PASS
  }
 });

 await transporter.sendMail({
  from:process.env.EMAIL,
  to:email,
  subject:"Workspace Invitation",
  html:`
   <h2>Invitation</h2>
   <p>You have been invited.</p>
   <a href="http://localhost:3000/invitations">
   Accept Invitation
   </a>
  `
 });

};