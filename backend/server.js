// ─────────────────────────────────────────────────────────────────────────────
// The API key never leaves this file.
// The browser calls /api/weather?city=London
// This server calls OpenWeatherMap with the secret key
// Then forwards the clean result back to the browser
// ─────────────────────────────────────────────────────────────────────────────
require('dotenv').config()

const express = require('express')
const cors    = require('cors')

const app     = express()
const API_KEY = process.env.OPENWEATHER_API_KEY

app.use(cors())
app.use(express.json())

// Helper — map weather ID to an emoji (same logic as the CLI version)
function weatherEmoji(id) {
  if (id >= 200 && id < 300) return '⛈️'
  if (id >= 300 && id < 400) return '🌧️'
  if (id >= 500 && id < 600) return '🌦️'
  if (id >= 600 && id < 700) return '❄️'
  if (id >= 700 && id < 800) return '🌫️'
  if (id === 800)             return '☀️'
  return '⛅'
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/weather?city=London
//
// The city comes from the query string (?city=London), not the body.
// req.query.city is how Express reads query string parameters.
// ─────────────────────────────────────────────────────────────────────────────
app.get('/api/weather', async (req, res) => {
  const { city } = req.query

  if (!city || !city.trim()) {
    return res.status(400).json({ error: 'City name is required.' })
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const data     = await response.json()

    if (data.cod !== 200) {
      return res.status(404).json({ error: `City "${city}" not found.` })
    }

    // Shape the response — send only what the frontend needs
    res.json({
      city:      data.name,
      country:   data.sys.country,
      temp:      Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity:  data.main.humidity,
      windKmh:   Math.round(data.wind.speed * 3.6),
      condition: data.weather[0].description,
      emoji:     weatherEmoji(data.weather[0].id),
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach weather service.' })
  }
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`\n🌤️  Weatherly API running at http://localhost:${PORT}`)
  console.log(`   Try: http://localhost:${PORT}/api/weather?city=London\n`)
})
