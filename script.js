const weatherApiKey = "e19673a544a16ae666715a5d686c3274";  // Replace with your API key
const cropApiUrl = "http://localhost:5000/crop-prices";  // Replace with real API

async function getWeather() {
    let location = document.getElementById("location").value;
    if (!location) {
        alert("Please enter a location");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=metric`;
    
    try {
        let response = await fetch(url);
        let data = await response.json();
        document.getElementById("weatherResult").innerHTML = `
            <h3>Weather in ${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

async function getCropPrices() {
    try {
        let response = await fetch("cropPrices.json");  // Fetch local mock data
        let data = await response.json();
        let output = "<h3>Crop Prices</h3><ul>";
        data.forEach(crop => {
            output += `<li>${crop.name}: ₹${crop.price} per kg</li>`;
        });
        output += "</ul>";
        document.getElementById("cropPriceResult").innerHTML = output;
    } catch (error) {
        console.error("Error fetching crop prices:", error);
    }
}
function getSoilRecommendation() {
    let soilType = document.getElementById("soilType").value.toLowerCase();
    let recommendations = {
        "clay": ["Rice", "Wheat", "Lentils"],
        "sandy": ["Carrots", "Potatoes", "Peanuts"],
        "loamy": ["Corn", "Tomatoes", "Soybeans"],
        "silty": ["Strawberries", "Lettuce", "Onions"],
        "peaty": ["Cabbage", "Turnips", "Radishes"]
    };

    if (recommendations[soilType]) {
        document.getElementById("soilRecommendationResult").innerHTML = `
            <h3>Recommended Crops for ${soilType} soil:</h3>
            <p>${recommendations[soilType].join(", ")}</p>
        `;
    } else {
        document.getElementById("soilRecommendationResult").innerHTML = `
            <p style="color:red;">Invalid soil type. Please enter Clay, Sandy, Loamy, Silty, or Peaty.</p>
        `;
    }
}