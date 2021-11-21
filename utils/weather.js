const axios = require('axios')
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='
const key = process.env.KEY

async function getWeather(cityID = 'chicago', url) {
    try {
        let res = await axios.get(url + cityID + "&appid=" + key)
        let data = res.data
        return data
    } catch (error) {
        console.log(error.name, 'fuckin errror')
        let res = await axios.get(url + 'chicago' + "&appid=" + key)
        let data = res.data
        data.additional = `City - ${cityID} - not found, try another place...`
        return data
    }
}

module.exports = { currentWeatherUrl, forecastUrl, getWeather }