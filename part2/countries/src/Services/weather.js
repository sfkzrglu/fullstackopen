import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY
const url1 = `https://api.openweathermap.org/data/2.5/weather?q=`
const url2 = `&units=metric&APPID=${api_key}`

const get = (country) => {
    const request = axios.get(url1 + country + url2)
    return request.then(response => response.data)
}

export default { get }


