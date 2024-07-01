var search = document.querySelector(".search")
var weather;



async function getapi(country) {
    var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6a1d00ee3d9e4201bac105045242906&q=${country}&days=3&aqi=no&alerts=no
`)
    var finalres = await res.json()
    return finalres

}
async function write(country) {
    weather = await getapi(country)
    console.log(weather);
    displaytoday()
    displayday2()
    displayday3()
}
function displaytoday() {
    let date = new Date(weather.location.localtime)
    console.log(date.toLocaleDateString("en-US", { month: '2-digit' }));
    document.getElementById("day1").innerHTML = date.toLocaleDateString("en-US", { weekday: 'long' })
    document.getElementById("date1").innerHTML = date.toLocaleDateString("en-US", { month: '2-digit'})
    document.querySelector(".card-title").innerHTML = weather.location.name
    document.getElementById("degree").innerHTML = weather.current.temp_c + "C"
    document.querySelector(".sunny").innerHTML = weather.current.condition.text
    document.querySelector(".wind").innerHTML = weather.current.wind_mph + "%"
    document.querySelector(".speed").innerHTML = weather.current.wind_kph + "km/h"
    document.querySelector(".winddir").innerHTML = weather.current.wind_dir
    document.getElementById("icon").setAttribute("src", 'https:' + weather.current.condition.icon)

}
function displayday2() {
    var date=new Date(weather.forecast.forecastday[1].date)
    document.getElementById("day2").innerHTML= date.toLocaleDateString("en-US", { weekday: 'long' })
    document.getElementById("maxtemp").innerHTML = weather.forecast.forecastday[1].day.maxtemp_c + "c"
    document.getElementById("mintemp").innerHTML = weather.forecast.forecastday[1].day.mintemp_c + "c"
    document.getElementById("img2").setAttribute('src', 'https:' + weather.forecast.forecastday[1].day.condition.icon)
    document.getElementById("condition").innerHTML = weather.forecast.forecastday[1].day.condition.text
}
function displayday3() {
    var date=new Date(weather.forecast.forecastday[2].date)
    document.getElementById("day3").innerHTML= date.toLocaleDateString("en-US", { weekday: 'long' })
    document.getElementById("degree3").innerHTML = weather.forecast.forecastday[2].day.maxtemp_c + 'c'
    document.getElementById("mint").innerHTML = weather.forecast.forecastday[2].day.mintemp_c + 'c'
    document.getElementById("conditioncountry").innerHTML = weather.forecast.forecastday[2].day.condition.text
    document.getElementById("imagecondition").setAttribute("src", 'https:' + weather.forecast.forecastday[2].day.condition.icon)
}

search.addEventListener("keyup", function () {
    write(search.value)
})