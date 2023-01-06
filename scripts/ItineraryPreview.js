import { getData, applicationState } from "./dataAccess.js";

export const ItineraryPreview = () => {
    const parkData = getData("parks");
    const parks = parkData.data;
    const selectedPark = parks.find(park => park.id === applicationState.chosenPark);
    let selectedParkName = "";

    if (applicationState.chosenPark !== undefined) {
        selectedParkName = selectedPark.fullName;
    }

    const attractions = getData("attractions");
    let selectedAttractionName = "";
    for(const attraction of attractions) {
        if(attraction.id === parseInt(applicationState.chosenAttraction)) {
            selectedAttractionName = attraction.name;
        }
    }
    return `
        <div id="parkPreview">Selected Park: ${selectedParkName}</div>
        <div id="attractionPreview">Selected Attraction: ${selectedAttractionName}</div>`
}