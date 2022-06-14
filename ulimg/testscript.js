const image_input = document.querySelector("#image_input");
var uploaded_image = "";

image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        //document.querySelector("#image").style.backgroundImage = `url(${uploaded_image})`;

        document.querySelector("#image").src = uploaded_image;
    });

    reader.readAsDataURL(this.files[0]);
});