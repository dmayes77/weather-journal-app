/* Global Variables */
const apiKey = '2d1d3290bbd02b9aec6bd465616bed65';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Dynamically accept zipcode
const weatherURL = (zipCode) => {
  return `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`;
};

const convertTemp = (k) => {
  const temp = {
    fahrenheit: Math.round(((Number(k) - 273.15) * 9) / 5 + 32),
    celcius: Math.round(Number(k) - 273.15),
  };
  return temp;
};

// GET the Weather from OpenWeatherMap API
const getWeatherData = async () => {
  const zipCode = document.getElementById('zip').value;
  const res = await fetch(weatherURL(zipCode));
  try {
    const data = await res.json();
    const temp = convertTemp(data.main.temp);
    const content = document.getElementById('feelings').value;
    const newData = {
      date: newDate,
      cityName: data.name,
      temp,
      content,
    };
    return newData;
  } catch (err) {
    console.log('error:', err);
  }
};

// POST to the Journal(on local server)
const postData = async (url = '', newData = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('error:', err);
    return false;
  }
};

// Add the data to the Page (Update UI)
const updateUI = (data) => {
  let newHTML = `<div id="date">Today is ${data.date}</div>
    <div id="temp">In ${data.cityName}, it is ${data.temp.fahrenheit}°F and ${data.temp.celcius}°C.</div>
    <span>How are you felling today?</span>
    <div id="content">    ${data.content}</div>`;

  document.querySelector('#entryHolder').innerHTML = newHTML;
};

document
  .getElementById('generate')
  .addEventListener('click', () =>
    getWeatherData().then((data) =>
      postData('/api', data).then((data) => updateUI(data))
    )
  );
