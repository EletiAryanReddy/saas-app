"use client";

import GlobalSearch
from "@/components/search/GlobalSearch";

import SearchResults
from "@/components/search/SearchResults";

import {
searchWorkspace
}
from "@/services/api/search.service";

import {
useSearchStore
}
from "@/store/search.store";

export default function SearchPage(){

const {
results,
setResults
} =
useSearchStore();

const search =
async (
query:string
)=>{

const data =
await searchWorkspace(
"6a2c2c86bd54aa6fdf34690a",
query
);

setResults(
data.results
);

};

return(

<div>

<h1>
Global Search
</h1>

<GlobalSearch
onSearch={search}
/>

<SearchResults
results={results}
/>

</div>

);

}