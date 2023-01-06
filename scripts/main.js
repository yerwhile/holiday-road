import { fetchAttractions } from "./attractions/AttractionProvider.js"
import { HolidayRoad } from "./HolidayRoad.js"

export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchAttractions()
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