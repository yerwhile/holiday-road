import { getData, applicationState } from "./dataAccess.js";

export const ItineraryPreview = () => {
    const attractions = getData("attractions");

    for(const attraction of attractions) {
        const selectedAttractionName = "";
        if(attraction.id === parseInt(applicationState.chosenAttraction)) {
            selectedAttractionName = attraction.name;
        }
        return selectedAttractionName;
    }

    return `<div id="attractionPreview">${selectedAttractionName}</div>`
}