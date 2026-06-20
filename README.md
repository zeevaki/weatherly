# 🌤️ Weatherly

Real-time weather for any city. Built with Node.js, Express, and React.

## What it does

- Search any city and get live weather data
- Shows temperature, feels like, humidity, and wind speed
- API key stays hidden on the backend — never exposed to the browser

## Project structure

```
weatherly-web/
├── backend/     ← Express API (calls OpenWeatherMap)
└── frontend/    ← React app (Vite)
```

## Setup

### 1. Get a free API key

Sign up at [openweathermap.org](https://openweathermap.org) → go to **API Keys** tab → copy your key.
It activates within ~10 minutes of signing up.

### 2. Clone the repo

```bash
git clone https://github.com/zeevaki/weatherly.git
cd weatherly
```

### 3. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```
OPENWEATHER_API_KEY=your_api_key_here
```

Start the backend:

```bash
node server.js
```

Runs on `http://localhost:3002`

### 4. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5174`

## API route

```
GET /api/weather?city=London
```

Returns:

```json
{
  "city": "London",
  "country": "GB",
  "temp": 14,
  "feelsLike": 13,
  "humidity": 78,
  "windKmh": 12,
  "condition": "light rain",
  "emoji": "🌦️"
}
```

## Tech stack

- **Backend:** Node.js, Express, dotenv
- **Frontend:** React, Vite
- **Data:** OpenWeatherMap API (free tier)
