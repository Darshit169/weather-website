const path = require("path")
const express = require("express")
const app = express()
const hbs = require("hbs")
const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode")
const port=process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//rout handler
app.get('', (req, res) => {
    res.render("index", {
        title: "weather",
        name: "MD"
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About",
        name: "MD"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help",
        name: "MD",
        title1:"i will help you"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address)
    {
       return res.send({
            error:"you must provide an Address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
   
})

app.get("/products", (req, res) => {
    if(!req.query.search){
      return res.send({
        error:"you must provide a search term" 
      })    
    }
    console.log(req.query.search)
    res.send({
       
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "MD",
        errorMessage: "help article not found"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'MD',
        errorMessage: 'page not found.'
    })
})


app.listen(port, () => {
    console.log('server is up on port '+port)
})