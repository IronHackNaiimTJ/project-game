const game = new Game("main-canvas");
window.addEventListener("keydown", (event) => game.onKeyDown(event));
window.addEventListener("keyup", (event) => game.onKeyUp(event));
game.start(); // en un futuro se llamar como boton
