////
//------- Const for API Key -------//
const apiKey="7e89f55a8f7db2ab9870625685c6f9bd";// Always replace with your actual OpenWeatherMap API key

//------- Async/Await with Fetch ------- aysnc-> let us wait for sometime and assumes value available in the future(promises)//
async function getWeather() {
    //------- Template Literals and Const -------//
    const city= document.getElementById('cityInput').value;//calling id= cityInput from HTML to access info about it
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;//used backticks (var and expression into string),q=${city}&appid=${apiKey}=>used var.names line 3 and 9(city and apikey)to access info ,units=metric(to show units in celsius)

    try{
         //------- Await with Fetch -------//
         const response=await fetch(url);//fetch something from url(var name to acces url) and until it is fetching (fetch-keyword)the data it is gonna wait(await -keyword) 

         if(!response.ok){//(not equal to fn)
             //------- Throw in Async/Await Context(if the response is not ok -> it's gonna throw some error) -------//
             throw new Error(`HTTP ERROR! Status: ${response.status}`) //throw error when api key is wrong        

         }
          //------- Destructuring JSON Response(if it got the error)-------//
          const data=await response.json();
          displayWeather(data);//fn.call->to print all the data
          
    }
    catch(error) {
        console.error('Failed to fetcch weather data.',error);//throw error when input is wrong
        alert('Failed to fetch weather data.');//alert msg
    }

}

function displayWeather(data) //fn.defintion=>called above
{
      //------- Destructuring for Easier Access to Nested Data -------//
     const {main:{temp, humidity},weather,wind:{speed},sys:{country},name}=data;
     const [{main:weatherMain,description,icon}]=weather;//Nested Destructing
      //destruction->again construction manually ->all grouped data to individual data by descontructing manually(fetching only needed data and leaving unneeded data to display in website)=>simplify the code

        //------- Const for DOM Manipulation -------//
        const weatherDisplay=document.getElementById('weatherDisplay');//calling id=weatherDisplay from html
        if(data.cod !== 200)//not equal to fn ,cod=co-ordinate(coord) form weather api data
            {
            weatherDisplay.innerHTML=`<p>Error: ${data.message}</p>`;//msg.display if data not found/valid/not displayed properly
            return;
        }

         //------- Template Literals for HTML Generation -------//
         const weatherHTML= `<h2>Weather in ${name},${country}</h2>
         <p>Temapture:${temp} °C </p>
         <p>Weather:${weatherMain} (${description})</p>
         <p>Humidity:${humidity}</p>
         <p>Wind:${speed}</P>
         <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon" alt="weather icon">
         `;
         weatherDisplay.innerHTML=weatherHTML;

}
