let date = document.getElementById("time");
let day = document.querySelector(".day");
let done = document.querySelector(".done");

let fajr = document.querySelector(".fajr");
let sun = document.querySelector(".sun");
let dhuhr = document.querySelector(".dhuhr");
let dhuhrPug = document.querySelector(".dhuhrPug");
let asr = document.querySelector(".asr");
let maghrib = document.querySelector(".maghrib");
let isha = document.querySelector(".isha");

let country = document.getElementById("country");
let countryList = document.querySelector(".countryList");
let countries = countryList.querySelectorAll("li");
let res = "Cairo";

window.onload = () => {
  today();
  main();
};

function today() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  date.value = today;
}

function edit(e) {
  let newE = "";
  if (Number(e) > 12) {
    newE = Number(e) - 12;
  } else {
    return e.toString();
  }
  return newE.toString();
}

function dhuhrpug(i) {
  if (i >= 12) {
    dhuhrPug.innerHTML = `مساءً`;
  } else {
    dhuhrPug.innerHTML = `صباحًا`;
  }
}

function main() {
  let inputValue = date.value.split("-").reverse();
  day.innerHTML = inputValue[0] + `/` + inputValue[1] + `/` + inputValue[2];
  countries.forEach((e) => {
    e.addEventListener("click", () => {
      res = e.dataset.value;
      countryList.classList.remove("on");
      countryList.style.display = "none";
      country.style.borderRadius = "15px";
      country.innerHTML = e.innerHTML;
    });
  });
  function getData(y, m, stat) {
    axios.get(`https://api.aladhan.com/v1/calendarByCity/${y}/${m}?city=Egyptian General Authority of Survey&country=${stat}&method=1`).then((r) => {
      fajr.innerHTML = r.data.data[Number(inputValue[0]) - 1].timings.Fajr.slice(0, 6);
      sun.innerHTML = r.data.data[Number(inputValue[0]) - 1].timings.Sunrise.slice(0, 6);
      dhuhrpug(r.data.data[Number(inputValue[0]) - 1].timings.Dhuhr.slice(0, 2));
      dhuhr.innerHTML = edit(r.data.data[Number(inputValue[0]) - 1].timings.Dhuhr.slice(0, 2)) + r.data.data[Number(inputValue[0]) - 1].timings.Dhuhr.slice(2, 6);
      asr.innerHTML = edit(r.data.data[Number(inputValue[0]) - 1].timings.Asr.slice(0, 2)) + r.data.data[Number(inputValue[0]) - 1].timings.Asr.slice(2, 6);
      maghrib.innerHTML = edit(r.data.data[Number(inputValue[0]) - 1].timings.Maghrib.slice(0, 2)) + r.data.data[Number(inputValue[0]) - 1].timings.Maghrib.slice(2, 6);
      isha.innerHTML = edit(r.data.data[Number(inputValue[0]) - 1].timings.Isha.slice(0, 2)) + r.data.data[Number(inputValue[0]) - 1].timings.Isha.slice(2, 6);
    });
  }
  getData(inputValue[2], inputValue[1], res);
}

done.addEventListener("click", () => {
  main();
});

country.onclick = () => {
  if (countryList.classList.contains("on") !== true) {
    countryList.classList.add("on");
    countryList.style.display = "block";
    country.style.borderRadius = "15px 15px 0 0";
  } else {
    countryList.classList.remove("on");
    countryList.style.display = "none";
    country.style.borderRadius = "15px";
  }
};
