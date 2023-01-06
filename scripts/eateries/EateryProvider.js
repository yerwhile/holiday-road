
import { applicationState } from "../dataAccess.js";

const eateriesAPI = "http://holidayroad.nss.team/eateries"

export const fetchEateries = () => {
    return fetch(`${eateriesAPI}`)
        .then(response => response.json())
        .then(
            (eateries) => {
                applicationState.eateries = eateries
            }
        )
}

