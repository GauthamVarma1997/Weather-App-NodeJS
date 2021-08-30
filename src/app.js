const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3001

const app = express();

// Define paths for Express config
const publicDirectoryName = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryName));

app.get('', (req, res) => {
    // res.send('<h1>Welcome to my Content!</h1>');
    res.render('index', {
        title : 'Weather App',
        name:'Jeff Musk'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        message : 'This is a Helpful page',
        title: 'Help',
        name:'Jeff Musk'
    });
});

app.get('/about', (req, res) => {
    // res.render('about');
    res.render('about', {
        title: 'About',
        name:'Jeff Musk'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message:'Help article not found',
        name : 'Jeff Musk',
        title: 404
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({error:'Address not Provided'})
    }
    geocode(address, (error, { latitude, longitude, location }={}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                address: req.query.address,
                location,
                forecast : forecastData
            })
        })
    })
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message:'404 : Page not found',
        name:'Jeff Musk',
        title: 404
    })
})

app.listen(port, ()=>console.log('Server is up on port ' + port));

