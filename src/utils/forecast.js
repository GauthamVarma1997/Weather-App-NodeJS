const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5504048692b26788613a799d670f2fee&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({ url, json:true}, (error, { body:data }) => {
        if(error) {
            callback("Could not connect to Weatherstack.", undefined);
        }
        else if(data.error) {
            callback("Data provided is invalid.", undefined);
        }
        else {
            const temp = data.current.temperature;
            const feelslike = data.current.feelslike;
            const weatherDescription = data.current.weather_descriptions[0]
            const cloudCover = data.current.cloudcover
            const humidity = data.current.humidity
            console.log(data.current)
            callback(undefined, weatherDescription+". The Temperature out there is " + temp + " and it Feels like " + feelslike + ". There is a Cloud cover of "+cloudCover+" with a Humidity of "+humidity+".")
        }
    });
}

module.exports = forecast;