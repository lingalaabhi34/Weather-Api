
const form = document.getElementById("input");
const WeatherContainer = document.getElementById("weather-container");
const url='https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY}&units=metric';
const API_KEY='eba6f122079354c1574c61520d9de148';
const inputvalue = document.getElementById('input-data');
let weatherArr = [];
let weatherObjArr=[];
form.addEventListener('submit',(e)=>{
	e.preventDefault();
	let cityname = inputvalue.value;
	if(cityname === ''){
		alert('please enter city name');
		return;
	}
	if(weatherArr.includes(cityname)){
		alert(`${cityname.toUpperCase()} city name already exists!`);
		return;
	}
	else{
		weatherArr.push(cityname);
		checkcityweather(cityname);
	}
	form.reset();
})
async function checkcityweather(city){
	try{
		let result =await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
		let data = await result.json();
    let icon_url = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    let obj = {
      cityName: data.name,
      weather: data.weather[0].description,
      temp: data.main.temp,
      feel: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind: data.wind.speed,
      clouds: data.clouds.all,
      sys_sunRise: data.sys.sunrise,
      sys_sunSet: data.sys.sunset,
      img_url: icon_url,
    };
	weatherObjArr.push(obj);
	weatherObjArr.sort((a,b)=>a['temp']-b['temp']);
	weatherDetails(weatherObjArr);
	}
	catch (err) {
		console.log(err);
	  }
}
function weatherDetails(objArray) {
	WeatherContainer.innerHTML = "";
	objArray.forEach((element) => {
	  const name = element.cityName;
	  const weather = element.weather;
	  const main = element.temp;
	  const wind = element.wind;
	  const clouds = element.clouds;
	  const sys_sunRise = element.sys_sunRise;
	  const img= element.img_url;
	  const feel= element.feel;
	  const humidity= element.humidity;
	  const pressure= element.pressure;
	  let sunRise_time = new Date(sys_sunRise * 1000);
	  sunRise_time = `${sunRise_time.getHours()} : ${sunRise_time.getMinutes()} am`;
	  let sys_sunSet = element.sys_sunSet;
	  let sunSet_time = new Date(sys_sunSet * 1000);
	  sunSet_time = `${sunSet_time.getHours()} : ${sunSet_time.getMinutes()} pm`;
	  let weather_div = document.createElement("div");
	  weather_div.className = "weather-div";
	  weather_div.innerHTML = `<div id="temp_deg">
								  <div>${main} <span>&#176;</span>C</div>
								  <div><img src=${img}></div>
							  </div>
								  <div>
									  <div id="extra-details">
										<div id="feels-like"> 
										  <div>${feel} <span>&#176;</span>C<sub> feels like</sub></div>
										  <div>${weather} <sub>weather</sub></div>
										</div>
										<div id="wind-detail"><div>${wind} m/s <sub>Wind speed</sub></div><div>${humidity}% <sub>Humidity</sub></div><div>${pressure} hPa <sub>Air Pressure</sub></div></div>
										<div id="cloudiness">Cloudiness ${clouds}%</div>
									  </div>
									  <div id="city-name-container">
										  <div>
										  <p id="city-name-p">${name.toUpperCase()}</p>
										  </div>
										  <div id="sun">
											<p><span class=material-icons id="sunrise_icon">wb_sunny</span><span>${sunRise_time}</span></p>
											<p><span class=material-icons id="sunset_icon">wb_twilight</span><span>${sunSet_time}</span></p>
										  </div>
									  </div>
								  </div>
							  `;
							  WeatherContainer.appendChild(weather_div);
	});
  }