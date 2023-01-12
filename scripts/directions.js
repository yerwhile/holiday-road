import { getData } from "./dataAccess.js"

/* 
    get directions data
    define empty html variable
    check if directions is undefined
    find instructions
    map through instructions, get text property
    display it 
*/

const formatInstruction = (instruction) => {
    return `<li>${instruction.text}</li>`
}

export const Directions = () => {
    const directions = getData("directions");
    let html = "<h3>Directions</h3>";

    if(directions === undefined) {
        html += "<div id='directionsEmpty'>Click the 'Directions' button under any Saved Itinerary to see step-by-step what route you should take!</div>"
    }

    if (directions !== undefined) {
        const instructions = directions.paths[0].instructions;

        html += "<ul>"
        html += instructions.map((instruction) => formatInstruction(instruction)).join("");
        html += "</ul>"
    }

    return html;
}