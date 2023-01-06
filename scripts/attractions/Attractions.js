import { getData, mainContainer, applicationState } from "../dataAccess.js";

export const getStateByChosenPark = () => {
    const parks = getData("parks").data
    let chosenParkState = ""
    for(const park of parks) {
        if(park.id === applicationState.chosenPark) {
            chosenParkState = park.addresses[0].stateCode;
        }
    }
    return chosenParkState;
}

export const Attractions = () => {
    const attractions = getData("attractions");


    let html = `
    <label class="label" for="attractionsSelect">Attractions</label>`
    if(typeof applicationState.chosenPark === 'undefined') {
        html += `<select name="attractionSelect" id="attractions" disabled>`
    }
    else {
        html += `<select name="attractionSelect" id="attractions">`
    }
    html += `<option value="0">Choose Attraction</option>`
    
    const attractionsFilteredByState = [];
    const chosenState = getStateByChosenPark()
    for(const attraction of attractions) {
        if(attraction.state === chosenState) {
            attractionsFilteredByState.push(attraction)
        }
    }

    for(const filteredAttraction of attractionsFilteredByState) {
        if(parseInt(applicationState.chosenAttraction) === filteredAttraction.id) {
            html += `<option selected value="${filteredAttraction.id}">${filteredAttraction.name}</option>`;
        } 
        else {
        html += `<option value="${filteredAttraction.id}">${filteredAttraction.name}</option>`;
        }
    }
    html += `</select>`
    return html;
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if(event.target.id === "attractions") {
            applicationState.chosenAttraction = document.querySelector("select[name='attractionSelect']").value
            document.querySelector("#container").dispatchEvent(new CustomEvent("dropdownChanged"))
        }
    })