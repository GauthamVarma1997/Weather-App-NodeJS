const request = require('request');

const geocode = (address, callback) => { 
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoid2VhdGhlcmFwcC1iYXlvbjE4NTk5IiwiYSI6ImNrc2pyMjRvbDBvOGkydm94YnZwb2VjZnoifQ.RTniZ0lskNPqILU8yVlrLg&limit=1";
    request({url, json:true}, (error, { body:data }) => {
        if (error){
            callback("Not able to connect to MapBox.", undefined);
        } else if(data.features.length===0){
            callback("No data found.", undefined)
        } else {
            callback(undefined, {
                'latitude' : data.features[0].center[1],
                'longitude' : data.features[0].center[0],
                'location' : data.features[0].place_name
            })
        }
    }) 
}

module.exports = geocode;