import { applicationState } from "../dataAccess.js";

const attractionsAPI = "http://holidayroad.nss.team/bizarreries"

export const fetchAttractions = () => {
    return fetch(`${attractionsAPI}`)
        .then(response => response.json())
        .then(
            (attractions) => {
                applicationState.attractions = attractions
            }
        )
}