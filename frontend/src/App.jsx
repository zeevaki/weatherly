import { useState } from 'react'
import SearchForm from './components/SearchForm'
import WeatherCard from './components/WeatherCard'
import './App.css'

export default function App() {
  const [weather, setWeather]   = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  async function handleSearch(city) {
    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      // GET request — city goes in the URL as a query string, not the body
      // That's the difference between GET (?city=London) and POST (body: {city})
      // Use GET when you're just fetching data, POST when you're creating/changing something
      const res  = await fetch(`http://localhost:3002/api/weather?city=${encodeURIComponent(city)}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>🌤️ Weatherly</h1>
        <p>Real-time weather for any city.</p>
      </header>

      <main>
        <SearchForm onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="error">❌ {error}</div>
        )}

        {weather && <WeatherCard weather={weather} />}
      </main>
    </div>
  )
}
