import { SwipeEventListener } from "swipe-event-listener";

const toggle = document.getElementById("dark-toggle");
const body = document.getElementById("body");
const header = document.getElementById("header");
const sidePanel = document.getElementById("sidepanel");
const btn = document.getElementById("button");
const task = document.querySelectorAll(".task-text");

toggle.addEventListener("change", (event) => {
  if (event.target.checked) {
    body.classList.add("body-dark");
    header.classList.add("header-dark");
    sidePanel.classList.add("sidepanel-dark");
    btn.classList.add("button-dark");
    task.forEach((element) => {
      element.classList.add("task-text-dark");
    });
  } else if (!event.target.checked) {
    body.classList.remove("body-dark");
    header.classList.remove("header-dark");
    sidePanel.classList.remove("sidepanel-dark");
    btn.classList.remove("button-dark");
    task.forEach((element) => {
      element.classList.remove("task-text-dark");
    });
  }
});

btn.onclick = newTask;
function newTask() {
  let newTask = document.createElement("div");
  newTask.className = "task";
  newTask.innerHTML =
    "<div><span>Lorem ipsum dolor sit amet consectetur adi</span></div>";

  btn.insertAdjacentElement("afterend", newTask);
}

// swipe functions

const { swipeArea, updateOptions } = SwipeEventListener({
  swipeArea: document.querySelector("body"),
});

swipeArea.addEventListener("swipeDown", () => {
  console.log("swipe down");
});
swipeArea.addEventListener("swipeUp", () => {
  console.log("swipe up");
});

swipeArea.addEventListener("swipeLeft", () => {
  console.log("swipe left");
});

swipeArea.addEventListener("swipeRight", () => {
  console.log("swipe right");
});
