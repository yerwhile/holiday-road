/* 
    map through saved itineraries
    display names of park, attraction, and eatery
*/

import { fetchForeignData, getData, mainContainer } from "./dataAccess.js";
import Settings from "./Settings.js";

const formatItinerary = (itinerary) => {
    const parks = getData("parks").data;
    const attractions = getData("attractions");
    const eateries = getData("eateries");

    const itinPark = parks.find(park => park.id === itinerary.parkId);
    const itinAttraction = attractions.find(attraction => attraction.id === itinerary.attractionId);
    const itinEateries = eateries.find(eatery => eatery.id === itinerary.eateryId)

    return `
        <div class="savedItinerary">
            <div class="itinInfo">
                <div class="Itin-num">Itinerary #${itinerary.id}</div>
                <div>Park: ${itinPark.fullName}</div>
                <div>Attraction: ${itinAttraction.name}</div>
                <div>Eatery: ${itinEateries.businessName}</div>
            </div>
            <div>
                <button class="button" id="directionsButton" name="itin--${itinerary.id}">Get Directions</button>
            </div>
        </div>`
}

export const savedItineraries = () => {
    const itineraries = getData("itineraries");

    return `${itineraries.map(itinerary => formatItinerary(itinerary)).join("")}<button class="button" id="eventsBtn">See Events</button>`
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
            const sendCoords = (attrCoords, eatCoords) => {
                fetchForeignData(`https://graphhopper.com/api/1/route?point=36.1622767,-86.7742984&point=48.224,3.867&key=${Settings.graphhopperKey}`, "directions")
                    .then(() => {
                        const directions = getData("directions");
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

/*
mainContainer.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "eventsbBtn") {
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


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "eventsBtn") {
            applicationState.chosenPark = document.querySelector("select[name='eateriesSelect']").value
            document.querySelector("#container").dispatchEvent(new CustomEvent("dropdownChanged"))
        }
    })

    */