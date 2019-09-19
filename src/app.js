const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));



//app.com
app.get('', (req, res) => {
    //res.send('Hey there!')
    res.render('index',
        {
            title: 'Weather App',
            name: 'Adi'
        })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        something: 'Pizza'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!',
        helpMessage: "Here's where you get help."
    })
})

//app.com/weather
app.get('/weather', (req, res) => {
    const { address } = req.query;
    if ((!address) || address.length === 0) {
        return res.send({
            error: 'An address must be provided!'
        })
    }
    
    geocode( address, (error, {lat, lon, placeName}={}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(lat, lon, (error, forecast) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                address,
                location: placeName,
                forecast
            })
        }) 
    })
    
    // res.send({ 
    //     address: address, forecast: 'It\'s gonna be hot and awesome' })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term!' })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oh no!',
        error: 'Support article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oh no!',
        error: 'Page not found :('
    })
})

app.listen(port, () => {
    console.log('The server is up on port 3000')
})
