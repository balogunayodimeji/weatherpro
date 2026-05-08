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

        const apiKey = '041a9706afe28ded4e15a58dc45a73c3';
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
        <div className="">
            <div className="">
                <h1 className="">
                    Weather Dashboard
                </h1>
                <form className="">
                    <input
                        type="text"
                        value={city}
                        className=""
                        onChange={this.handleCityNameInputChange}
                        placeholder="Enter the city name"
                    />
                    <button 
                    type="submit" 
                    onClick={this.handleDataSubmit}>
                        Get Weather information
                    </button>
                </form>

                {error && <p className="">{error}</p>}
                {weather && (
                    <div className="">
                        <h2>Weather Information for {weather.name}</h2>
                        <p>Temperature: {weather.main.temp} K</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Description: {weather.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
}


export default WeatherFetch;