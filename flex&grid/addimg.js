var counter = 1;

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