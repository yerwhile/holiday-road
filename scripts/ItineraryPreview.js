
import { getData, applicationState, mainContainer, postData, setData } from "./dataAccess.js";

export const ItineraryPreview = () => {
    const parks = getData("parks").data;
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
    reset page data
*/

const resetTransientData = () => {
    setData("chosenPark", undefined);
    setData("chosenAttraction", undefined);
    setData("chosenEatery", undefined)
}

document.addEventListener("click", e => {
	const clickTarget = e.target;

	if (clickTarget.id === "submitItinerary") {
        const selectedPark = getData("chosenPark");
		const selectedAttraction = getData("chosenAttraction");
        const selectedEatery = getData("chosenEatery");

        if (selectedPark !== undefined && parseInt(selectedAttraction) > 0 && parseInt(selectedEatery) > 0) {
            const savedItinerary = {
                "parkId": selectedPark,
                "attractionId": parseInt(selectedAttraction),
                "eateryId": parseInt(selectedEatery)
            }

            postData("itineraries", savedItinerary)
                .then(() => resetTransientData())
                .then(() => mainContainer.dispatchEvent(new CustomEvent("stateChanged")))
        }
    }      
})

// Detail Buttons

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