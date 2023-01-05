import { HolidayRoad } from "./HolidayRoad.js"

export const mainContainer = document.querySelector("#container")

const render = () => {
    mainContainer.innerHTML = HolidayRoad()

}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)