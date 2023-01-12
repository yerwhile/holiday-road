import { getData, setData } from "./dataAccess.js";
import { Attractions } from "./Attractions.js";
import { Eateries } from "./Eatery.js";

let foundParks = []
let foundAttractions = []
let foundEateries = []

export const SearchResults = () => {
    foundParks.length = 0
    foundAttractions.length = 0
    foundEateries.length = 0

    foundParks = getData("searchedParks").data
    foundAttractions = getData("searchedAttractions")
    foundEateries = getData("searchedEateries")

    let html = `
                <h3>Matching Parks</h3>      
                ${foundParks.map(
                    (parkObj) => {
                        return `
                        <div class="searchResults">
                            <p>${parkObj.fullName}</p>
                            <button class="button" id="addPark" name="${parkObj.id}">Add to Itinerary Preview</button>
                        </div>`
                    }
                 ).join("")}

                <h3>Matching Attractions</h3>    
                ${foundAttractions.map(
                    (attractionObj) => {
                        return `
                        <div class="searchResults">
                            <p>${attractionObj.name}</p>
                            <button class="button" id="addAttraction" name="${attractionObj.id}">Add to Itinerary Preview</button>
                        </div>`
                    }
                 ).join("")}
                <h3>Matching Eateries</h3>  
                ${foundEateries.map(
                    (eateryObj) => {
                        return `
                        <div class="searchResults">
                            <p>${eateryObj.businessName}</p>
                            <button class="button" id="addEatery" name="${eateryObj.id}">Add to Itinerary Preview</button>
                        </div>`
                    }
                 ).join("")}
    `
    return html
}

document.addEventListener("click", e => {
    if(e.target.id === "addPark") {
        setData("chosenPark", e.target.name);
        const chosenPark = getData("chosenPark")
        console.log(chosenPark)
        document.querySelector("#container").dispatchEvent(new CustomEvent("dropdownChanged"))
        document.querySelector("#container").dispatchEvent(new CustomEvent("parkSelected"))
    }
})


document.addEventListener("click", e => {
    if(e.target.id === "addAttraction") {
        setData("chosenAttraction", parseInt(e.target.name))
        document.querySelector("#container").dispatchEvent(new CustomEvent("dropdownChanged"))
        document.querySelector('#attractionsSelect').innerHTML = Attractions();
    }
})

document.addEventListener("click", e => {
    if(e.target.id === "addEatery") {
        setData("chosenEatery", parseInt(e.target.name))
        document.querySelector("#container").dispatchEvent(new CustomEvent("dropdownChanged"))
        document.querySelector('#eaterySelect').innerHTML = Eateries();
    }
})