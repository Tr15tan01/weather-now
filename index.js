const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views', './views');
// require("dotenv").config();
app.use('/favicon.ico', express.static('media/favicon.ico'));

const port = process.env.PORT || 3000;

const { currentWeatherUrl, forecastUrl, getWeather } = require('./utils/weather.js')

app.get('/', (req, res) => {
    res.render('index')
    // res.send('This test is done too..')
})

app.get('/weather', (req, res) => {
    let cityID = req.query.city
    getWeather(cityID, currentWeatherUrl).then(data => {
        res.send(data)
    })
})

app.get('/forecast', (req, res) => {
    let cityID = req.query.city
    getWeather(cityID, forecastUrl).then(data => {
        res.send(data)
    })
})

app.get('/test', (req, res) => {
    res.send('it works')
})

app.get('*', (req, res) => {
    res.send('404 not found')
})

app.listen(port, () => console.log('I am listening...'))