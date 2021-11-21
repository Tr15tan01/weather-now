//images for weather
const imgs = {
    Clouds: "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clouds-icon.png",
    Thunderstorm: "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-storm-icon.png",
    Drizzle: "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-showers-scattered-icon.png",
    Rain: "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-showers-scattered-icon.png",
    Snow: "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-snow-icon.png",
    Clear: "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clear-icon.png",
    Mist: "http://icon-library.com/images/fog-icon-png/fog-icon-png-6.jpg"
}


const input = document.getElementById('cities')

//get city
function getWeather(e) {
    e.preventDefault()
    let mycity = input.value
    weatherBalloon(mycity)
}

//fetch weather from api
function weatherBalloon(cityID) {
    fetch('http://localhost:3000/weather?city=' + cityID)
        // fetch('https://weather-city-now.herokuapp.com?city=' + cityID)
        .then(function (resp) {
            return resp.json();
        }) // Convert data to json
        .then(function (data) {
            //notification if there is no city found
            const notification = document.getElementById('notification')
            notification.textContent = data.additional
            //temperature
            const mytemp = document.getElementById("temp");
            mytemp.textContent = Math.round(parseFloat(data.main.temp - 273.15)) + ' ℃';
            //city
            const city = document.getElementById("city");
            city.textContent = data.name;
            //description
            const mydescription = document.getElementById("description");
            mydescription.textContent = data.weather[0].description;
            //image
            const weimg = document.getElementById("weimg");
            weimg.src = imgs[data.weather[0].main];
            //wind
            const wind = document.getElementById("wind");
            wind.textContent = Math.round(data.wind.speed / 1000 * 3600);
            //date
            const date = new Date(data.sys.sunset * 1000);
            const hours = date.getHours();

            const d = new Date();
            const currHour = d.getHours();

            if (hours >= currHour) {
                document.body.className = 'body-light';
            } else {
                document.body.style.backgroundColor = "indigo";
                document.body.style.color = "white";
            }
        })
        .catch(function (err) {
            console.log(err.message, 'err mess');
        });
    //forecast
    fetch('http://localhost:3000/forecast?city=' + cityID)
        // fetch('https://weather-city-now.herokuapp.com/forecast?city=' + cityID)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (wedata) {
            //3 day weather forecast
            for (let i = 0, j = 0; i < 24, j < 3; i += 8, j++) {
                const myDate = new Date(wedata.list[i].dt * 1000);
                const myYear = myDate.getFullYear();
                const myMonth = myDate.getMonth() + 1;
                const myDay = myDate.getDate();
                const dateNow = myDay + '.' + myMonth + '.' + myYear;
                //temperatutr
                const tempNow = wedata.list[i].main.temp;
                document.querySelectorAll(".date")[j].textContent = dateNow;
                document.querySelectorAll(".temp")[j].textContent = Math.round(parseFloat(tempNow - 273.15)) + '  ℃';
                document.querySelectorAll(".imgico")[j].src = imgs[wedata.list[i].weather[0].main]
                document.querySelectorAll(".desc")[j].textContent = wedata.list[i].weather[0].main;
            }

        }).catch(function (err) {
            console.log(err.message, 'err mess');
        });
    ;

}

document.getElementById('weatherform').addEventListener('submit', getWeather)

window.onload = weatherBalloon('chicago')