const axios = require("axios");

exports.handler = async (event) => {
  try {
    let date = new Date().toISOString().slice(0, 10);
    if (event.queryStringParameters.date) {
      date = event.queryStringParameters.date;
    }

    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: { date },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'Accept-Language': 'ar'
      }
    };

    const response = await axios.request(options);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};