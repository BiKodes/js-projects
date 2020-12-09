const key = "34a3a02f72b3ae5ac01c87c8b5c32b63";
const formEl = document.querySelector('form');
const details = document.querySelector('.details');

formEl.addEventListener('submit', (e)=>{
    e.preventDefault();
    details.innerHTML = '<h1>Loading.....</h1>';
    const location = e.target.location.value;
    weatherApp(location);
});

async function weatherApp(location){
    const data = await fetchAPI(location);
    generateHTML(data);
}

async function fetchAPI(location){
    const baseURL =`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}`;
    const res = await fetch(baseURL);
    const data = await res.json();
   
    console.log(data);
    return data;
}
function generateHTML(data){
const html = `
<h1 class="temp">${data.main.temp}°C</h1>
<h1 class="status">${data.weather[0].description}</h1>
<div class="more-info">
    <p>Country - ${data.sys.country}</p>
    <p>Wind Speed - ${data.wind.speed}km/hr</p>
    <p>Pressure - ${data.main.pressure}MB</p>  
</div>   
<div class="query">${data.sys.country}</div>
`;
details.innerHTML = html;
}