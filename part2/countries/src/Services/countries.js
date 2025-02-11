import axios from "axios";

//const url = "https://studies.cs.helsinki.fi/restcountries/api/"
const url = "http://localhost:3001/"


const getAll = () => {
    const request = axios.get(url + "all")
    return request.then(response => response.data)
}

const getByName = (name) => {
    const request = axios.get(url + `/name/${name}`)
    return request.then(response => response.data)
}

export default { getAll, getByName }
