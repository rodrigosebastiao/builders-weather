const PORT = process.env.BACKEND_PORT || 4000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());


app.get("/location", (req, res)=>{
    const query = req.query;
    const {latitude, longitude, lang} = query;

    //sample: http://localhost:4000/location?latitude=-23.5736719&longitude=-46.665792
    const options = {
        method: "GET",
        url: `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&lang=${lang}&limit=1&appid=${process.env.APP_ID}`,
    }

    axios.request(options)
        .then((response)=>{
            res.json(response.data);
            console.log("Backend - Middleware Requested ✅ Location Succesfuly");
        })
        .catch(error=>{
            console.log(error, "💥");
            delete error.config;
            res.status(error.response.status).json(error);
        });
});

app.get("/weather", (req, res, next)=>{
    // res.json("Hellowww!");
    const query = req.query;
    const {city, units, lang} = query;
    console.log("Backend - Middleware Requested ✅ Weather Succesfuly");

    //sample: http://localhost:4000/weather?city=Sao%20Paulo
    const options = {
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${process.env.APP_ID}`,
        // headers: {
        //     "host": "api.openweathermap.org",
        //     "appid": process.env.APP_ID,
        // }
    }

    axios.request(options)
        .then((response)=>{
            res.json(response.data);
        })
        .catch(error=>{
            console.log(error, "💥");
            delete error.config;
            res.status(error.response.status).json(error);
        });
});

app.get("/weather-current", (req, res, next)=>{
    // res.json("Hellowww!");
    const query = req.query;
    const {city = "", units, latitude, longitude, lang} = query;
    console.log("Backend - Middleware Requested ✅ Weather Current Succesfuly");

    //sample: http://localhost:4000/weather-current?latitude=-23.5325&longitude=-46.7917
    const options = {
        method: "GET",
        // url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.APP_ID}`,
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=${lang}&city=${city}&units=${units}&appid=${process.env.APP_ID}`,
    }

    axios.request(options)
        .then((response)=>{
            res.json(response.data);
        })
        .catch(error=>{
            console.log(error, "💥");
            delete error.config;
            res.status(error.response.status).json(error);
        });
});

app.listen(PORT, console.log(`Middleware is running on port ${PORT}`));
