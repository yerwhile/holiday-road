import { fetchData, fetchForeignData, localAPI } from "./dataAccess.js"
import { HolidayRoad } from "./HolidayRoad.js"
import Settings from "./Settings.js"

export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchForeignData(`https://developer.nps.gov/api/v1/parks?api_key=${Settings.npsKey}`, "parks")
        // .then(() => fetchData(localAPI, "this is an example"))
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