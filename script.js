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

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab")
    }

    if(!searchForm.classList.contains("active")){
        userContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
    }
    else{
        
    }
}
userTab.addEventListener("click", ()=>{
    switchTab(userTab);
});

searchTab.addEventListener("click", ()=>{
    switchTab(searchTab);
});
