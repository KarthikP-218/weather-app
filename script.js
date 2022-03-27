// Store all API Data in JSON Format
var weather = {
    "apiKey": "d3e5d851b860df19b1a5f0d7439c3ac6",
    // Use fetch() method to bring data and using function for each city
    fetchWeatherData: function(cityName){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + this.apiKey + "&units=metric").
            then((response) => {
                if (!response.ok) {
                  alert("No weather found.");
                  throw new Error("No weather found.");
                }
                return response.json();
              }).then((data) => displayWeatherData(data));
    },
}

// Access data from the JSON and scrpae based on the entries needed
function displayWeatherData(data){
    const {name} = data;
    let {icon, description} = data.weather[0];
    let {temp, humidity, pressure} = data.main;
    let  {speed} = data.wind;
    let {country} = data.sys;
    let visibility = data.visibility;

    document.querySelector(".cityName").innerText = "Weather in " + name + ", " + country;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".temperature").innerText = temp + " °C";
    document.querySelector(".humidity").innerText =
      "Humidity:  " + humidity + "%";
    document.querySelector(".wind-speed").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".pressure").innerHTML = "Pressure:  " + pressure + " kPa";
    document.querySelector(".visibility").innerText =
      "Visibility:  " + visibility + " m";
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;

}

var searchBtn = document.getElementById("searchButton");

function search () {
    weather.fetchWeatherData(document.querySelector(".searchBar").value);
}

searchBtn.addEventListener("click", () => {
    search();
})

document.querySelector(".searchBar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      search();
    }
});
