/* 
    Make function that returns select with a map of parks inside 
    map calls format function with each park as parameter
    format function turns each park into an option with a value equal to the park id
*/

import { getData, mainContainer, applicationState } from "../dataAccess.js"

const formatParks = (park) => {
    return `
        <option value="${park.id}">${park.fullName}</option>`
}

export const selectParks = () => {
    const parkData = getData("parks");
    const parks = parkData.data;

    return `<select name="parks" id="parkSelect">
            <option value="0">Choose Option</option>
            ${parks.map(park => formatParks(park)).join("")}
        </select>`
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if(event.target.id === "parkSelect") {
            applicationState.chosenPark = document.querySelector("select[name='parks']").value
            document.querySelector("#container").dispatchEvent(new CustomEvent("dropdownChanged"))
            document.querySelector("#container").dispatchEvent(new CustomEvent("parkSelected"))
        }
    })