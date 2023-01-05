import {} from "./.js"

export const Eatery = () => {
    const eateries = getEatery()

    let html = ""
    html += '<select id="eatery">'
    html += '<option value="0"></option>'
    const eateryArray = eateries.map(
        eatery => {
            return `<option value="${eatery.id}">${eatery.name}</option>`
        }
    )
    html +=eateryArray .join("")
    html += "</select>"
    return html

}