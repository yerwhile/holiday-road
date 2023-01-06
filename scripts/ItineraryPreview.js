import { getData, applicationState } from "./dataAccess.js";

export const ItineraryPreview = () => {
    const attractions = getData("attractions");
    let selectedAttractionName = "";
    for(const attraction of attractions) {
        if(attraction.id === parseInt(applicationState.chosenAttraction)) {
            selectedAttractionName = attraction.name;
        }
    }
    return `<div id="attractionPreview">Selected Attraction: ${selectedAttractionName}</div>`
}