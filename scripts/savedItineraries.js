/* 
    map through saved itineraries
    display names of park, attraction, and eatery
*/

import { getData } from "./dataAccess.js";

const formatItinerary = (itinerary) => {
    const parks = getData("parks").data;
    const attractions = getData("attractions");
    const eateries = getData("eateries");

    const itinPark = parks.find(park => park.id === itinerary.parkId);
    const itinAttraction = attractions.find(attraction => attraction.id === itinerary.attractionId);
    const itinEateries = eateries.find(eatery => eatery.id === itinerary.eateryId)

    return `
        <div class="savedItinerary">
            <div>Itinerary #${itinerary.id}</div>
            <div>Park: ${itinPark.fullName}</div>
            <div>Attraction: ${itinAttraction.name}</div>
            <div>Eatery: ${itinEateries.businessName}</div>
        </div>`
}

export const savedItineraries = () => {
    const itineraries = getData("itineraries");

    return `${itineraries.map(itinerary => formatItinerary(itinerary)).join("")}`
}