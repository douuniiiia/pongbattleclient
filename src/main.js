import './style.css'
import { io } from "socket.io-client";
import { LeftScreen } from "./timeline/AILeft";
import { RightScreen } from './timeline/AIRight';
import { GameScreen } from './timeline/GameScreen';

const socket = io("http://localhost:3000");
// const socket = io("https://pong-battle-production.up.railway.app");
let timeline = new RightScreen;
// timeline.play();

const btnRole1 = document.querySelector("#left")
const btnRole2 = document.querySelector("#game")
const btnRole3 = document.querySelector("#right")


function selectRole(role) {
  console.log(`Je suis ${role}`)
  socket.emit("joinRoom", role)
  socket.emit("ready", ready)

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
