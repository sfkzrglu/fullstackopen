import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countries from './Services/countries'
import weather from './Services/weather'
import Country from './components/Country'

const App = () => {

  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])
  const [showDetailsIndex, setShowDetailsIndex] = useState(null)
  const [weatherDetails, setWeatherDetails] = useState({})

  useEffect(() => {
    if (search) {
      countries.getAll().then(response => {
        const filtered = response.filter(item => item.name.common.toLowerCase().includes(search));
        setResult(filtered);
      })
    }
  }, [search])


  useEffect(() => {
    console.log("effect");
    if (result.length === 1) {
      console.log("seek");
      weather.get(result[0].capital)
        .then(response => {
          setWeatherDetails(
            {
              "temp": response.main.temp,
              "wind": response.wind.speed,
              "iconURL": `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`
            })
        })
    }
  }, [result])

  return (
    <div>
      <Filter search={search} setSearch={setSearch} />
      {
        result.length > 10 &&
        <div>Too many matches, specify another filter</div>
      }
      {
        result.length < 10 &&
        result.map((item, i) => {
          return <Country
            key={item.name.common}
            country={item}
            showDetailsIndex={showDetailsIndex}
            setShowDetailsIndex={setShowDetailsIndex}
            arrayIndex={i}
            singleCountry={result.length === 1}
          />
        })
      }
      {
        result.length === 1 &&
        <div>
          <div>Temperature: {weatherDetails['temp']} Celcius</div>
          <img src={weatherDetails['iconURL']}></img>
          <div>wind: {weatherDetails['wind']} m/s</div>
        </div>
      }
    </div>
  )
}

export default App


