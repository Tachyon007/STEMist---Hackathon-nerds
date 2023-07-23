
//initial load
let urlParameters = window.location.search;
urlParameters = urlParameters.slice(1);
urlParameters = urlParameters.replaceAll("%20", " ");

let currentProjTitle = "any";
if(urlParameters.length > 0){
    currentProjTitle = urlParameters;
}

document.getElementById("currProjTitle").innerText = currentProjTitle;


//popup
function togglePopUp(){
    let target = document.getElementById("popup");

    if(target.style.display != "none"){
        target.style.display = "none";
    }else{
        target.style.display = "block"
    }
}