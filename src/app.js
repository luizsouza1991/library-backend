require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Routes = require("./routes");

const app = express();

app.use(cors());
app.disable('x-powered-by');
app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

new Routes(app);

mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)

module.exports = app;