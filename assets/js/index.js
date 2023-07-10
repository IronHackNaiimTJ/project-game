const game = new Game("main-canvas");
const startBtn = document.getElementById("start-btn");

window.addEventListener("keydown", (event) => game.onKeyDown(event));
window.addEventListener("keyup", (event) => game.onKeyUp(event));
document.getElementById("main-canvas").style.display = "none";
startBtn.focus();

document.getElementById("start-btn").onclick = () => {
  startBtn.remove();
  document.getElementById("main-canvas").style.display = "block";
  game.start();
};
