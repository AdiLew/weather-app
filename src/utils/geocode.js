const request = require('request');

const geocode = (address, callback) => {
    const mbApiKey = 'pk.eyJ1IjoiYWRpbGV3IiwiYSI6ImNqeGM3ZmlzdzAwZ28zcHF3c3V5bXJqaXkifQ.i1PV3F_Hi8fNe-1pubTUsQ',
        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mbApiKey}&limit=1`
    request({ url, json: true }, (error, {message, body}) => {
        
        if (error) { 
            callback('Unable to connect to location services :(') 
        }
        else if (message) { 
            callback(message) 
        }
        else if ( (!body.features) || body.features.length === 0) { 
            callback(`${address} is not a known location. Please try another search term.`) 
        }
        else {
            const 
            location = body.features[0],
            data = {
                lon: location.center[0],
                lat: location.center[1],
                placeName: location.place_name
            };
            callback(undefined, data)
        }
    })
}

module.exports = geocode;