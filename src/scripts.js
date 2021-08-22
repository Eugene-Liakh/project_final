import { SwipeEventListener } from "swipe-event-listener";

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
  console.log("click");
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
      console.log(data);
      let newTask = document.createElement("div");
      newTask.classList.add("task");
      newTask.textContent = data;
      form.insertAdjacentElement("afterend", newTask);
      input.value = "";
    }
  });
}

function removeObj() {
  console.log("1234567");
}
sidePanel.addEventListener("dblclick", (e) => {
  console.log("123456");
});

//footer navigation functions
iconInf.addEventListener("click", (e) => {
  console.log("CLICK");
  footerInf.classList.toggle("active");
});

moon.addEventListener("click", (e) => {
  let task = document.querySelectorAll(".task");

  console.log("CLICK");
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

// function newTask() {
//   let newTask = document.createElement("div");
//   newTask.className = "task";
//   newTask.innerHTML =
//     "<div><span>Lorem ipsum dolor sit amet consectetur adi</span></div>";

//   btn.insertAdjacentElement("afterend", newTask);
// }

// swipe functions

// const { swipeArea, updateOptions } = SwipeEventListener({
//   swipeArea: document.querySelector(".major__task__wrapper"),
// });

// swipeArea.addEventListener("swipeDown", () => {
//   console.log("swipe down");
// });
// swipeArea.addEventListener("swipeUp", () => {
//   console.log("swipe up");
// });

// swipeArea.addEventListener("swipeLeft", () => {
//   console.log("swipe left");
// });

// swipeArea.addEventListener("swipeRight", () => {
//   console.log("swipe right");
// });
