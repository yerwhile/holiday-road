
import { getData, applicationState, mainContainer, postData } from "./dataAccess.js";

export const ItineraryPreview = () => {
    const parkData = getData("parks");
    const parks = parkData.data;
    const selectedPark = parks.find(park => park.id === applicationState.chosenPark);
    let selectedParkName = "";

    if (applicationState.chosenPark !== undefined && applicationState.chosenPark !== "0") {
        selectedParkName = selectedPark.fullName;
    }

    const attractions = getData("attractions");
    let selectedAttractionName = "";
    if(applicationState.chosenPark === "0") {
        selectedAttractionName = "";
    }
    else {
        for (const attraction of attractions) {
            if (attraction.id === parseInt(applicationState.chosenAttraction)) {
                selectedAttractionName = attraction.name;
            }
        }
    }

    const eateries = getData("eateries");
    let selectedEateryName = "";
    if(applicationState.chosenPark === "0") {
        selectedAttractionName = "";
    }
    else {
        for (const eatery of eateries) {
            if (eatery.id === parseInt(applicationState.chosenEatery)) {
                selectedEateryName = eatery.businessName;
            }
        }
    }
    return `
        <div id="parkPreview">Selected Park: ${selectedParkName} <button class="details-btn" id="details-btn-park">Details</button></div>
        <div id="attractionPreview">Selected Attraction: ${selectedAttractionName} <button class="details-btn" id="details-btn-attraction">Details</button></div>
        <div id="eateryPreview">Selected Eatery: ${selectedEateryName} <button class="details-btn" id="details-btn-eatery">Details</button></div>
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



mainContainer.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "details-btn-eatery") {
            const eateries = getData("eateries");
            let selectedEateryDetails = "";
            for (const eatery of eateries) {
                if (eatery.id === parseInt(applicationState.chosenEatery)) {
                    selectedEateryDetails = eatery.description;
                    window.alert(`${selectedEateryDetails}}`)
                }
            }
        }
    })

mainContainer.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "details-btn-attraction") {
            const attractions = getData("attractions");
            let selectedAttractionDetails = "";
            for (const attraction of attractions) {
                if (attraction.id === parseInt(applicationState.chosenAttraction)) {
                    selectedAttractionDetails = attraction.description;
                    window.alert(`${selectedAttractionDetails}}`)
                }
            }
        }
    })

    mainContainer.addEventListener(
        "click",
        (event) => {
            if (event.target.id === "details-btn-park") {
                const parks = getData("parks").data;
                let selectedParkDetails = "";
                for (const park of parks) {
                    if (park.id === applicationState.chosenPark) {
                        selectedParkDetails = park.description;
                        window.alert(`${selectedParkDetails}}`)
                    }
                }
            }
        })