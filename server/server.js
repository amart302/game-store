const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/api/steam/:appId", async (req, res) => {
    try {
        const gameId = req.params.appId;
        const responce = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${gameId}`);
        res.json(responce.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Steam API' });
    }
});

app.listen(3000, () => {
    console.log("Сервер запущен на http://localhost:3000");
});