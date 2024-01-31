let date = document.getElementById("time"),
  day = document.querySelector(".day"),
  done = document.querySelector(".done"),
  fajr = document.querySelector(".fajr"),
  sun = document.querySelector(".sun"),
  dhuhr = document.querySelector(".dhuhr"),
  dhuhrPug = document.querySelector(".dhuhrPug"),
  asr = document.querySelector(".asr"),
  maghrib = document.querySelector(".maghrib"),
  isha = document.querySelector(".isha"),
  country = document.getElementById("country"),
  countryList = document.querySelector(".countryList"),
  countries = countryList.querySelectorAll("li"),
  res = "Cairo";
function today() {
  var t = new Date(),
    e = String(t.getDate()).padStart(2, "0"),
    a = String(t.getMonth() + 1).padStart(2, "0");
  (t = t.getFullYear() + "-" + a + "-" + e), (date.value = t);
}
function edit(t) {
  let e = "";
  return Number(t) > 12 ? (e = Number(t) - 12).toString() : t.toString();
}
function dhuhrpug(t) {
  t >= 12 ? (dhuhrPug.innerHTML = `مساءً`) : (dhuhrPug.innerHTML = `صباحًا`);
}
function main() {
  let t = date.value.split("-").reverse();
  (day.innerHTML = t[0] + "/" + t[1] + "/" + t[2]),
    countries.forEach((t) => {
      t.addEventListener("click", () => {
        (res = t.dataset.value), countryList.classList.remove("on"), (countryList.style.display = "none"), (country.style.borderRadius = "15px"), (country.innerHTML = t.innerHTML);
      });
    }),
    !(function e(a, r, i) {
      axios.get(`https://api.aladhan.com/v1/calendarByCity/${a}/${r}?city=Egyptian General Authority of Survey&country=${i}&method=1`).then((e) => {
        (fajr.innerHTML = e.data.data[Number(t[0]) - 1].timings.Fajr.slice(0, 6)), (sun.innerHTML = e.data.data[Number(t[0]) - 1].timings.Sunrise.slice(0, 6)), dhuhrpug(e.data.data[Number(t[0]) - 1].timings.Dhuhr.slice(0, 2)), (dhuhr.innerHTML = edit(e.data.data[Number(t[0]) - 1].timings.Dhuhr.slice(0, 2)) + e.data.data[Number(t[0]) - 1].timings.Dhuhr.slice(2, 6)), (asr.innerHTML = edit(e.data.data[Number(t[0]) - 1].timings.Asr.slice(0, 2)) + e.data.data[Number(t[0]) - 1].timings.Asr.slice(2, 6)), (maghrib.innerHTML = edit(e.data.data[Number(t[0]) - 1].timings.Maghrib.slice(0, 2)) + e.data.data[Number(t[0]) - 1].timings.Maghrib.slice(2, 6)), (isha.innerHTML = edit(e.data.data[Number(t[0]) - 1].timings.Isha.slice(0, 2)) + e.data.data[Number(t[0]) - 1].timings.Isha.slice(2, 6));
      });
    })(t[2], t[1], res);
}
(window.onload = () => {
  today(), main();
}),
  done.addEventListener("click", () => {
    main();
  }),
  (country.onclick = () => {
    !0 !== countryList.classList.contains("on") ? (countryList.classList.add("on"), (countryList.style.display = "block"), (country.style.borderRadius = "15px 15px 0 0")) : (countryList.classList.remove("on"), (countryList.style.display = "none"), (country.style.borderRadius = "15px"));
  });
