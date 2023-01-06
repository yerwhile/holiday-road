import { fetchAttractions } from "./attractions/AttractionProvider.js"
import { fetchEateries } from "./eateries/EateryProvider.js"
import { HolidayRoad } from "./HolidayRoad.js"

export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchAttractions()
    .then(() => fetchEateries())
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