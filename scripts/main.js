import { fetchData, fetchForeignData, localAPI } from "./dataAccess.js"
import { fetchAttractions } from "./attractions/AttractionProvider.js"
import { fetchEateries } from "./eateries/EateryProvider.js"
import { HolidayRoad } from "./HolidayRoad.js"
import Settings from "./Settings.js"
import { ItineraryPreview } from "./ItineraryPreview.js"

export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchAttractions()
        .then(() => fetchEateries())
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