import WeatherForecastCard from './WeatherForecastCard'

const WeatherForecastCompartment = () => {
  const weatherData = [
    {
      date: 'August 31, 2023',
      day: 'Tomorrow',
      temperature: '25°C',
      condition: 'Sunny',
      wind: '5 m/s',
      humidity: '60%',
      iconSrc: '/placeholder.svg',
      altText: 'Sunny',
    },
    {
      date: 'September 1',
      day: 'Thursday',
      temperature: '22°C',
      condition: 'Partly Cloudy',
      wind: '3 m/s',
      humidity: '70%',
      iconSrc: '/placeholder.svg',
      altText: 'Partly Cloudy',
    },
    {
      date: 'September 2',
      day: 'Friday',
      temperature: '18°C',
      condition: 'Rainy',
      wind: '7 m/s',
      humidity: '90%',
      iconSrc: '/placeholder.svg',
      altText: 'Rainy',
    },
    {
      date: 'September 3',
      day: 'Saturday',
      temperature: '20°C',
      condition: 'Cloudy',
      wind: '4 m/s',
      humidity: '80%',
      iconSrc: '/placeholder.svg',
      altText: 'Cloudy',
    },
  ]

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {weatherData.map((weather, index) => (
          <WeatherForecastCard
            key={index}
            date={weather.date}
            day={weather.day}
            temperature={weather.temperature}
            condition={weather.condition}
            wind={weather.wind}
            humidity={weather.humidity}
            iconSrc={weather.iconSrc}
            altText={weather.altText}
          />
        ))}
      </div>
    </>
  )
}

export default WeatherForecastCompartment
