import { useState } from 'react'

export default function SearchForm({ onSearch, loading }) {
  const [city, setCity] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (city.trim()) onSearch(city.trim())
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city... e.g. Tokyo"
        value={city}
        onChange={e => setCity(e.target.value)}
        autoFocus
      />
      <button type="submit" disabled={loading || !city.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}
