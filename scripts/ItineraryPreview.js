import { getData, applicationState, mainContainer } from "./dataAccess.js";

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
    for (const attraction of attractions) {
        if (attraction.id === parseInt(applicationState.chosenAttraction)) {
            selectedAttractionName = attraction.name;
        }
    }

    const eateries = getData("eateries");
    let selectedEateryName = "";
    for (const eatery of eateries) {
        if (eatery.id === parseInt(applicationState.chosenEatery)) {
            selectedEateryName = eatery.businessName;
        }
    }
    return `
        <div id="parkPreview">Selected Park: ${selectedParkName} <button class="details-btn" id="details-btn-park">Details</button></div>
        <div id="attractionPreview">Selected Attraction: ${selectedAttractionName} <button class="details-btn-attraction" id="details-btn-attraction">Details</button></div>
        <div id="eateryPreview">Selected Eatery: ${selectedEateryName} <button name="eateryDetails" class="details-btn" id="details-btn-eatery">Details</button></div>`
}

mainContainer.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "details-btn-eatery") {
            // applicationState.chosenEatery = document.querySelector("button[name='eateryDetails']").value
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
            // applicationState.chosenEatery = document.querySelector("button[name='eateryDetails']").value
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
                // applicationState.chosenEatery = document.querySelector("button[name='eateryDetails']").value
                const parkss = getData("parks");
                let selectedparksDetails = "";
                for (const parks of parkss) {
                    if (parks.id === parseInt(applicationState.chosenparks)) {
                        selectedparksDetails = parks.description;
                        window.alert(`${selectedparksDetails}}`)
                    }
                }
            }
        })