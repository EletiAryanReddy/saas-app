export default function PricingCard(
{
 title,
 price
}:any
){

 return(

 <div>

  <h2>{title}</h2>

  <p>₹{price}</p>

 </div>

 );

}