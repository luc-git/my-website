
setInterval(() => {
    const toDay = new Date().getTime()
const event = new Date("2023-2-18 14:00:00").getTime() //+ 50400000
const difference = event - toDay

const days = Math.floor(difference / (1000*60*60*24))
const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) )
const minutes = Math.floor((difference % (1000* 60 * 60)) / (1000 * 60))
const seconds = Math.floor((difference % (1000 * 60)) / 1000)

document.getElementById("days").innerText = days + " J"
document.getElementById("hours").innerText = hours + " H"
document.getElementById("minutes").innerText = minutes + " M"
document.getElementById("seconds").innerText = seconds + " S"

},1000)

const onglet = document.getElementById("mobile-onglet")
const nav = document.querySelector("nav")

onglet.addEventListener("click", event => {
    if(document.getElementById("onglets").style.visibility == "visible"){
        document.getElementById("onglets").style.visibility = "hidden"
        //document.getElementById("buttons").style.visibility = "hidden"
        nav.style.visibility = "collapse"
        document.body.style.overflow = "scroll"
    }
    else{
        document.getElementById("onglets").style.visibility = "visible"
        //document.getElementById("buttons").style.visibility = "visible"
        nav.style.visibility = "visible"
        document.body.style.overflow = "hidden"
    }
})
