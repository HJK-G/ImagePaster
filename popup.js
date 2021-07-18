let imgurl = document.getElementById("imgurl");

// image should already be copied, paste will open the popup with the clipboard contents
let pastedImage = document.getElementById("pastedImage");

navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
  // If permission to read the clipboard is granted or if the user will
  // be prompted to allow it, we proceed.
  imgurl.textContent = result.state;

  if (result.state == "granted" || result.state == "prompt") {
    navigator.clipboard.read().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].types.includes("image/png")) {
          alert("Clipboard contains non-image data. Unable to access it.");
        } else {
          data[i].getType("image/png").then((blob) => {
            imgElem.src = URL.createObjectURL(blob);
          });
        }
      }
      
      imgurl.textContent = "asdf";
    });
    imgurl.textContent = "idk";
  }
});