/* 
    map through saved itineraries
    display names of park, attraction, and eatery
*/

import Settings from "./Settings.js";
import { applicationState, fetchForeignData, getData, mainContainer } from "./dataAccess.js";

const formatItinerary = (itinerary) => {
    const parks = getData("parks").data;
    const attractions = getData("attractions");
    const eateries = getData("eateries");

    const itinPark = parks.find(park => park.id === itinerary.parkId);
    const itinAttraction = attractions.find(attraction => attraction.id === itinerary.attractionId);
    const itinEateries = eateries.find(eatery => eatery.id === itinerary.eateryId)

    return `
        <div class="savedItinerary">
        <div id=eachItinerary>
            <div class="Itin-num">Itinerary #${itinerary.id}</div>
            <div>Park: ${itinPark.fullName}</div>
            <div>Attraction: ${itinAttraction.name}</div>
            <div>Eatery: ${itinEateries.businessName}</div>
            <button class="button" id="eventsBtn" name="events--${itinPark.id}">See Events</button>
            </div>
        </div>`
}

export const savedItineraries = () => {
    const itineraries = getData("itineraries");

    return `${itineraries.map(itinerary => formatItinerary(itinerary)).join("")}`
}


mainContainer.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "eventsBtn") {
            const [, parkID] = event.target.name.split('--')
            const parks = getData("parks").data
            const parkFound = parks.find((park) => park.id === parkID)
            fetchForeignData(`https://developer.nps.gov/api/v1/events?&parkCode=${parkFound.parkCode}&api_key=${Settings.npsKey}`, "eventParks")
                .then(() => {
                    const events = getData("eventParks").data
                    if (events[0] === undefined) {
                        window.alert("No Events Currently Booked At This Park, it's January, WHATTT ARRRRE YOU THINKKKING!:)")
                    }
                    if (events[0].feeinfo !== "") {
                        window.alert(`Title: ${events[0].title} \nDate: ${events[0].datestart} \nTime: ${events[0].times[0].timestart}  \nEnd: ${events[0].times[0].timeend} \n Description: ${events[0].description} \nFee Info: ${events[0].feeinfo}`)
                    }
                    else {
                        window.alert(`Title: ${events[0].title} \nDate: ${events[0].datestart} \nTime: ${events[0].times[0].timestart}  \nEnd: ${events[0].times[0].timeend} \n Description: ${events[0].description} \nFree`)
                    }
                })
        }
})




