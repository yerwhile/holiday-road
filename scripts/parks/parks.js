/* 
    Make function that returns select with a map of parks inside 
    map calls format function with each park as parameter
    format function turns each park into an option with a value equal to the park id
*/

import { getData } from "../dataAccess.js"

const formatParks = (park) => {
    return `
        <option value="${park.id}">${park.fullName}</option>`
}

export const selectParks = () => {
    const parkData = getData("parks");
    const parks = parkData.data;

    return `
        <select name="parks" id="parkSelect">
            <option value="">Choose Option</option>
            ${parks.map(park => formatParks(park)).join("")}
        </select>`
}