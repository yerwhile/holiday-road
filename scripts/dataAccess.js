export const mainContainer = document.querySelector("#container");

export const applicationState = { };

export const localAPI = "http://localhost:8088"

// take a parameter and take it from json database, put it into applicationState
export const fetchData = (data) => {
    return fetch(`${localAPI}/${data}`)
        .then(response => response.json())
        .then(
            (dataItems) => {
                applicationState[data] = dataItems;
            }
        )
}

// take two parameters, one for the API you want to fetch, the other for what you want to name it, and put it into applicationState
export const fetchForeignData = (API, dataName) => {
    return fetch(`${API}`)
        .then(response => response.json())
        .then(
            (dataItems) => {
                applicationState[dataName] = dataItems;
            }
        )
}


// send data to json database
export const postData = (data, userData) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    }

    return fetch(`${localAPI}/${data}`, fetchOptions)
        .then(response => response.json())
        // .then(() => {
        //     // Runs custom event to re-render page
        //     mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        // })
}

// delete data from json database
export const deleteData = (data, id) => {
    return fetch(`${localAPI}/${data}/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// take a parameter and get it from the application state
export const getData = (data) => {
    if (typeof applicationState[data] === "object") {
        if (Array.isArray(applicationState[data])) {
            return applicationState[data].map(dataItems => ({ ...dataItems }));
        }
        return JSON.parse(JSON.stringify(applicationState[data]));
    }
    return applicationState[data];
}

// put a variable into the application state
export const setData = (dataName, data) => {
    applicationState[dataName] = data;
}