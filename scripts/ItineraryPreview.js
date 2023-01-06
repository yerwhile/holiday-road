import { getData, applicationState, postData } from "./dataAccess.js";

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
    
    const eateries = getData("eateries");
    let selectedEateryName = "";
    for(const eatery of eateries) {
        if(eatery.id === parseInt(applicationState.chosenEatery)) {
            selectedEateryName = eatery.businessName;
        }
    }
    return `
        <div id="parkPreview">Selected Park: ${selectedParkName}</div>
        <div id="attractionPreview">Selected Attraction: ${selectedAttractionName}</div>
        <div id="eateryPreview">Selected Eatery: ${selectedEateryName}</div>
        <button class="button" id="submitItinerary">Save Itinerary</button>`
}

/* 
    Event listener for when submit button is clicked
    get form data
    check if any fields are empty
    create object with appropriate data
    send it to saved itinerary list in database
*/

document.addEventListener("click", e => {
	const clickTarget = e.target;

	if (clickTarget.id === "submitItinerary") {
        const selectedPark = applicationState.chosenPark;
		const selectedAttraction = applicationState.chosenAttraction;
        const selectedEatery = applicationState.chosenEatery;

        if (selectedPark != false || selectedAttraction != false || selectedEatery != false) {
            const savedItinerary = {
                "parkId": selectedPark,
                "attractionId": selectedAttraction,
                "eateryId": selectedEatery
            }

            postData("itineraries", savedItinerary);
        }
    }      
})