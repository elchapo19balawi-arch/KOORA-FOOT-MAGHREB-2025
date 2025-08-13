
exports.handler = async function(event, context) {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  if(!RAPIDAPI_KEY){
    return { statusCode: 500, body: JSON.stringify({error: 'RAPIDAPI_KEY not configured on Netlify'}) };
  }
  const date = (event.queryStringParameters && event.queryStringParameters.date) || new Date().toISOString().slice(0,10);
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}`;
  try{
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    });
    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  }catch(err){
    return { statusCode: 500, body: JSON.stringify({error: err.message}) };
  }
};
