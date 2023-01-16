const onglet = document.getElementById("mobile-onglet")
const nav = document.querySelector("nav")

onglet.addEventListener("click", event => {
    if(document.getElementById("onglets").style.visibility == "visible"){
        document.getElementById("onglets").style.visibility = "hidden"
        document.getElementById("buttons").style.visibility = "hidden"
        nav.style.visibility = "collapse"
        document.body.style.overflow = "scroll"
    }
    else{
        document.getElementById("onglets").style.visibility = "visible"
        document.getElementById("buttons").style.visibility = "visible"
        nav.style.visibility = "visible"
        document.body.style.overflow = "hidden"
    }
})
