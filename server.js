const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const cropPrices = [
    { name: "Wheat", price: 25 },
    { name: "Rice", price: 40 },
    { name: "Corn", price: 30 },
    { name: "Sugarcane", price: 35 },
    { name: "Potato", price: 20 }
];

app.get("/crop-prices", (req, res) => {
    res.json(cropPrices);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
