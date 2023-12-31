let exampleData = [];
let useLocalJsonFile = true;
if(useLocalJsonFile){
    //LOCAL projects.json File
    fetch('../data/projects.json').then((res)=>{
        res.json().then((res)=>{
            exampleData = res;
            console.log(res, "data loaded")

            //searchFromURL
            let urlParameters = window.location.search;
            urlParameters = urlParameters.slice(1);
            if(urlParameters.length < 1){urlParameters = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p'}
            search(null, urlParameters)
        })
    })
}else{
    // WORKING SERVER FETCH -- UNCOMMENT WHENEVER WE'RE READY TO TEST SERVERS
    fetch('https://ideaspark-hack.glitch.me/allProjects', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    }).then((res) => {//loading
        res.json().then((loadedResponse)=>{
            console.log(loadedResponse)
            exampleData = loadedResponse;

            //searchFromURL
            let urlParameters = window.location.search;
            urlParameters = urlParameters.slice(1);
            if(urlParameters.length < 1){urlParameters = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p'}
            search(null, urlParameters)
        })
    })

}

function displayResults(searchResArr){
    let container = document.getElementById("resContainer");

    while(container.children.length > 0){
        container.removeChild(container.firstChild);
    }

    if(searchResArr.length == 0){
        let c = document.createElement("h2");
        c.style.textAlign = "center"
        c.style.marginTop = "15vmin"
        c.innerHTML = "No results found"

        container.appendChild(c);
    }

    for(let i = 0; i < searchResArr.length; i++){
        let c = document.createElement("div");
        c.className = "searchRes";

        let p = document.createElement("p");
        p.innerText = searchResArr[i][0].Title;
        c.appendChild(p);

        let hc = document.createElement("div");
        hc.style = "border-left: 1px solid black; position: relative;";
        let sp = document.createElement("span");
        sp.className = "material-symbols-outlined center1 redHover";
        sp.style = "font-size: 6vmin;";
        sp.innerHTML = "favorite"
        hc.appendChild(sp);
        c.appendChild(hc);

        let p2 = document.createElement("p");
        p2.innerText = searchResArr[i][0].Description;
        c.appendChild(p2);

        let hc2 = document.createElement("div");
        hc2.style = "border-left: 1px solid black; border-top: 1px solid black; position: relative;";
        let sp2 = document.createElement("span");
        sp2.className = "material-symbols-outlined center1 blueHover";
        sp2.style = "font-size: 6vmin;";

        sp2.innerHTML = "arrow_forward"
        sp2.onclick = ()=>{
            location.href = '../3 Project Showcase Page/index.html?' + searchResArr[i][0].Title;
        }
        hc2.appendChild(sp2);
        c.appendChild(hc2);
        
        container.appendChild(c);
    }
}

function search(el, searchString){
    let res = [];
    let search;

    if(searchString == null){
        search = el.value.split(" ");//turn string into array with each individual word
        search = search.filter((e)=>{//remove all empty spaces from search words
            return (e.length > 0)
        })
    }else{//URL case
        search = searchString.split(",");//turn string into array with each individual word
        search = search.filter((e)=>{//remove all empty spaces from search words
            return (e.length > 0)
        })

        console.log(search)
    }


    //interate through each project object
    for(let i = 0; i < exampleData.length; i++){
        if(i > 100){return res} //a lot of nested loops like this are scary so limiter

        let relavenceScore = 0;

        //loop through each word in the search to see if it matches
        for(let j = 0; j < search.length; j++){
            let keyWord = search[j].toLowerCase();

            let stringToSearch = exampleData[i].Title.toLowerCase();
            if(stringToSearch.includes(keyWord)){relavenceScore++}

            stringToSearch = exampleData[i].Description.toLowerCase();
            if(stringToSearch.includes(keyWord)){relavenceScore++}

            //see if any tags match our search word
            for(let k = 0; k < exampleData[i].Tags.length; k++){
                stringToSearch = exampleData[i].Tags[k].toLowerCase();
                if(stringToSearch.includes(keyWord)){relavenceScore++}
            }
        }

        if(relavenceScore > 0){
            res.push([exampleData[i], relavenceScore]);
        }
    }

    //sort results so best match first
    res.sort((a, b)=>{
        return (b[1] - a[1]);
    })

    //show results
    displayResults(res)

}

//popup
function togglePopUp(){
    let target = document.getElementById("popup");

    if(target.style.display != "none"){
        target.style.display = "none";
    }else{
        target.style.display = "block"
    }
}

function handlePopUpSubmission(){
    let pTitle = document.getElementById("pTitle").value;
    let pDescription = document.getElementById("pDescription").value;
    let pTags = document.getElementById("pTags").value;

    pTags = pTags.replaceAll(" ", "")
    pTags = pTags.split(",");
    pTags = pTags.filter((e)=>{
        return (e.length > 0)
    })

    let newPrompt = {
        "Title": pTitle,
        "Description": pDescription,
        "Tags": pTags,
        "ProjectID": Math.floor(Math.random() * 100000000)
    }
    newPrompt = JSON.stringify(newPrompt);


    fetch('https://ideaspark-hack.glitch.me/addProject', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: newPrompt
    }).then((res) => {//loading
        res.json().then((loadedResponse)=>{
            console.log(loadedResponse)
            exampleData = loadedResponse;

            search(null, pDescription)
        })
    })


    togglePopUp();

}