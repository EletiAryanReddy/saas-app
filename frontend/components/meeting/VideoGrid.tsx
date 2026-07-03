interface Props{
 streams:MediaStream[];
}

export default function VideoGrid(
{
 streams
}:Props){

 return(

  <div
   className="
   grid
   grid-cols-2
   gap-4"
  >

   {
    streams.map(
     (
      stream,
      index
     )=>(
      <video
       key={index}
       autoPlay
       playsInline
       ref={(video)=>{

        if(
         video
        ){

         video.srcObject =
         stream;

        }
       }}
      />
     )
    )
   }

  </div>

 );
}