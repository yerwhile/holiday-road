import { getData, mainContainer, setData } from "../dataAccess.js";

export const getStateByChosenPark = () => {
    const parks = getData("parks").data;
    const chosenPark = getData("chosenPark");
    let chosenParkState = ""
    for(const park of parks) {
        if(park.id === chosenPark) {
            chosenParkState = park.addresses[0].stateCode;
        }
    }
    return chosenParkState;
}

export const Attractions = () => {
    const attractions = getData("attractions");
    const chosenPark = getData("chosenPark");
    const chosenAttraction = getData("chosenAttraction");

    let html = `
    <label class="label" for="attractionsSelect">Attractions</label>`
    if(typeof chosenPark === 'undefined' || chosenPark === 0) {
        html += `<select name="attractionSelect" id="attractions" disabled>`
        setData("chosenAttraction", undefined)
    }
    else {
        html += `<select name="attractionSelect" id="attractions">`
    }
    html += `<option value="0">Choose Attraction</option>`
    
    const chosenState = getStateByChosenPark()
    const attractionsFilteredByState = [];
    for(const attraction of attractions) {
        if(attraction.state === chosenState) {
            attractionsFilteredByState.push(attraction)
        }
    }

    for(const filteredAttraction of attractionsFilteredByState) {
        if(chosenAttraction === filteredAttraction.id) {
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
            setData("chosenAttraction", document.querySelector("select[name='attractionSelect']").value);
            document.querySelector("#container").dispatchEvent(new CustomEvent("dropdownChanged"))
        }
    })