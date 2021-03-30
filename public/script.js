async function populateDiningHalls() {
    console.log("populate function found");
    const request = await fetch('api/dining');
    const diningData = await request.json();
    targetBox = document.getElementById('table');

    diningData.data.forEach((hall) => {
        const appendItem = document.createElement('tr');
        appendItem.innerHTML = `
            <td>${hall.hall_name}</td>
            <td>${hall.hall_address.split(',')[0]}</td>
            <td>${hall.hall_address.split(',')[1]}</td>`;
        targetBox.append(appendItem);       
    });
}

async function getData() {
    console.log("getting data");
    const hallRequest = await fetch('/api/dining');
    const hallData = await hallRequest.json();
    return hallData.data;
}

async function windowActions() {
    console.log('loaded window');
    const data = await getData();
    console.table(data);
    populateDiningHalls();
}

window.onload = windowActions();