class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.backgoundStart = new BackgroundStart(this.ctx);
    this.downConsole = new DownConsole(this.ctx);
    this.pilot = new Pilot(this.ctx, 5, this.canvas.height - 235);
    this.platforms = [];
    this.badFloors = [];
    this.audio = new Audio("/assets/audio/motorRun.mp3");
    this.tickPlatform = 0;
    this.tickBadFloor = 0;
    // this.audio.volume = 0.1
  }

  onKeyDown(event) {
    this.pilot.onKeyDown(event);
  }

  onKeyUp(event) {
    this.pilot.onKeyUp(event);
  }

  start() {
    this.addPlatform();
    setTimeout(() => {
      // this.audio.play()
    }, TIME_START);
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();

        this.clearPlatforms();
        this.platforms.forEach((platform) => this.checkPlatform(platform));
        if (this.tickPlatform > TIME_PLATFORM) {
          this.addPlatform();
          this.tickPlatform = 0;
        }
        this.tickPlatform++;

        this.clearBadFloors();
        this.badFloors.forEach((platform) => this.checkBadFloor(platform));
        if (this.tickBadFloor > TIME_BADFLOOR) {
          this.addBadFloor();
          this.tickBadFloor = 0;
        }

        this.tickBadFloor++;
      }, 1000 / this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.audio.pause();
    this.drawIntervalId = undefined;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  checkPlatform(platform) {
    const p = this.pilot;
    const pl = platform;
    const colx = p.x + p.w >= pl.x && p.x < pl.x + pl.w;
    const coly = p.y + p.h >= p.y0 && p.y < pl.y + pl.h;
    if (colx && coly) {
      this.pilot.jumping();
      this.pilot.jump();
    }
  }

  addPlatform() {
    this.platforms.push(new Platform(this.ctx, 200, this.canvas.height - 320));
  }

  clearPlatforms() {
    this.platforms = this.platforms.filter((platform) => platform.isVisible());
  }

  checkBadFloor(badFloor) {
    const p = this.pilot;
    const f = badFloor;
    const colx = p.x + p.w >= f.x && p.x < f.x + f.w;
    const coly = p.y + p.h >= f.y && p.y < f.y + f.h;
    if (colx && coly) {
      this.pilot.slowing();
      this.pilot.slow();
    }
  }

  addBadFloor() {
    this.badFloors.push(new BadFloor(this.ctx, 10, this.canvas.height - 180));
  }

  clearBadFloors() {
    this.badFloors = this.badFloors.filter((badFloor) => badFloor.isVisible());
  }

  move() {
    this.backgoundStart.move();
    this.pilot.starRace();
    this.pilot.move();
    this.platforms.forEach((platform) => platform.move());
    this.badFloors.forEach((badFloor) => badFloor.move());
  }

  draw() {
    this.backgoundStart.draw();
    this.downConsole.draw();
    this.platforms.forEach((platform) => platform.draw());
    this.badFloors.forEach((badFloor) => badFloor.draw());
    this.pilot.draw();
  }
}
