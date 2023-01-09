import { applicationState, getData } from "../dataAccess.js"


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
        html += `${thirdTemp}°F ${date} ${description} `

    }
    return html

}
