const toggle = document.getElementById("dark-toggle");
const toggleDiv = document.querySelector(".header__toggle");
const body = document.getElementById("body");
const header = document.getElementById("header");
const weatherDiv = document.querySelector(".header__weather");
const sidePanel = document.getElementById("sidepanel");
const locallyStored = { ...localStorage };
let savedIds = Object.keys(locallyStored);

const btn = document.getElementById("button");
const form = document.getElementById("form");
const input = document.getElementById("input");

const submit = document.getElementById("submit");
const counterEl = document.querySelector(".header__counter");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const iconInf = document.getElementById("info");
const iconPlus = document.getElementById("plus");
const footerInf = document.getElementById("footer__info");
const moon = document.getElementById("moon");

const footer = document.getElementById("footer");

toggle.addEventListener("change", (event) => {
  let task = document.querySelectorAll(".task");

  if (event.target.checked) {
    body.classList.add("body-dark");
    toggleDiv.classList.add("toggle-dark");
    header.classList.add("header-dark");
    weatherDiv.classList.add("header__weather-dark");
    counterEl.classList.add("header__counter-dark");
    sidePanel.classList.add("sidepanel-dark");
    btn.classList.add("button-dark");
    task.forEach((element) => {
      element.classList.add("task-dark");
    });
  } else if (!event.target.checked) {
    body.classList.remove("body-dark");
    toggleDiv.classList.remove("toggle-dark");
    header.classList.remove("header-dark");
    weatherDiv.classList.remove("header__weather-dark");
    counterEl.classList.remove("header__counter-dark");
    sidePanel.classList.remove("sidepanel-dark");
    btn.classList.remove("button-dark");
    task.forEach((element) => {
      element.classList.remove("task-dark");
    });
  }
});

btn.onclick = showForm;
iconPlus.onclick = showForm;
form.addEventListener("keyup", function (e) {
  if (
    (e.key == "Escape" || e.key == "Esc") &&
    form.classList.contains("active")
  ) {
    showForm();
  }
});

function showForm() {
  form.classList.toggle("active");

  if (btn.innerText === "New task") {
    btn.innerText = "Hide input";
    input.focus();
  } else {
    btn.innerText = "New task";
    input.blur();
  }
}

submit.onclick = createTask;

submit.addEventListener("click", (e) => {
  e.preventDefault();
});

function createTask() {
  submit.addEventListener("click", (e) => {
    e.preventDefault(); // needed to prevent page from refresh upon click on submit

    let data = input.value;

    if (data === "") {
      return; // check-up to forbid passing an emty value
    } else {
      let newTask = document.createElement("div");
      newTask.classList.add("task");
      newTask.textContent = data;
      form.insertAdjacentElement("afterend", newTask);
      input.value = "";

      function generateTimeStamp() {
        let now = new Date();
        return now.getTime();
      }

      let storageId = generateTimeStamp();
      let storageValue = data;

      newTask.setAttribute("task-id", storageId);
      localStorage.setItem(storageId, storageValue);
    }
  });
}

sidePanel.addEventListener("dblclick", (e) => {
  sidePanel.classList.add("delete");
  setTimeout((e) => {
    sidePanel.remove();
  }, 400);
});

//footer navigation functions
iconInf.addEventListener("click", (e) => {
  footerInf.classList.toggle("active");
});

moon.addEventListener("click", (e) => {
  let task = document.querySelectorAll(".task");

  body.classList.toggle("body-dark");
  header.classList.toggle("header-dark");

  sidePanel.classList.toggle("sidepanel-dark");
  btn.classList.toggle("button-dark");
  task.forEach((element) => {
    element.classList.toggle("task-dark");
  });
  footer.classList.toggle("footer-dark");
  footerInf.classList.toggle("dark");
});

import * as Hammer from "./hammer";

