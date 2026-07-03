import CommentItem
from "./CommentItem";

export default function
CommentList({
 comments
}:any){

 return(

  <div>

   {
    comments.map(
     (comment:any)=>(
      <CommentItem
      key={comment._id}
      comment={comment}
      />
     )
    )
   }

  </div>

 );

}