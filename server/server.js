const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

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

function saveBase64Image(base64String, outputPath) {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(outputPath, buffer);
}

const dir = path.resolve(__dirname, '../client/src/assets/uploads');

const outputFilePath = path.join(dir, `${Date.now()}.png`);

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

app.post("/upload", (req, res) => {
    console.log(req);
    
    if(!req.file){
        return res.status(400).send('Нет файла');
    }
    const base64Image = req.file;
    saveBase64Image(base64Image, outputFilePath);
});

app.listen(3000, () => {
    console.log("Сервер запущен на http://localhost:3000");
});