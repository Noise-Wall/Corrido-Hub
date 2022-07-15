let counter = 1;
let grid = false;

function addImg() {

    let imgFrame = document.createElement('div');
    imgFrame.classList.add("imgFrame");
    let newImg = document.createElement('img');
    newImg.src = "image.png";
    newImg.alt = "image" + counter;
    newImg.id = "image" + counter;
    newImg.classList.add("image");
    imgFrame.appendChild(newImg)

    console.log("counter =", counter);
    counter++;

    let container = document.querySelector('.imgContainer');
    container.appendChild(imgFrame);
}

function switchFlexGrid () {

    container = document.querySelector(".imgContainer");

    if (grid !== true) {
        container.classList.remove("flex");
        container.classList.add("grid");
        grid = true;
    } else {
        container.classList.add("flex");
        container.classList.remove("grid");
        grid = false;
    }
}