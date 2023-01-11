/* 
    Make function that returns select with a map of parks inside 
    map calls format function with each park as parameter
    format function turns each park into an option with a value equal to the park id
*/

import { getData, mainContainer, setData } from "../dataAccess.js"

export const selectParks = () => {
    const parks = getData("parks").data;
    const chosenPark = getData("chosenPark");
    let html = `<select name="parks" id="parksSelect">
    <option value="0">Choose Park</option>`

    for(const park of parks) {
        if(chosenPark === park.id) {
            html += `<option selected value="${park.id}">${park.fullName}</option>`
        }
        else {
            html += `<option value="${park.id}">${park.fullName}</option>`
        }
    }

    html += `</select>`

    return html;
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if(event.target.id === "parksSelect") {
            setData("chosenPark", document.querySelector("select[name='parks']").value);
            document.querySelector("#container").dispatchEvent(new CustomEvent("dropdownChanged"))
            document.querySelector("#container").dispatchEvent(new CustomEvent("parkSelected"))
        }
    })