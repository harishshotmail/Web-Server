const path = require('path')
const express = require('express');;
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//define paths 
const publicDirectoryPath = path.join(__dirname, '../public')
const templateDirectoryPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials');
//setup handlebar engine and file paths
app.set('view engine', 'hbs');
app.set('views', templateDirectoryPath);
hbs.registerPartials(partialPaths);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        names:"harish"
    });
})
app.get('/about' ,(req, res) => {
    res.render('about', {
        title:'about',
        names:"harish"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please enter address",
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        console.log('latitude', latitude);
        console.log('longitude', longitude);
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { 
                return res.send({error}) 
            };
           res.send({
               forecastData,
               location,
               address: req.query.address
           })
        })
    })
})
app.get('*', (req, res) => {
    res.send('Page 404');
})

app.listen(3000, ()=>{
    console.log("Server is up and running on port 3000");
})