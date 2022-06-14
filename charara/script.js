const main = document.querySelector(".container");
const hideName = document.getElementById("hideLabel");
const hideNumber = document.getElementById("hideNumber");
const imgUpload = document.querySelector("#imgUpload");
const imgBar = document.getElementById("imgScrollBar");
const setImg = document.getElementById("setImg");
let switchImg;
let imgCounter = 0;

count();

main.addEventListener("click", (event) => {
  // + icon functionality.
  // Adds a slot for a new character.
  if (event.target.className.includes("fa-square-plus")) {
    currentRow = event.target.parentElement.parentElement;

    chara = createChara();

    // collects icons, then deletes to place again at the end of the queue.
    iconChara = event.target;
    iconRow = event.target.nextElementSibling;

    currentRow.insertBefore(chara, currentRow.lastChild);

    count();
  }

  // - icon functionality.
  // Removes a character slot. If there is an image inside, returns the image to the imgScrollbar.
  else if (event.target.className.includes("fa-square-minus")) {
    currentRow = event.target.parentElement.parentElement;
    lastChara =
      currentRow.lastChild.previousElementSibling.previousElementSibling;
    charasInRow = currentRow.querySelectorAll(".chara");

    if (charasInRow.length > 1) {
      deletedChara = charasInRow[charasInRow.length - 1];
      if (deletedChara.children[1].firstElementChild !== null) {
        if (deletedChara.children[1].firstElementChild.tagName == "IMG") {
          imgBar.appendChild(deletedChara.children[1].firstElementChild);
        }
      }
      currentRow.removeChild(deletedChara);
    }
    count();
  }

  // add row icon functionality.
  // Adds a new row.
  else if (event.target.className.includes("fa-arrow-right-to-bracket")) {
    row = document.createElement("div");
    row.classList.add("row");
    rank = document.createElement("input");
    rank.setAttribute("type", "text");
    rank.setAttribute("placeholder", "Set rank...");
    rank.classList.add("rank");

    chara = createChara();

    buttonBar = document.createElement("div");
    buttonBar.classList.add("buttonBar");
    iconCharaPlus =
      event.target.previousElementSibling.previousElementSibling.cloneNode(
        true
      );
    iconCharaMinus = event.target.previousElementSibling.cloneNode(true);
    iconRowPlus = event.target.cloneNode(true);
    iconRowMinus = event.target.nextElementSibling.cloneNode(true);

    buttonBar.appendChild(iconCharaPlus);
    buttonBar.appendChild(iconCharaMinus);
    buttonBar.appendChild(iconRowPlus);
    buttonBar.appendChild(iconRowMinus);

    row.appendChild(rank);
    row.appendChild(chara);
    row.appendChild(buttonBar);

    main.insertBefore(
      row,
      event.target.parentElement.parentElement.nextElementSibling
    );

    count();
  }
  // x button functionality
  // Deletes entire row. If there are images in the chara containers, returns them to the imgScrollbar.
  else if (event.target.className.includes("fa-xmark")) {
    currentRow = event.target.parentElement.parentElement;

    imgsInRow = currentRow.querySelectorAll(".charaImg");

    if (currentRow.id !== "topRow") {
      main.removeChild(currentRow);

      for (img of imgsInRow) {
        if (img.firstElementChild == null)
          continue;
        if (img.firstElementChild.tagName == "IMG")
          imgBar.appendChild(img.firstElementChild);
      }
    
      count();
    }
  }
});

// returns image on a container to the imgBar
main.addEventListener("contextmenu", (event) => {
  if (event.target.className == "image"){
    event.preventDefault();
    imgBar.appendChild(event.target);
  }
})

imgBar.addEventListener("contextmenu", (event) => {
  if (event.target.className == "image"){
    event.preventDefault();
  }
})

// hide name checkbox functionality.
hideName.addEventListener("input", (value) => {
  const nameLabels = document.querySelectorAll(".name");
  const rankLabels = document.querySelectorAll(".rank");

  if (value.explicitOriginalTarget.checked == true) {
    for (label of nameLabels) {
      label.style.display = "none";
    }
    for (rank of rankLabels) {
      rank.style.display = "none";
    }
  } else {
    for (label of nameLabels) {
      label.style.display = "block";
    }
    for (rank of rankLabels) {
      rank.style.display = "block";
    }
  }
});

