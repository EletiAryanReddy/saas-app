interface Props{
 mute:()=>void;
 camera:()=>void;
 leave:()=>void;
}

export default function Controls(
{
 mute,
 camera,
 leave
}:Props){

 return(

  <div
   className="
   flex
   gap-3
   mt-4"
  >

   <button
    onClick={mute}
   >
    Mute
   </button>

   <button
    onClick={camera}
   >
    Camera
   </button>

   <button
    onClick={leave}
   >
    Leave
   </button>

  </div>

 );
}