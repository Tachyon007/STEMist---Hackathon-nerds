
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

function handleProjectSubmission(){
    let fName = document.getElementById("fName").value;
    let projPrompt = currentProjTitle;
    let fProjName = document.getElementById("fProjName").value;
    let fDesc = document.getElementById("fDesc").value;
    let fImg = document.getElementById("fImg");


    let reader = new FileReader();
    reader.readAsDataURL(fImg.files[0]);

    reader.onloadend = function() {
        console.log(fName, fProjName, projPrompt, fDesc,)
        console.log("img --> char length : " + reader.result.length);
    
      fetch('https://ideaspark-hack.glitch.me/addPersonalProject', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fName: fName,
          fProjName: fProjName,
          fDesc: fDesc,
          projPrompt: projPrompt,

          fImg: JSON.stringify(reader.result),
        })
      }).then((res) => {
        console.log(res);
      })
    
    }

    togglePopUp();

}

//load relevant pages

function renderloadedContent(objArr){
    let container = document.getElementById("project-container");

    while(container.children.length > 0){
        container.removeChild(container.firstChild);
    }

    if(objArr.length == 0){
        let m = document.createElement("div");
        m.innerHTML = "<h3 style='text-align:center; width:90vw; margin-top:15vmin;'>No results found<h3>"
        container.appendChild(m);
    }

    for(let i = 0; i < objArr.length; i++){

        let m = document.createElement("div");
        m.className = "projProfile";

        let d4 = document.createElement("div");
        d4.id = "imageboxK";
        d4.style = "grid-row: span 2;";
        let image = document.createElement("img");
        d4.appendChild(image);
        image.src = objArr[i].image.replaceAll('"', '');

        let d1 = document.createElement("div");
        d1.id = "titleboxK";
        d1.style = "position: relative;";
        d1.innerHTML = "<p class='center1'>" + objArr[i].Title + "</p>";

        let d3 = document.createElement("div");
        d3.id = "infoboxK";
        d3.style = "position: relative;";
        d3.innerHTML = "<p class='center1'>author: <br>" + objArr[i].author  + "</p>";

        let d2 = document.createElement("div");
        d2.id = "descboxK";
        d2.style = "position: relative; text-align:left";
        d2.innerHTML = "<p class='center1' style='width:100%; font-size: 2.5vmin'>&nbsp;&nbsp;&nbsp;&nbsp;" + objArr[i].Description + "</p>";
        
        let d5 = document.createElement("div");
        d5.id = "ratingboxK";
        d5.style = "position: relative;";
        d5.innerHTML = `<span class="material-symbols-outlined center1 blueHover" style="font-size: 10vmin;">
                            arrow_forward
                        </span>`;

        m.appendChild(d4);
        m.appendChild(d1);
        m.appendChild(d3);
        m.appendChild(d2);
        m.appendChild(d5);

        container.appendChild(m);

    }

}

function loadProjects(){
    fetch('https://ideaspark-hack.glitch.me/lookUpProject', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Prompt:currentProjTitle,
        })
      }).then((res) => {
            res.json().then((loadedResponse)=>{
                console.log(loadedResponse);
                renderloadedContent(loadedResponse);
            })
      })
}

//load all relevant projects when page loads
loadProjects();