setInterval(function () {
  let allTasks = document.querySelectorAll(".task");

  allTasks.forEach((e) => {
    let happen = new Hammer(e);
    happen.on("panleft panright", function (ev) {
      e.classList.add("completed");
      e.innerHTML = "☑️ COMPLETED";
      let toBeDeleted = e.getAttribute("task-id");

      setTimeout(function () {
        e.classList.add("animate__animated");
        e.classList.add("animate__bounceOutRight");
      }, 600);

      setTimeout(function () {
        localStorage.removeItem(toBeDeleted);
        e.remove();
      }, 1800);
    });
  });
}, 2000);

//for loader

window.addEventListener("load", function () {
  const loader = document.querySelector(".loader-wrapper");
  loader.classList.add("hidden");
});

// ON PAGE LOAD:
// 1) the script deletes all the tasks displayed in DOM
// 2) then another script checks their id's and if they equal yesterday's timestamp the task gets deleted.

function deleteAllTasks() {
  let allTasks = document.querySelectorAll(".task");
  allTasks.forEach((e) => {
    e.remove();
  });
}
deleteAllTasks();

function restoreItems(e) {
  let now = new Date().getDate();
  let num = new Number(e);
  let timeStamp = new Date(num).getDate();
  let daysPassed = now - timeStamp;

  if (daysPassed == 0) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("task");
    newDiv.setAttribute("task-id", e);
    newDiv.innerHTML = localStorage.getItem(e);
    form.insertAdjacentElement("afterend", newDiv);
  } else {
    localStorage.removeItem(e);
  }
}

savedIds.forEach((e) => {
  restoreItems(e);
});

function detectDarkMode() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    if (window.matchMedia("(orientation: portrait)").matches) {
      moon.click();
    } else {
      toggle.click();
    }
  }
}
detectDarkMode();

function countDownToMidnight() {
  setInterval(function () {
    let now = new Date();
    let nextDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    let a = nextDay.getTime();
    let b = now.getTime();

    let distance = a - b;
    let hoursLeft = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

    hours.innerHTML = hoursLeft;
    minutes.innerHTML = minutesLeft;
    seconds.innerHTML = secondsLeft;
  }, 1000);
}
countDownToMidnight();

console.log(config);

const urlAPI =
  "https://api.openweathermap.org/data/2.5/weather?q=Kyiv,ua&units=metric&APPID=" +
  `${config.key}`;

async function getWeather(a) {
  let response = await fetch(a);
  let data = await response.json();

  try {
    // Here we parse temperature, sunrise, sunset time, location, and wind from API response
    const { temp_max: temperature } = data.main;
    const { sunrise: sunriseTime, sunset: sunsetTime } = data.sys;
    const name = data.name;
    const windSpeed = data.wind.speed;
    const iconAPI = data.weather[0].icon;

    //convert the UTC time from API response to JS-compatible timing
    let convertedSunriseTime = new Date(sunriseTime * 1000);
    let convertedsunsetTime = new Date(sunsetTime * 1000);

    // Weather elements
    const weatherSlot = document.getElementById("weatherSlot");
    const location = document.getElementById("location");
    const description = document.getElementById("description");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");
    const wind = document.getElementById("wind");
    const weatherIcon = document.getElementById("weather-icon");

    weatherSlot.innerHTML =
      "🌡Max.temp: " + Math.round(temperature) + "℃" + " |";
    location.innerHTML = " " + name;
    description.innerHTML = data.weather[0].description;

    sunrise.innerHTML =
      "☀️Sunrise: " + convertedSunriseTime.toLocaleTimeString() + " |";
    sunset.innerHTML =
      "☀️Sunset: " + convertedsunsetTime.toLocaleTimeString() + " |";
    wind.innerHTML = "💨Windspeed: " + windSpeed + "m/sec";
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconAPI}.png`;
  } catch (error) {
    console.log("Houston, we have a problem...(with fetching weather API)");
    console.error(error);
  }
}

getWeather(urlAPI);
