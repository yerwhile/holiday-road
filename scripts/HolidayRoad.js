// import APIkeys from "./Settings.js";

import { selectParks } from "./parks/parks.js"
import { Attractions } from "./attractions/Attractions.js"
import { ItineraryPreview } from "./ItineraryPreview.js"
import { Eateries } from "./eateries/Eatery.js"
import { savedItineraries } from "./savedItineraries.js"


export const HolidayRoad = () => {
    return `
    <div id="logo">LOGO</div>
    <div id="selectBoxes">
        ${selectParks()}
        ${Attractions()}
        ${Eateries()}
    </div>
    <div id="itineraries">
        <div id="itineraryPreview">
            ${ItineraryPreview()}
        </div>
        <div id="savedItineraries">
            ${savedItineraries()}
        </div>
    </div>
    <div id="weatherForecast">
        Weather Forecast
    </div>
    </div>`
}