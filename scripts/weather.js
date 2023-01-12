import { applicationState, getData } from "./dataAccess.js"


export const Weather = () => {
    const weathers = getData("weather").list

    const array = [7, 15, 23, 31, 39]
    let html = ""

    

    for (const arr of array) {
        //tie weathers and array together 
        const firstTemp = weathers[arr].main.temp
        const secondTemp = ((firstTemp - 273.15) * 1.8 + 32)
        const thirdTemp = Math.floor(secondTemp)
        const description = weathers[arr].weather[0].description
        const date = weathers[arr].dt_txt
        const dateNum = date.substring(0,10);
        const dateDay = getDayOfWeek(date);
        html += `<div class="weatherDay">
                    <div class="weatherDayHeader">${dateDay} (${dateNum})</div> <hr>
                    <div class="weatherDayBody">Temperature: ${thirdTemp}°F<br>Forecast: ${description}</div>
                </div>`

    }
    return html

}

const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();    
    return isNaN(dayOfWeek) ? null : 
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}