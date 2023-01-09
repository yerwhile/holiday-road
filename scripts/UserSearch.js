import { getData } from "./dataAccess"


const UserSearch = (queryStr) => {
    const attractions = getData("attractions");
    const eateries = getData("eateries");
    const parks = getData("parks");
    const itineraries = getData("itineraries");

    const results = [];
}