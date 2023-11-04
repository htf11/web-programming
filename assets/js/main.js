const allImages = new Array(
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg"
);
const dirName = "./assets/img/";

function load(){
  let img = document.querySelector('img');
  img.src = dirName + allImages[0];
}

function change_img(dir) {
  let img = document.querySelector('img');
  let item = img.src.split('/');
  let imgName = item[item.length - 1];
  let index = allImages.indexOf(imgName);
  let newIndex = index + dir;
  if (newIndex > allImages.length - 1) {
    newIndex = 0;
  }
  if (newIndex < 0) {
    newIndex = allImages.length - 1;
  }
  console.log(newIndex);
  img.src = dirName + allImages[newIndex];
}

window.onload = load();