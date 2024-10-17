const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const city = event.queryStringParameters.city;
  const apiKey = process.env.API_KEY;

  const apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  const response = await fetch(apiurl);
  const data = await response.json();

  if (response.status === 404) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "City not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
