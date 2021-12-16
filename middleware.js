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
    console.log("Backend - Middleware Requested Location");

    const options = {
        method: "GET",
        url: `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&lang=${lang}&limit=1&appid=${process.env.APP_ID}`,
    }

    axios.request(options)
        .then((response)=>{
            res.json(response.data);
        })
        .catch(error=>{
            console.log(error);
        });
});

app.get("/weather", (req, res)=>{
    // res.json("Hellowww!");
    const query = req.query;
    const {city, units, lang} = query;
    console.log("Backend - Middleware Requested Weather");

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
            console.log(error);
        });
});

app.get("/weather-current", (req, res)=>{
    // res.json("Hellowww!");
    const query = req.query;
    const {city = "", units, latitude, longitude, lang} = query;
    console.log("Backend - Middleware Requested Weather");

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
            console.log(error);
        });
});

app.listen(PORT, console.log(`Middleware is running on port ${PORT}`));
