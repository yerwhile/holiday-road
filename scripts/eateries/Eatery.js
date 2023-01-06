import {getData, applicationState, mainContainer} from "../dataAccess.js"

export const Eateries = () => {
    const eateries = getData("eateries")

    let html = ""
    html += '<select name="eaterySelect" id="eatery">'
    html += '<option value="0">Choose Eatery</option>'
    const eateryArray = eateries.map(
        eatery => {
            return `<option value="${eatery.id}">${eatery.businessName}</option>`
        }
    )
    html += eateryArray.join("")
    html += "</select>"
    return html
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if(event.target.id === "eatery") {
            applicationState.chosenEatery === document.querySelector("select[name='eaterySelect']").value
        }
    })