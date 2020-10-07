const api={
	key:"616a375ad1fa21a3c9abc90aac292f97",
	base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox =document.querySelector('.search');
searchbox.addEventListener('keypress',setWeather);

function setWeather(evt){
	if(evt.keyCode ==13){
		getResults(searchbox.value)
	}
}

function getResults(country){
	fetch(`${api.base}weather?q=${country}&units=metric&APPID=${api.key}`).then(weather=>{
		return weather.json();
	}).then(displayResults);
}

function displayResults(weather){
	
	let city = document.querySelector('.location .city');
	city.innerHTML=`${weather.name}, ${weather.sys.country}`;

	let temp = document.querySelector('.current .temp');
	temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;

	let currweather = document.querySelector('.current .weather');
	currweather.innerHTML=weather.weather[0].description;
	
	let hilow = document.querySelector('.hi-low');
	hilow.innerHTML=`${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;

	let now = new Date();
	let date = document.querySelector('.location .date');
	date.innerHTML=dateBuilder(now)

}

function dateBuilder(d){
	let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
	let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	let day=days[d.getDay()];
	let date=d.getDate();
	let month=months[d.getMonth()];
	let year=d.getFullYear();

	return `${day}, ${date} ${month} ${year}`;
}
