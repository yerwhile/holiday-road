import { getData, applicationState, mainContainer } from "../dataAccess.js"
import { getStateByChosenPark } from "../attractions/Attractions.js"

export const Eateries = () => {
    const eateries = getData("eateries");


    let html = `
    <label class="label" for="eateriesSelect">Eateries</label>`
    if(typeof applicationState.chosenPark === 'undefined') {
        html += `<select name="eateriesSelect" id="eateries" disabled>`
    }
    else {
        html += `<select name="eateriesSelect" id="eateries">`
    }
    html += `<option value="0">Choose Eatery</option>`
    
    const eateriesFilteredByState = [];
    const chosenState = getStateByChosenPark()
    for(const eatery of eateries) {
        if(eatery.state === chosenState) {
            eateriesFilteredByState.push(eatery)
        }
    }

    for(const filteredEatery of eateriesFilteredByState) {
        if(parseInt(applicationState.chosenEatery) === filteredEatery.id) {
            html += `<option selected value="${filteredEatery.id}">${filteredEatery.businessName}</option>`;
        } 
        else {
        html += `<option value="${filteredEatery.id}">${filteredEatery.businessName}</option>`;
        }
    }
    html += `</select>`
    return html;
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "eatery") {
            applicationState.chosenEatery = document.querySelector("select[name='eaterySelect']").value
            document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
        }
    })


