async function showWeather(){
    // let latiitude = 15.3333;
    // let longitude = 74.0833;

    try{
        const API_KEY = "3b660790a882d954a35fdd870a5eb3e3";

    let CITY = "Goa";

    const response = await fetch(`https://api.weatherstack.com/current?access_key=${API_KEY}&query=${CITY}`);

    const data = await response.json();

    console.log("weather data:-> " , data);

    let newPara = document.createElement('p');
    newPara.textContent = `${data?.current?.temperature.toFixed(2)} °C`

    document.body.appendChild(newPara);
    }
    catch(err){
        console.log("error aaya hai", err);
    }

}