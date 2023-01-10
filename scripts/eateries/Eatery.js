import { getData, mainContainer, setData } from "../dataAccess.js"
import { getStateByChosenPark } from "../attractions/Attractions.js"

export const Eateries = () => {
    const eateries = getData("eateries");
    const chosenPark = getData("chosenPark");
    const chosenEatery = getData("chosenEatery");

    let html = `
    <label class="label" for="eateriesSelect"></label>`
    if(typeof chosenPark === 'undefined' || chosenPark === 0) {
        html += `<select name="eateriesSelect" id="eateries" disabled>`
        setData("chosenEatery", undefined);
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
        if(parseInt(chosenEatery) === filteredEatery.id) {
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
        if (event.target.id === "eateries") {
            setData("chosenEatery", document.querySelector("select[name='eateriesSelect']").value)
            document.querySelector("#container").dispatchEvent(new CustomEvent("dropdownChanged"))
        }
    })