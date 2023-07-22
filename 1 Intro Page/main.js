import pData from '/data/projects.json'assert {type: 'json'}; // Import main json
console.log(pData)
console.log(pData[0])

const keys = ['Title', 'Description', 'Tags'] // Dict keys
// for index in pData, assign html element each key's value
let index = 0
keys.forEach(key => {
    const output = document.getElementById('p'+key) // Get Element ID
    output.innerHTML = pData[index][key] // Assign Value
})



//Survey Scroll
function scrollToSurvey(){
    document.getElementById("tagSelect").scrollIntoView({ behavior: "smooth"});
}

//tag selector
let selectedTags = [];

function toggleTagSelect(el){
    let cl = el.classList;
    if(cl.contains("tagGridSelected")){
        cl.remove("tagGridSelected");
        selectedTags = selectedTags.filter((e)=>{
            return (e != el.innerText);
        })
    }else{
        cl.add("tagGridSelected");
        selectedTags.push(el.innerText);
    }
}

//navigation
function surveySearch(){
    location.href = '../2 Idea Prompts Page/index.html?' + selectedTags;
}

function randomSearch(){
    location.href = '../2 Idea Prompts Page/index.html?' + "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p";
}