
import { SearchResults } from "./SearchResults.js";
import { fetchForeignData } from "./dataAccess.js";

export const UserSearch = () => {

    return `
        <h3 class="itinHeader">Search</h3>
        <label for="site-search" class="itinSelector">Search All Destinations:</label>
        <input type="search" id="site-search" name="q">
        <button class="button" id="searchButton">Search</button>`
}

document.addEventListener("click", e => {
    let searchStr = ""

    if (e.target.id === "searchButton" && document.querySelector("#site-search").value !== "") {
        searchStr = document.querySelector("#site-search").value

        fetchForeignData(`http://holidayroad.nss.team/bizarreries?q=${searchStr}`, "searchedAttractions")
            .then(() => fetchForeignData(`http://holidayroad.nss.team/eateries?q=${searchStr}`, "searchedEateries"))
            .then(() => fetchForeignData(`https://developer.nps.gov/api/v1/parks?q=${searchStr}&api_key=trgzF3qE57k0BZoSZEp86ZDzSoCqLCYl05UQv66X`, "searchedParks"))
            .then(() => document.querySelector("#searchResults").innerHTML = SearchResults())
    }

})
