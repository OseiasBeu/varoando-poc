require('dotenv').config();
const express = require('express');
// const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

// parse requests of content-type - application/json
// app.use(bodyParser.json());
mongoose.connect(process.env.ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`🔥 Server started at http://localhost:${ process.env.PORT || 3000 }`)
    });
});


