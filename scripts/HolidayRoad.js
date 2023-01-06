// import APIkeys from "./Settings.js";
import { Attractions } from "./attractions/Attractions.js"

export const HolidayRoad = () => {
    return `
    <div id="logo">LOGO</div>
    <div id="selectBoxes">
        [PARKS()]
        ${Attractions()}
        [EATERIES()]
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