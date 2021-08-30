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
            callback(undefined, "The temperature out there is " + temp + ". It feels like " + feelslike + ".")
        }
    });
}

module.exports = forecast;