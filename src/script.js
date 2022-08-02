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

	}
}
getLocation("london")