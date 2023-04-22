require('dotenv').config();
const express = require('express');
const cors = require('cors')
const router = require('./routes/router');
const { errorHandler } = require('./error/errorHandler');
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api',  router)

app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server started at PORT : ' + PORT);
})