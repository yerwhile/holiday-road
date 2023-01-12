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
            <div class="savedItineraryCont">
                <div class="itinInfo">
                    <div class="Itin-num">Saved Itinerary #${itinerary.id}</div>
                    <div>Park: ${itinPark.fullName}</div>
                    <div>Attraction: ${itinAttraction.name}</div>
                    <div>Eatery: ${itinEateries.businessName}</div>
                </div>
                <div>
                    <button class="button" id="eventsBtn" name="events--${itinPark.id}">See Events</button>
                    <button class="button" id="directionsButton" name="itin--${itinerary.id}">Get Directions</button>
                </div>
            </div>
        </div>`
}

export const savedItineraries = () => {
    const itineraries = getData("itineraries");

    return `${itineraries.map(itinerary => formatItinerary(itinerary)).join("")}`
}

/* 
    GET DIRECTIONS
    When a button on a saved itinerary is hit, take the city property from park, attraction, and eatery
    plug it into a function that will fetch the lat and longitude from the geocoding API for each
    plug THAT into a geographer API fetch
    take that and make it into readable data
*/

mainContainer.addEventListener(
    "click",
    (event) => {
        const clickTarget = event.target;

        if (clickTarget.id === "directionsButton") {
            const [,itinId] = clickTarget.name.split("--");

            // get Lists
            const itineraries = getData("itineraries");
            const parks = getData("parks").data;
            const attractions = getData("attractions");
            const eateries = getData("eateries");

            // get specifics
            const itinerary = itineraries.find((itinerary) => itinerary.id === parseInt(itinId));
            const itinPark = parks.find(park => park.id === itinerary.parkId);
            const itinAttraction = attractions.find(attraction => attraction.id === itinerary.attractionId);
            const itinEateries = eateries.find(eatery => eatery.id === itinerary.eateryId)

            // get park coords
            const parkLat = itinPark.latitude;
            const parkLong = itinPark.longitude;

            // get cities
            const attractionCity = itinAttraction.city;
            const eateryCity = itinEateries.city;

            // send lat and long to directions api
            const sendCoords =  (attrCoords, eatCoords) => {
                    fetchForeignData(`https://graphhopper.com/api/1/route?point=36.1622767,-86.7742984&point=${parkLat},${parkLong}&point=${attrCoords[0]},${attrCoords[1]}&point=${eatCoords[0]},${eatCoords[1]}&key=${Settings.graphhopperKey}`, "directions")
                        .then(() => {
                            const directions = getData("directions");
                            document.querySelector("#container").dispatchEvent(new CustomEvent("getDirections"))
                            console.log(directions);
                        })

            }

            // get lat and long
            const getCoords = () => {
                const attractionLocation = getData("attractionCity").hits[0];
                const attractionLat = attractionLocation.point.lat;
                const attractionLong = attractionLocation.point.lng;
                const attractionCoords = [attractionLat, attractionLong];

                const eateryLocation = getData("eateryCity").hits[0];
                const eateryLat = eateryLocation.point.lat;
                const eateryLong = eateryLocation.point.lng;
                const eateryCoords = [eateryLat, eateryLong];
                
                sendCoords(attractionCoords, eateryCoords)
            }
            // fetch city APIs and run Functions
            fetchForeignData(`https://graphhopper.com/api/1/geocode?q=${attractionCity}&locale=en&key=${Settings.graphhopperKey}`, "attractionCity")
                .then(() => fetchForeignData(`https://graphhopper.com/api/1/geocode?q=${eateryCity}&locale=en&key=${Settings.graphhopperKey}`, "eateryCity"))
                .then(() => {getCoords()})
        }
    }
);


mainContainer.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "eventsBtn") {
            const [, parkID] = event.target.name.split('--')
            const parks = getData("parks").data
            const parkFound = parks.find((park) => park.id === parkID)
            fetchForeignData(`https://developer.nps.gov/api/v1/events?pageSize=50&parkCode=${parkFound.parkCode}&api_key=${Settings.npsKey}`, "eventParks")
            .then(() => fetchForeignData(`https://developer.nps.gov/api/v1/events?pageSize=50&pageNumber=2&parkCode=${parkFound.parkCode}&api_key=${Settings.npsKey}`, "eventParks"))
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




