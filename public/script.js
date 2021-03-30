async function populateDiningHalls() {
    console.log("populate function found");
}

async function getData() {
    console.log("getting data");
    const hallRequest = await fetch('/api/dining');
    const hallData = await hallRequest.json();
    return hallData;
}

async function windowActions() {
    console.log('loaded window');
    const data = await getData();
    console.table(data);
}

window.onload = windowActions();