hideNumber.addEventListener("input", (value) => {
  const numberLabels = document.querySelectorAll(".number");

  if (value.explicitOriginalTarget.checked == true) {
    for (number of numberLabels) {
      number.style.display = "none";
    }
  } else {
    for (number of numberLabels) {
      number.style.display = "block";
    }
  }
});

// opens file selector, uploads it to the site and displays it on the image bar
function readFileAsImg(file) {
  return new Promise(function(resolve, reject) {
      let reader = new FileReader();
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.onerror = () => {
          reject(reader);
      };
      reader.readAsDataURL(file);
  });
}

imgUpload.addEventListener("change", (event) => {
  let files = event.currentTarget.files;
  let readers = [];
  
  if (!files.length) return;
  
  for(let i = 0; i < files.length; i++){
      readers.push(readFileAsImg(files[i]));
  }
  Promise.all(readers).then((values) => {
      for (img in values) {
          let newImg = document.createElement("img");
          newImg.classList.add("image");
          newImg.draggable = "true";
          newImg.setAttribute("ondragstart", "drag(event)");
          newImg.id = "uplImg" + imgCounter;
          imgCounter++;
          newImg.src=values[img];
          imgBar.appendChild(newImg);
      }
  }).catch((err) => {
    console.error(err);
  });    
}, false);

// drag and drop functionality
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);

  switchImg = ev.target.parentElement;
  console.log("dragging " + ev.dataTransfer.getData("text"));
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log("target " + ev.target);
  if (ev.target.tagName == "DIV")
    ev.target.appendChild(document.getElementById(data));
  else if (ev.target.tagName == "IMG") {
    ev.target.parentElement.appendChild(document.getElementById(data));
    switchImg.appendChild(ev.target);
  }
}

// assign the numbers to the number labels, hopefully it works automatically when adding different rows
function count() {
  var counter = 1;
  ranking = document.querySelectorAll(".number");
  ranking.forEach((element) => {
    element.innerHTML = counter;

    if (counter > 9) {
      element.classList.add("numbertwo");
    } else {
      element.classList.remove("numbertwo");
    }
    counter++;
  });
}

function createChara() {
  chara = document.createElement("div");
  chara.classList.add("chara");
  number = document.createElement("p");
  number.classList.add("number");
  number.innerHTML = "#";
  charaImg = document.createElement("div");
  charaImg.classList.add("charaImg");
  charaImg.setAttribute("ondrop", "drop(event)");
  charaImg.setAttribute("ondragover", "allowDrop(event)");
  nameLabel = document.createElement("input");
  nameLabel.setAttribute("spellcheck", "false");
  nameLabel.setAttribute("maxlength", "19");
  nameLabel.setAttribute("placeholder", "Enter a name...");
  nameLabel.classList.add("name");

  chara.appendChild(number);
  chara.appendChild(charaImg);
  chara.appendChild(nameLabel);

  return chara;
}

// html2canvas at work
setImg.addEventListener("click", (event) => {
  moveRank = main.querySelectorAll(".rank");
  options = { allowTaint: false, windowWidth: 1100 }

  adjust = new Promise(() => {
    for (rank of moveRank){
      rank.style.left="-65px";
      rank.style.fontSize="1.6em";
      rank.style.fontWeight="800";
    }
  }).then(html2canvas(main, options).then((canvas) => {
    
    const overlay = document.querySelector(".overlay");
    const img = document.createElement("img")
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("resultDiv")
    
    overlay.style.display = "block";
    overlay.appendChild(resultDiv);
    resultDiv.appendChild(img);

    /*
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.target ="_blank";
    a.click(); */
  })).then(() => {
    for (rank of moveRank){
      rank.style.left="-78px";
      rank.style.fontSize="2rem";
      rank.style.fontWeight="normal";
    }
  }).catch((err) => {
    console.error(err);
  });
});
