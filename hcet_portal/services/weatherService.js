const cities = ['Ascent', 'Haven', 'Split', 'Bind', 'Icebox', 'Breeze', 'Fracture', 'Pearl', 'Rebind'];

async function getRandomWeather(city) {
    const cityWeatherConditions = {
        'Ascent': ['Clear', 'Sunny'],
        'Haven': ['Cloudy', 'Partly Cloudy'],
        'Split': ['Rainy', 'Thunderstorms'],
        'Bind': ['Foggy', 'Misty'],
        'Icebox': ['Snowy', 'Blizzard'],
        'Breeze': ['Windy', 'Breezy'],
        'Fracture': ['Overcast', 'Stormy'],
        'Pearl': ['Sunny', 'Clear'],
        'Rebind': ['Virtual', 'Digital']
    };

    const weatherDescriptions = cityWeatherConditions[city];
    if (!weatherDescriptions) {
        return null;
    }

    const description = weatherDescriptions[Math.floor(Math.random() * weatherDescriptions.length)];
    const temperature = Math.random() * (40 - (-20)) + (-20);
    const humidity = Math.random() * (90 - 20) + 20;
    const pressure = Math.random() * (1100 - 900) + 900;

    const isSafe = checkWeatherSafety(description);

    return {
        description,
        temperature,
        humidity,
        pressure,
        city,
        isSafe
    };
}

function checkWeatherSafety(description) {
    const safeConditions = ['Clear', 'Sunny', 'Partly Cloudy'];

    return safeConditions.includes(description);
}

function displayCityList() {
    alert('List of cities: ' + cities.join(', '));
}

module.exports = {
    getRandomWeather,
    displayCityList
};
