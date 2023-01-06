import { getData, mainContainer, applicationState } from "../dataAccess.js";

export const Attractions = () => {
    const attractions = getData("attractions");

    return `
    <label class="label" for="attractionsSelect">Attractions</label>
    <select name="attractionSelect" id="attractions">
        <option value="0">Choose Attraction</option>
        ${attractions.map(
            attraction => {
                return `<option value="${attraction.id}">${attraction.name}</option>`
            }
        ).join("")}
    </select>`
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if(event.target.id === "attractions") {
            applicationState.chosenAttraction = document.querySelector("select[name='attractionSelect']").value
            document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged")
        }
    })