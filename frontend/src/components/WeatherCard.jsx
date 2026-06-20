export default function WeatherCard({ weather }) {
  const { emoji, city, country, temp, feelsLike, condition, humidity, windKmh } = weather

  return (
    <div className="weather-card">
      <div className="emoji">{emoji}</div>
      <div className="city">{city}, {country}</div>
      <div className="temp">{temp}°C</div>
      <div className="condition">{condition}</div>

      <div className="stats">
        <div className="stat">
          <div className="label">Feels like</div>
          <div className="value">{feelsLike}°C</div>
        </div>
        <div className="stat">
          <div className="label">Humidity</div>
          <div className="value">{humidity}%</div>
        </div>
        <div className="stat">
          <div className="label">Wind</div>
          <div className="value">{windKmh} km/h</div>
        </div>
      </div>
    </div>
  )
}
