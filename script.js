// async function showWeather(){
//     // let latiitude = 15.3333;
//     // let longitude = 74.0833;

//     try{
//         const API_KEY = "3b660790a882d954a35fdd870a5eb3e3";

//     let CITY = "Goa";

//     const response = await fetch(`https://api.weatherstack.com/current?access_key=${API_KEY}&query=${CITY}`);

//     const data = await response.json();

//     console.log("weather data:-> " , data);

//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.current?.temperature.toFixed(2)} °C`

//     document.body.appendChild(newPara);
//     }
//     catch(err){
//         console.log("error aaya hai", err);
//     }

// }

// function getLocation(){

// }
// **************************************************************************************************

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-seachForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//initial variable needed
let currentTab = userTab;
const API_KEY = "3b660790a882d954a35fdd870a5eb3e3";
currentTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab")
    }

    if(!searchForm.classList.contains("active")){
        searchForm.classList.add("active");
        userContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
    }
    else{
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        getfromSessionStorage();
    }
}

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat , lon} = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    //API call
    try{
        const response = await fetch(`https://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${lon}`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
    }

}

function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    cityName.innerText = weatherInfo?.location?.name;
    // countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.location?.country.toLowerCase()}.png`;
    //Flag ke liye mehnat
    const countryName = weatherInfo?.location?.country;
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then(response => response.json())
      .then(data => {
          const flagId = data[0]?.cca2;
          if(flagId) {
              countryIcon.src =`https://flagcdn.com/144x108/${flagId.toLowerCase()}.png`;
          } else {
              console.log("Error aaya hai")
          }
      })
    //mehnat over
    desc.innerText = weatherInfo?.current?.weather_descriptions?.[0]; 
    weatherIcon.src = weatherInfo?.current?.weather_icons?.[0]; 
    temp.innerText = `${weatherInfo?.current?.temperature}°C`; 
    windSpeed.innerText = `${weatherInfo?.current?.wind_speed} km/h`;
    humidity.innerText = `${weatherInfo?.current?.humidity}%`; 
    cloudiness.innerText = `${weatherInfo?.current?.cloudcover}%`; 
} 
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("No Geolocation support available");
    }
}

function showPosition(position){

    const usercoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(usercoordinates) );
}

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(
            `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
        );

        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        console.log("error aaya hai at fetchSearchWeatherInfo");
    }
}

userTab.addEventListener("click", ()=>{
    switchTab(userTab);
});

searchTab.addEventListener("click", ()=>{
    switchTab(searchTab);
});

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName === "") 
        return;
    else{
        fetchSearchWeatherInfo(cityName);
    }
})