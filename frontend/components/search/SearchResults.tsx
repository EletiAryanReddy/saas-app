export default function SearchResults({
results
}:any){

if(!results)
return null;

return(

<div>

<h2>Tasks</h2>

<pre>
{JSON.stringify(
results.tasks,
null,
2
)}
</pre>

<h2>Files</h2>

<pre>
{JSON.stringify(
results.files,
null,
2
)}
</pre>

<h2>Meetings</h2>

<pre>
{JSON.stringify(
results.meetings,
null,
2
)}
</pre>

<h2>Events</h2>

<pre>
{JSON.stringify(
results.events,
null,
2
)}
</pre>

</div>

);

}