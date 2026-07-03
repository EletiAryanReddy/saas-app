export default function
CommentItem({
 comment
}:any){

 return(

  <div className="border p-2">

   <h4>
    {
      comment.userId?.name
    }
   </h4>

   <p>
    {comment.comment}
   </p>

  </div>

 );

}