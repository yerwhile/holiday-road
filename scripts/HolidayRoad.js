// import APIkeys from "./Settings.js";

import { selectParks } from "./parks/parks.js"
import { Attractions } from "./attractions/Attractions.js"
import { ItineraryPreview } from "./ItineraryPreview.js"
import { Eateries } from "./eateries/Eatery.js"
import { savedItineraries } from "./savedItineraries.js"
import { Weather } from "./weather/weather.js"


export const HolidayRoad = () => {
    return `
    <div id="logo"><img src="https://media.istockphoto.com/id/1319082592/vector/round-tree-icon-with-leaves-and-roots.jpg?s=612x612&w=0&k=20&c=N3tHnScT5KmcODhCgrYEvM5bEsJOR66oMAiS2UYj9MU=" alt="Buttons and Lollipop" width="100px">
    <h2>Old Yeller's Trip Planner</h2>
    </div>
    <div id="selectBoxes">
        ${selectParks()}
        <div id="attractionsSelect">
            ${Attractions()}
        </div>
        <div id="eaterySelect">
            ${Eateries()}
        </div>
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
      
    </div>
    </div>`
}