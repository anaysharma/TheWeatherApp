const body = document.body;
const mainBox = document.createElement("main");
const weatherBox = document.createElement("div");
const weatherInfo = document.createElement("div");
const searchBox = document.createElement("div");
const searchInput = document.createElement("input");
const searchButton = document.createElement("button");
const currentLocationButton = document.createElement("button");
const messageBox = document.createElement("div");
const weekWeatherBox = document.createElement("div");
const modalBox = document.createElement("dialog");
const closeModal = document.createElement("button");
const submitModal = document.createElement("button");

closeModal.classList.add("close-modal");
submitModal.classList.add("submit-modal");
weatherBox.classList.add("weather-box");
weatherInfo.classList.add("weather-info");
searchBox.classList.add("search-box");
searchButton.classList.add("search-button");
currentLocationButton.classList.add("location-button");
messageBox.classList.add("message-box");
weekWeatherBox.classList.add("week-weather");

closeModal.innerText = "✖";
submitModal.innerText = "Submit";
searchButton.innerText = "Search";
currentLocationButton.innerText = "Use Current Location";
searchInput.setAttribute("type", "text");

searchBox.append (
	searchInput,
	messageBox,
	searchButton,
	currentLocationButton
);

weatherBox.appendChild( weatherInfo );

mainBox.append (
	weatherBox,
	searchBox,
	weekWeatherBox
);

body.append( mainBox, modalBox );

const API_KEY = "81987dd79e0d74f1918035c9e09b452e";

async function getLocation ( city ) {
	try {
		const location = await fetch (
			`http://api.openweathermap.org/geo/1.0/direct?q=${ city }&limit=5&appid=${ API_KEY }`
		);
		const locationData = await location.json();
		parseResponseJson( locationData );
	} catch ( error ) {
		console.error( error );
	}
}

function getCurrentLocation () {
	navigator.geolocation.getCurrentPosition (
		onSuccess,
		onError,
		{
			maximumAge:60000,
			timeout:10000,
			enableHighAccuracy:true
		}
	);
	function onSuccess ( position ) {
		const {
			latitude,
			longitude
		} = position.coords;
		return { latitude, longitude };
	}
	function onError ( error ) {
		console.log ( error );
	}
}

async function getWeather ( coordinates ) {
	try {
		let latitude = coordinates.latitude;
		let longitude = coordinates.longitude;
		const weatherResponse = await fetch (
			`https://api.openweathermap.org/data/2.5/weather?lat=${ latitude }&lon=${ longitude }&appid=${ API_KEY }`
		);
		const weatherData = await weatherResponse.json();
		console.log( weatherData );
	} catch ( error ) {
		console.error( error );						
	}
}


function parseResponseJson ( data ) {
	if ( data.length === 1 ) {
		let lat = data.lat;
		let lon = data.lon;
		return { lat, lon };
	} else {
		const requiredData = {};
		// requiredData.
	}
}
getLocation("london")