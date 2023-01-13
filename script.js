
setInterval(() => {
    const toDay = new Date().getTime()
const event = new Date("2023-2-18 14:00:00").getTime() //+ 50400000
const difference = event - toDay

const days = Math.floor(difference / (1000*60*60*24))
const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) )
const minutes = Math.floor((difference % (1000* 60 * 60)) / (1000 * 60))
const seconds = Math.floor((difference % (1000 * 60)) / 1000)

document.getElementById("days").innerText = days + " Jour(s)"
document.getElementById("hours").innerText = hours + " Heure(s)"
document.getElementById("minutes").innerText = minutes + " Minute(s)"
document.getElementById("seconds").innerText = seconds + " Seconde(s)"

},1000)

const onglet = document.getElementById("mobile-onglet")

onglet.addEventListener("click", event => {
    if(document.getElementById("onglets").style.visibility == "visible"){
        document.getElementById("onglets").style.visibility = "hidden" 
    }
    else{
        document.getElementById("onglets").style.visibility = "visible" 
    }
})