import { fetchData, fetchForeignData, getData } from "./dataAccess.js"
import { HolidayRoad } from "./HolidayRoad.js"
import Settings from "./Settings.js"
import { ItineraryPreview } from "./ItineraryPreview.js"
import { Attractions } from "./Attractions.js"
import { Eateries } from "./Eatery.js"
import { Weather } from "./weather.js"
import { selectParks } from "./parks.js"
import { Directions } from "./directions.js"

export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchForeignData("http://holidayroad.nss.team/eateries", "eateries")
        .then(() => fetchForeignData("http://holidayroad.nss.team/bizarreries", "attractions"))
        .then(() => fetchForeignData(`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${Settings.npsKey}`, "parks"))
        .then(() => fetchData("itineraries"))
        .then(
            () => {
                mainContainer.innerHTML = HolidayRoad()
            }
        )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

mainContainer.addEventListener(
    "dropdownChanged",
    customEvent => {
        document.querySelector(`#itineraryPreview`).innerHTML = ItineraryPreview();
    }
)

mainContainer.addEventListener(
    "parkSelected",
    customEvent => {
        const chosenPark = getData("chosenPark");

        if (chosenPark !== "0") {
            const parks = getData("parks").data;
            const selectedPark = parks.find(park => park.id === chosenPark);
            const lat = selectedPark.latitude;
            const lon = selectedPark.longitude;
            fetchForeignData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Settings.weatherKey}`, "weather")
            .then(() => document.querySelector('#weatherForecast').innerHTML = Weather())

            document.querySelector('#attractionsSelect').innerHTML = Attractions();
            document.querySelector('#eaterySelect').innerHTML = Eateries();
            document.querySelector('#parkSelect').innerHTML = selectParks();
        }
    }
)

mainContainer.addEventListener(
    "getDirections",
    customEvent => {
        document.querySelector('#directions').innerHTML = Directions();
    }
)