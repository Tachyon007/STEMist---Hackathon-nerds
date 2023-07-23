
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

    for(let i = 0; i < objArr.length; i++){

        let m = document.createElement("div");
        m.className = "mainbox";

        let d1 = document.createElement("div");
        d1.id = "titlebox";
        d1.innerText = objArr[i].Title;

        let d2 = document.createElement("div");
        d2.id = "descbox";
        d2.innerHTML = objArr[i].Description;

        let d3 = document.createElement("div");
        d3.id = "infobox";
        d3.innerHTML = objArr[i].author;

        let d4 = document.createElement("div");
        d4.id = "imagebox";
       /* let image = document.createElement("img");
        d4.appendChild(image);
        image.src = objArr[i].image;
        image.alt = "";

        image.onload = () =>{
            image.src = objArr[i].image;
            alert(1)
        }*/
        


        console.log(objArr[i].image)

        let d5 = document.createElement("div");
        d5.id = "ratingbox";
        d5.innerHTML = "";

        m.appendChild(d1);
        m.appendChild(d2);
        m.appendChild(d3);
        m.appendChild(d4);
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