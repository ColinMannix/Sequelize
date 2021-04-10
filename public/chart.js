async function getWholeMeals() {
    const mealRequest = await fetch('/api/wholeMeal');
    const mealData = await mealRequest.json();
    return mealData.data;
}

async function getMacros() {
    const macroRequest = await fetch('/api/macros');
    const macroData = await macroRequest.json();
    return macroData;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

async function windowActions() {
    const meals = await getWholeMeals();

    const mealArray = [1,2,3,4,5,6,7,8,9,10];
    const selectedMeals = mealArray.map((element) => {
        const random = getRandomIntInclusive(0, meals.length-1);
        return meals[random];
    });
    console.table(selectedMeals);

    cholesterol = [];
    sodium = [];
    carbs = [];
    protein = [];
    fat = [];
    selectedMeals.forEach((meal) => {
        cholesterol.push({label:meal.meal_name, y:meal.cholesterol});
        sodium.push({label:meal.meal_name, y:meal.sodium});
        carbs.push({label:meal.meal_name, y:meal.carbs});
        protein.push({label:meal.meal_name, y:meal.protein});
        fat.push({label:meal.meal_name, y:meal.fat});
    });

    let chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{
        text: "Dining Hall Meal Macros"
    },
    toolTip: {
        shared: true
    },
    legend:{
        cursor: "pointer",
        itemclick: toggleDataSeries
    },
    data: [{
        type: "stackedBar",
        name: "Cholesterol",
        showInLegend: "true",
        dataPoints: cholesterol
    },
    {
        type: "stackedBar",
        name: "Sodium",
        showInLegend: "true",
        dataPoints: sodium
    },
    {
        type: "stackedBar",
        name: "Carbs",
        showInLegend: "true",
        dataPoints: carbs
    },
    {
        type: "stackedBar",
        name: "Protein",
        showInLegend: "true",
        dataPoints: protein
    },
    {
        type: "stackedBar",
        name: "Fat",
        showInLegend: "true",
        dataPoints: fat
    }]
});
    chart.render();
    
    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
}
window.onload = windowActions();