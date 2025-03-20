async function getWeatherData(lat, lon, locationName, elementId) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m,sunshine_duration&timezone=auto`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        document.getElementById(elementId).innerHTML = `
            <p><strong>🌡 :</strong> ${data.current.temperature_2m}°C</p>
            <p><strong>🌧 :</strong> ${data.current.precipitation}mm</p>
            <p><strong>💨 :</strong> ${data.current.wind_speed_10m}km/h</p>
        `;
    } catch (error) {
        console.error(`Erreur lors de la récupération des données météo pour ${locationName}:`, error);
    }
}

const locations = [
    { name: "Monaco", lat: 43.7333, lon: 7.4167, elementId: "weather-monaco" },
    { name: "Circuit Paul Ricard", lat: 43.2506, lon: 5.7944, elementId: "weather-paul-ricard" },
    { name: "Nürburgring", lat: 50.3356, lon: 6.9475, elementId: "weather-nurburgring" }
];

document.addEventListener("DOMContentLoaded", () => {
    locations.forEach(location => getWeatherData(location.lat, location.lon, location.name, location.elementId));
});