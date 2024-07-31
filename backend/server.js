const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortenedUrl: String
});

const Url = mongoose.model('Url', urlSchema);

app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
  const shortenedUrl = shortid.generate();
  const newUrl = new Url({ originalUrl: url, shortenedUrl });
  await newUrl.save();
  res.json({ shortenedUrl: `https://url-shortener-backend-abhi.vercel.app/${shortenedUrl}` });
});

app.get('/:shortenedUrl', async (req, res) => {
  const { shortenedUrl } = req.params;
  const url = await Url.findOne({ shortenedUrl });
  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;