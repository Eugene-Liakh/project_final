const toggle = document.getElementById("dark-toggle");
const toggleDiv = document.querySelector(".header__toggle");
const body = document.getElementById("body");
const header = document.getElementById("header");
const sidePanel = document.getElementById("sidepanel");

const btn = document.getElementById("button");
const form = document.getElementById("form");
const input = document.getElementById("input");

const submit = document.getElementById("submit");

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
    sidePanel.classList.add("sidepanel-dark");
    btn.classList.add("button-dark");
    task.forEach((element) => {
      element.classList.add("task-dark");
    });
  } else if (!event.target.checked) {
    body.classList.remove("body-dark");
    toggleDiv.classList.remove("toggle-dark");
    header.classList.remove("header-dark");
    sidePanel.classList.remove("sidepanel-dark");
    btn.classList.remove("button-dark");
    task.forEach((element) => {
      element.classList.remove("task-dark");
    });
  }
});

btn.onclick = showForm;
iconPlus.onclick = showForm;

function showForm() {
  form.classList.toggle("active");
  if (btn.innerText === "New task") {
    btn.innerText = "Hide input";
  } else {
    btn.innerText = "New task";
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

      function generateRandomInteger(max) {
        return Math.floor(Math.random() * max) + 1;
      }

      let storageId = generateRandomInteger(20);
      let storageValue = data;

      localStorage.setItem("id:" + storageId, "text:" + storageValue);
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

function resetAtMidnight() {
  let now = new Date();
  let night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // the next day, ...
    0,
    0,
    0 // ...at 00:00:00 hours
  );
  let msToMidnight = night.getTime() - now.getTime();

  function reset() {
    localStorage.clear();
  }

  setTimeout(function () {
    reset();
    resetAtMidnight();
  }, msToMidnight);
}
resetAtMidnight();

import * as Hammer from "./hammer";

setInterval(function () {
  let allTasks = document.querySelectorAll(".task");

  allTasks.forEach((e) => {
    let happen = new Hammer(e);
    happen.on("panleft panright", function (ev) {
      e.classList.add("completed");
      e.innerHTML = "☑️ COMPLETED";
      setTimeout(function () {
        e.classList.add("animate__animated");
        e.classList.add("animate__bounceOutRight");
      }, 600);

      setTimeout(function () {
        e.remove();
      }, 1800);
    });
  });
}, 2000);
