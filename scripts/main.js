import { fetchData, fetchForeignData, localAPI } from "./dataAccess.js"
import { fetchEateries } from "./eateries/EateryProvider.js"
import { HolidayRoad } from "./HolidayRoad.js"
import Settings from "./Settings.js"
import { ItineraryPreview } from "./ItineraryPreview.js"
import { Attractions } from "./attractions/Attractions.js"
import { Eateries } from "./eateries/Eatery.js"

export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchEateries()
        .then(() => fetchForeignData("http://holidayroad.nss.team/bizarreries", "attractions"))
        .then(() => fetchForeignData(`https://developer.nps.gov/api/v1/parks?api_key=${Settings.npsKey}`, "parks"))
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
        document.querySelector('#attractionsSelect').innerHTML = Attractions();
        document.querySelector('#eaterySelect').innerHTML = Eateries();
    }
)