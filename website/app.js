/* Global Variables */
const apiKey = '028f4bc12c8999221fd449d5d6aadb7d&units=imperial';
let url = 'http://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();

  // Get value
  const zipCode = document.getElementById('zip').value;
  console.log(zipCode);
  const feelings = document.getElementById('feelings').value;

  // Update url
  url = `http://api.openweathermap.org/data/2.5/weather?q=${zipCode}&appid=${apiKey}`

  getWeather(url)
    .then(function(data) {
      postData('/addData', {
        date: newDate,
        temp: data.main.temp,
        content: feelings
      });
    }).then(function() {
      // Update UI
      retrieveData();
    });
}

/* Function to GET Web API Data*/
const getWeather = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;      
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */
const postData = async (newurl = '', data = {}) => {
  const response = await fetch(newurl, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        temp: data.temp,
        date: data.date,
        content: data.content
    })
  })
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to GET Project Data */
const retrieveData = async () =>{
  const request = await fetch('/allData');
  try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('date').innerHTML = allData.date;
  }
  catch(error) {
    console.log('error', error);
    // appropriately handle the error
  }
};