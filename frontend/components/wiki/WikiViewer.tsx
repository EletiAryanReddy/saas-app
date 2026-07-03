export default function WikiViewer(
{
 wiki
}:any
){

 if(!wiki)
 return null;

 return(

  <div>

   <h1>
    {wiki.title}
   </h1>

   <hr/>

   <p>
    {wiki.content}
   </p>

  </div>

 );

}