const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const Twitter=require('./api/suggest/twitter')
const twitter=new Twitter()
require('dotenv').config()

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin',"*")
  next();
})

app.get('/tweets', (req, res) => {
    console.log(req.query)
    const query=req.query.q;
    const count=req.query.count;
    //console.log(process.env.TWITTER_API_TOKEN)
    const value_max=req.query.max_id;
    const url="https://api.twitter.com/1.1/search/tweets.json"
    twitter.get(query,count, value_max).then ((response) => {
    res.status(200).send(response.data)
 //   console.log(response.data);
  }).catch((err) => {
    res.status(400).send(err);

  })


  })

app.listen(port, () => {
  console.log(`Twitter-clone app listening at http://localhost:${port}`)
})