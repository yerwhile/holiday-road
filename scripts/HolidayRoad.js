// import APIkeys from "./Settings.js";

import { selectParks } from "./parks/parks.js"

export const HolidayRoad = () => {
    return `
    <div id="logo">LOGO</div>
    <div id="selectBoxes">
        ${selectParks()}
        <select name="bizarrerie" id="bizarrerieSelect">
            <option value="">Choose Option</option>
        </select>
        <select name="eateries" id="eateriesSelect">
            <option value="">Choose Option</option>
        </select>
    </div>
    <div id="itineraries">
        <div id="itineraryPreview">
            Itinerary Choice One
            Itinerary Choice Two
        </div>
        <div id="savedItineraries">
            Saved Itinerary One
            Saved Itinerary Two
            Saved Itinerary Three
        </div>
    </div>
    <div id="weatherForecast">
        Weather Forecast
    </div>
    </div>`
}