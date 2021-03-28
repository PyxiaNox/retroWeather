import tabJoursOrdre from './utilities/timeManagement.js'
//console.log("DEPUIS MAIN JS " + tabJoursOrdre)

const keyAPI = "0b5c9438fcd41f7b886aac1c5c7fc11a"
let resultAPI

const temps = document.querySelector(".temps")
const temperature = document.querySelector(".temperature")
const localisation = document.querySelector(".localisation")
const heure = document.querySelectorAll(".heure-nom-prevision")
const tempPourH = document.querySelectorAll(".heure-prevision-valeur")
const joursDiv = document.querySelectorAll(".jour-prevision-nom")
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp")
const imgIcone = document.querySelector(".logo-meteo")
const chargementContainer = document.querySelector(".overlay-icone-chargement")

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        //console.log(position)
        let long = position.coords.longitude
        let lat = position.coords.latitude
        callAPI(long, lat)
    }, () => {
        alert("La géolocalisation n'est pas activée, l'application ne peut donc pas fonctionner, veuillez l'activer.")
    })
}

function callAPI(long, lat){
    //console.log(long, lat)
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyAPI}`)
    .then((reponse) =>{
        return reponse.json()
    })
    .then((data) =>{
        //console.log(data)
        resultAPI = data
        temps.innerText = resultAPI.current.weather[0].description
        temperature.innerText = `${Math.trunc(resultAPI.current.temp)}°`
        localisation.innerText = resultAPI.timezone

        // heures par créneaux de trois heures avec températures
        let heureActuelle = new Date().getHours()

        for(let i = 0; i < heure.length; i++){
            let heureIncr = heureActuelle + i*3

            if(heureIncr > 24){
                heure[i].innerText = `${heureIncr-24}h`
            } else if(heureIncr == 24){
                heure[i].innerText = "0h"
            } else{
                heure[i].innerText = `${heureIncr}h`
            }           
        }

        for(let j = 0; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${Math.trunc(resultAPI.hourly[j*3].temp)}°`
        }

        // jours 
        for(let k = 0; k < tabJoursOrdre.length; k++){
            joursDiv[k].innerText = tabJoursOrdre[k].slice(0, 3)
        }
        for(let l = 0; l < 7; l++){
            tempJoursDiv[l].innerText = `${Math.trunc(resultAPI.daily[l+1].temp.day)}°`
        }

        //icône dynamique
        if(heureActuelle >=6 && heureActuelle <21){
            imgIcone.src = `img/jour/${resultAPI.current.weather[0].icon}.svg`
        } else{
            imgIcone.src = `img/nuit/${resultAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparition')
    })
}