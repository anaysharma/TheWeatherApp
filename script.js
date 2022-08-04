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
const cityList = document.createElement("form");
const modalHeading = document.createElement("h2");

closeModal.classList.add("close-modal");
submitModal.classList.add("submit-modal");
weatherBox.classList.add("weather-box");
weatherInfo.classList.add("weather-info");
searchBox.classList.add("search-box");
searchButton.classList.add("search-button");
currentLocationButton.classList.add("location-button");
messageBox.classList.add("message-box");
weekWeatherBox.classList.add("week-weather");
cityList.classList.add("city-list");
modalHeading.classList.add("modal-heading");

closeModal.innerText = "✖";
submitModal.innerText = "Submit";
searchButton.innerText = "Search";
modalHeading.innerText = "Select your City";
currentLocationButton.innerText = "Use Current Location";
searchInput.setAttribute("type", "text");
submitModal.setAttribute("type", "submit");

searchBox.append (
	searchInput,
	messageBox,
	searchButton,
	currentLocationButton
);

weatherBox.appendChild( weatherInfo );
modalBox.append( closeModal, cityList );
cityList.appendChild( modalHeading );

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
		handleWeatherData( weatherData );
	} catch ( error ) {
		alert("we are having trouble getting weather info :(");
		console.error( error );						
	}
}


function parseResponseJson ( data ) {
	if ( data.length === 1 ) {
		let lat = data.lat;
		let lon = data.lon;
		getWeather({ lat, lon });
	} else {
		for ( let i = 0; i < data.length; i++ ) {
			const cityListItem = document.createElement("input");
			const cityListItemLabel = document.createElement("label");
			cityListItem.classList.add("city-list-item");
			cityListItem.setAttribute("name", "city-choice");
			cityListItem.setAttribute("id", data[i].name + ", " + data[i].state );
			cityListItem.setAttribute("type", "radio");
			cityListItem.setAttribute("value", i );
			cityListItemLabel.innerText = data[i].name + ", " + data[i].state;
			if ( i === 0 ) { cityListItem.setAttribute("checked", "")}
			cityList.append( cityListItem, cityListItemLabel, submitModal );
			modalBox.show();
		}
		handleFormData( data );
	}
}

function handleFormData ( locData ) {
	cityList.addEventListener("submit", function(event) {
		var data = new FormData(cityList);
		for (const entry of data) {
			var output = { "latitude" : locData[entry[1]].lat,
				"longitude" : locData[entry[1]].lon
			};
		};
		getWeather( output );
		event.preventDefault();
	}, false);
}

function handleWeatherData ( data ) {
	console.log(data)
	// const html = JSON.stringify( data );
	// weatherBox.innerText = html;
}

getLocation("agra")