import { getData, applicationState } from "./dataAccess.js";

export const ItineraryPreview = () => {
    const attractions = getData("attractions");
    let selectedAttractionName = "";
    for(const attraction of attractions) {
        if(attraction.id === parseInt(applicationState.chosenAttraction)) {
            selectedAttractionName = attraction.name;
        }
    }
    const eateries = getData("eateries");
    let selectedEateryName = "";
    for(const eatery of eateries) {
        if(eatery.id === parseInt(applicationState.chosenEatery)) {
            selectedEateryName = eatery.businessName;
        }
    }
    return `<div id="attractionPreview">Selected Attraction: ${selectedAttractionName}</div>
            <div id="eateryPreview">Selected Eatery: ${selectedEateryName}</div>`
}