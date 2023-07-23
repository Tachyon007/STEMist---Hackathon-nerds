
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
    
      /*fetch('https://ideaspark-hack.glitch.me/addPersonalProject', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authorName: fName,
          projName: fProjName,
          description: fDesc,

          images: JSON.stringify(reader.result),
        })
      }).then((res) => {
        console.log(res);
      })*/
    
    }

    togglePopUp();

}

//load relevant pages