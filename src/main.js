import './style.css'
import { io } from "socket.io-client";
import { LeftScreen } from "./timeline/AILeft";
import { RightScreen } from './timeline/AIRight';
import { GameScreen } from './timeline/GameScreen';

const socket = io("http://localhost:3000");
let timeline = new RightScreen;
// timeline.play();

const btnRole1 = document.querySelector("#role1")
const btnRole2 = document.querySelector("#role2")
const btnRole3 = document.querySelector("#role3")
const ready = document.querySelector("#ready")

function selectRole(role) {
  console.log(`Je suis ${role}`)
  socket.emit("joinRoom", role)

  switch(role){
    case "LeftScreen":
    timeline = new LeftScreen();
    break;
    case "RightScreen":
      timeline = new RightScreen();
      break;
      case "GameScreen":
    timeline = new GameScreen();
    break;
  }
}

btnRole1.addEventListener("click", selectRole("Left"));

function setReady() {
  console.log("I am ready");
  socket.emit("ready");
}


socket.on("start", ({time}) => {
  console.log("Start reçu")
  timeline?.play();
});


btnRole1.addEventListener("click", () => selectRole("LeftScreen"));
btnRole2.addEventListener("click", () => selectRole("RightScreen"));
btnRole3.addEventListener("click", () => selectRole("GameScreen"));
ready.addEventListener("click", setReady);

