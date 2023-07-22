import pData from '/data/projects.json'assert {type: 'json'}; // Import main json
console.log(pData)
console.log(pData[0])

// Dictionary Keys
const keys = ['Title', 'Description', 'Tags']
// for index in pData, assign html element each key's value
let index = 0
keys.forEach(key => {
    const output = document.getElementById('p'+key)
    output.innerHTML = pData[index][key]
})



//Survey Scroll
function scrollToSurvey(){
    document.getElementById("tagSelect").scrollIntoView({ behavior: "smooth"});
}

//tag selector
function toggleTagSelect(el){
    let cl = el.classList;
    if(cl.contains("tagGridSelected")){
        cl.remove("tagGridSelected");
    }else{
        cl.add("tagGridSelected");
    }
}