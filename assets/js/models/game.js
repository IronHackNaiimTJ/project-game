class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.backgound = new Background(this.ctx);
    this.pilot = new Pilot(this.ctx, 10, this.canvas.height - 155)
    this.audio = new Audio('/assets/audio/motorRun.mp3')
    this.audio.volume = 0.1
  }
  onKeyDown(event) {
    this.pilot.onKeyDown(event);
  }

  onKeyUp(event) {
    this.pilot.onKeyUp(event);
  }
  start() {
    if (!this.drawIntervalId) {
      // this.audio.play()
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
      }, 1000 / this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.audio.pause()
    this.drawIntervalId = undefined;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move() {
    this.backgound.move();
    this.pilot.move();
  }

  draw() {
    this.backgound.draw();
    this.pilot.draw();
  }
}
