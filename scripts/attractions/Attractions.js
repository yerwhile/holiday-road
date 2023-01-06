import { getData, mainContainer, applicationState } from "../dataAccess.js";

export const Attractions = () => {
    const attractions = getData("attractions");

    let html = `
    <label class="label" for="attractionsSelect">Attractions</label>
    <select name="attractionSelect" id="attractions">
        <option value="0">Choose Attraction</option>`
        for(const attraction of attractions) {
            if(parseInt(applicationState.chosenAttraction) === attraction.id) {
                html += `<option selected value="${attraction.id}">${attraction.name}</option>`;
            } 
            else {
            html += `<option value="${attraction.id}">${attraction.name}</option>`;
            }
        }
    html += `</select>`
    return html;
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if(event.target.id === "attractions") {
            applicationState.chosenAttraction = document.querySelector("select[name='attractionSelect']").value
            document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
        }
    })

            // ${attractions.map(
        //     attraction => {
        //         return `<option value="${attraction.id}">${attraction.name}</option>`
        //     }
        // ).join("")}