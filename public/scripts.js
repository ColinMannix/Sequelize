async function populateDiningHalls() {

}

async function getData() {
    console.log("getting data");
    const hallRequest = await fetch('/api/DiningHall');
    const hallData = await hallRequest.json();
    return hallData;
}

window.onload = windowActions();