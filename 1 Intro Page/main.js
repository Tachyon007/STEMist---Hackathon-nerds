

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