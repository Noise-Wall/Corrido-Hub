projects = document.getElementById("projects");
testSite = document.getElementById("testsite");
titles = document.querySelectorAll(".titular");

showProjects();

function showProjects() {
    projects.classList.add("show");
    projects.classList.remove("hide");
    titles[0].style.backgroundColor = "#3A3335"
    
    testSite.classList.remove("show");
    testSite.classList.add("hide");
    titles[1].style.backgroundColor = "transparent"
}

function showTestSite() {

    projects.classList.add("hide");
    projects.classList.remove("show");
    titles[0].style.backgroundColor = "transparent"
    
    testSite.classList.add("show");
    testSite.classList.remove("hide");
    titles[1].style.backgroundColor = "#3A3335"
}