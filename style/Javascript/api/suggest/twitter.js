const url="https://api.twitter.com/1.1/search/tweets.json"
const axios = require('axios');

class Twitter{
    get(query,count,value_max){
        return axios.get(url, { params: {
            q: query,
            count: count,
            tweet_mode:"extended",
            max_id: value_max
          },
          headers:{
            "Authorization": `Bearer ${process.env.TWITTER_API_TOKEN}`
          }
      
        }) 
    }
}

module.exports=Twitter;