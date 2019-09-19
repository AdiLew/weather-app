const request = require('request');

const forecast = (lat, lon, callback) => {
    const dsApiKey = '7a082462b8803c852b80c55f9012ed89',
        url = `https://api.darksky.net/forecast/${dsApiKey}/${lat},${lon}?units=si`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Could not connect to weather services :(')
        }
        else if (body.error) {
            callback(body.error)
        }
        else {
            const {temperature, precipProbability, humidity} = body.currently,
                {summary: dailySummary, precipType = 'rain'} = body.daily.data[0],
                currentForecast = `${dailySummary} It is currently ${temperature} degrees out. There is a ${precipProbability * 100}% chance of ${precipType} and ${Math.floor(humidity*100)}% humidity.`;
            callback(undefined, currentForecast)
        }
    })


}

module.exports = forecast;