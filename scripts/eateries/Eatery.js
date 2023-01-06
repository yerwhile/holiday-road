import { getData, applicationState, mainContainer } from "../dataAccess.js"

export const Eateries = () => {
    const eateries = getData("eateries")

    let html = ""
    html += '<select name="eaterySelect" id="eatery">'
    html += '<option value="0">Choose Eatery</option>'
    for (const eatery of eateries) {
        if (parseInt(applicationState.chosenEatery) === eatery.id) {
            html += `<option selected value="${eatery.id}">${eatery.businessName}</option>`
        }
        else {
            html += `<option value="${eatery.id}">${eatery.businessName}</option>`;
        }
    }
    html += "</select>"
    return html
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "eatery") {
            applicationState.chosenEatery = document.querySelector("select[name='eaterySelect']").value
            document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
        }
    })


