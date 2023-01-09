import { applicationState, fetchData, fetchForeignData, getData } from "./dataAccess.js"
import { fetchEateries } from "./eateries/EateryProvider.js"
import { HolidayRoad } from "./HolidayRoad.js"
import Settings from "./Settings.js"
import { ItineraryPreview } from "./ItineraryPreview.js"
import { Attractions } from "./attractions/Attractions.js"
import { Eateries } from "./eateries/Eatery.js"
import { Weather } from "./weather/weather.js"

export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchEateries()
        .then(() => fetchForeignData("http://holidayroad.nss.team/bizarreries", "attractions"))
        .then(() => fetchForeignData(`https://developer.nps.gov/api/v1/parks?api_key=${Settings.npsKey}`, "parks"))
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
        const parks = getData("parks").data;
        const selectedPark = parks.find(park => park.id === applicationState.chosenPark);
        const lat = selectedPark.latitude;
        const lon = selectedPark.longitude;
        fetchForeignData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Settings.weatherKey}`, "weather")
        .then(() => document.querySelector('#weatherForecast').innerHTML = Weather())
        document.querySelector('#attractionsSelect').innerHTML = Attractions();
        document.querySelector('#eaterySelect').innerHTML = Eateries();
    }
)