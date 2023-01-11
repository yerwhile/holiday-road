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
    return `<div>${instruction.text}</div>`
}

export const Directions = () => {
    const directions = getData("directions");
    let html = "<h2>Directions</h2>";

    if (directions !== undefined) {
        const instructions = directions.paths[0].instructions;

        html += instructions.map((instruction) => formatInstruction(instruction)).join("");
    }

    return html;
}