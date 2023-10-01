const gallery = document.getElementById("gallery");
const fotoSearchInput = document.getElementById("foto__search__window");
const fotoSearchIcon = document.getElementById("foto__search__icon");
const seasonBtn = document.getElementById("season__offer");
const eraseBtn = document.getElementById('foto__search__close');
const nameSeasons = ["winter", "spring", "summer", "autumn"];
const url =
  "https://api.unsplash.com/photos?&per_page=30&client_id=4YMpbf-9HPlj0XYmNzNjMDTT4mwcO1YzbQuzjfnBjq4";
const date = new Date();



async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  gallery.innerHTML = "";
  data.forEach((img) => {
    gallery.innerHTML += `<div class="picture" style="background: url(${img.urls.small})" data-link="${img.urls.raw}"></div>`;
  });
  setListener();
}
async function getImages(url) {
  const res = await fetch(url);
  const data = await res.json();
  gallery.innerHTML = "";
  data.results.forEach((img) => {
    gallery.innerHTML += `<div class="picture" style="background: url(${img.urls.small})" data-link="${img.urls.raw}"></div>`;
  });
  setListener();
}
function getSeason() {
  return Math.round((date.getMonth() / 12) * 4) % 4;
}

function setListener() {
  const listOfPic = document.querySelectorAll(".picture");
  listOfPic.forEach((picture) => {
    picture.addEventListener("dblclick", () => {
      window.open(picture.dataset.link, "_blank");
    });
  });
}

function setColorPalette(time) {
  if (time >= 5 && time <= 18) {
    document.documentElement.style.setProperty("--main", "black");
    document.documentElement.style.setProperty("--second", "white");
  } else {
    document.documentElement.style.setProperty("--main", "white");
    document.documentElement.style.setProperty("--second", "black");
  }
}


function imagesFind(keyword) {
  const url = `https://api.unsplash.com/search/photos?&per_page=30&query=${keyword}&client_id=4YMpbf-9HPlj0XYmNzNjMDTT4mwcO1YzbQuzjfnBjq4`;
  getImages(url);
}
function eraseInput() {
  fotoSearchInput.value = '';
}

fotoSearchIcon.addEventListener("click", () => {
  !fotoSearchInput.value ? getData(url) : imagesFind(fotoSearchInput.value);
});
fotoSearchInput.addEventListener("keypress", (e) => {
  !searchInput.value
    ? e.key === "Enter" && getData(url)
    : e.key === "Enter" && imagesFind(fotoSearchInput.value);
});
seasonBtn.addEventListener("click", () => {
  const season = nameSeasons[getSeason()];
  const url = `https://api.unsplash.com/search/photos?&per_page=30&query=${season}&client_id=4YMpbf-9HPlj0XYmNzNjMDTT4mwcO1YzbQuzjfnBjq4`;
  getImages(url);
});
eraseBtn.addEventListener('click', () => eraseInput())

fotoSearchInput.focus();
setColorPalette(date.getHours());
getData(url);
