import { Component } from "react";

class WeatherFetch extends Component {
    constructor(props){
        super(props);
        this.state = {
            city:'',
            weather: null,
            error: null
        }   
    }
// Function to fetch weather data based on the city name
    fetchWeatherData = () =>{
        const {city} = this.state;
        if(!city) return;

        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// Fetch weather data from the API
        fetch(apiUrl)
        .then((response) => {
            if(!response.ok){
                throw new Error('Could not fetch weather data of the city or the area you entered is not valid');
            }
            return response.json();
        })
        .then((data) => {
            this.setState({ weather: data, error: null });
        })
        .catch((error) => {
            this.setState({ error: error.message, weather: null });
        })
    };

// Function to handle input change for city name
    handleCityNameInputChange = (event) => {
        this.setState({ city: event.target.value });
    }

    handleDataSubmit = (event) => {
        event.preventDefault();
        this.fetchWeatherData();
    }

render() {
    const { city, weather, error } = this.state;
    return (
        <section className="min-h-screen bg-gray-500 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Weather Dashboard
                </h1>
                <form className="mb-4" onSubmit={this.handleDataSubmit}>
                    <input
                        type="text"
                        value={city}
                        className="border border-gray-300 rounded py-2 px-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={this.handleCityNameInputChange}
                        placeholder="Enter the city name"
                    />
                    <button 
                    type="submit" 
                    className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full hover:bg-blue-600"
                    >
                        Get Weather information
                    </button>
                </form>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {weather && (
                    <div className="text-center">
                        <h2>Weather Information for {weather.name}</h2>
                        <p className="text-gray-500">Temperature: {weather.main.temp} K</p>
                        <p className="text-gray-500">Temperature: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
                        <p className="text-gray-500">Humidity: {weather.main.humidity}%</p>
                        <p className="text-gray-500">Description: {weather.weather[0].description}</p>
                    </div>
                )}
            </div>
        </section>
    )
}
}


export default WeatherFetch;