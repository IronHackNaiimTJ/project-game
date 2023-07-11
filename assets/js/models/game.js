class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.backgoundStart = new BackgroundStart(this.ctx);
    this.downConsole = new DownConsole(this.ctx);
    this.pointDraw = new Point(this.ctx, 262, this.canvas.height - 56);
    this.timeDraw = new TimeGame(this.ctx, 462, this.canvas.height - 56);
    this.jumpStatus = new JumpStatus(this.ctx, 70, this.canvas.height - 20);
    this.pilot = new Pilot(this.ctx, 5, this.canvas.height - 235);
    this.platforms = [];
    this.badFloors = [];
    this.badFloorsPlataform = false;
    this.badFloorsDown = false;
    this.coins = [];
    this.point = 0;
    this.audio = new Audio("/assets/audio/motor1.mp3");
    this.audioCoin = new Audio("/assets/audio/coin.mp3");
    this.audioGameOver = new Audio("/assets/audio/gameover.mp3");
    this.tickPlatform = 0;
    this.tickBadFloor = 0;
    this.life = new Life(this.ctx);
    this.lifes = [this.life, this.life, this.life];
    this.lifesDeleted = false;
    this.tickCoin = 0;
    this.audio.volume = 0.5;
    this.audioCoin.volume = 0.5;
  }

  madeSpeedUp() {
    this.backgoundStart.vx -= BACKGROUND_SPEED_NEXTLEVEL;
    this.pilot.vx -= BACKGROUND_SPEED_NEXTLEVEL;
    this.platforms.map((i) => (i.vx -= BACKGROUND_SPEED_NEXTLEVEL));
    this.coins.map((i) => (i.vx -= BACKGROUND_SPEED_NEXTLEVEL));
    this.badFloors.map((i) => (i.vx -= BACKGROUND_SPEED_NEXTLEVEL));
  }

  onKeyDown(event) {
    if (this.point > 5) {
      this.pilot.onKeyDown(event, 1500);
    } else {
      this.pilot.onKeyDown(event, 3000);
    }
  }

  onKeyUp(event) {
    this.pilot.onKeyUp(event);
  }

  start() {
    this.addPlatform();
    setTimeout(() => {
      this.audio.play();
    }, TIME_START);

    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        // - PLATAFORMS
        this.clearPlatforms();
        this.platforms.forEach((platform) => this.checkPlatform(platform));
        if (this.tickPlatform > TIME_PLATFORM) {
          this.addPlatform();
          this.tickPlatform = 0;
        }
        this.tickPlatform++;
        // - BAD FLOORS
        this.clearBadFloors();
        this.badFloors.forEach((platform) => this.checkBadFloor(platform));
        if (this.tickPlatform === 260 && !this.badFloorsPlataform) {
          this.addBadFloor(180);
          this.addBadFloor(210);
          this.badFloorsPlataform = true;
        } else if (this.tickPlatform === 260 && this.badFloorsPlataform) {
          this.addBadFloor(240);
          this.addBadFloor(270);
          this.badFloorsPlataform = false;
        }
        if (this.tickBadFloor > TIME_BADFLOOR && !this.badFloorsDown) {
          this.addBadFloor(180);
          this.addBadFloor(210);
          this.tickBadFloor = 0;
          this.badFloorsDown = true;
        } else if (this.tickBadFloor > TIME_BADFLOOR && this.badFloorsDown) {
          this.addBadFloor(240);
          this.addBadFloor(270);
          this.tickBadFloor = 0;
          this.badFloorsDown = false;
        }
        this.tickBadFloor++;
        // -COINS
        this.clearCoins();
        this.coins.forEach((coin) => this.checkCoin(coin));
        if (this.tickCoin > TIME_PLATFORM) {
          this.addCoin();
          this.tickCoin = 0;
        }
        this.tickCoin++;
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
  // . PLATAFORMS
  checkPlatform(platform) {
    if (this.pilot.colideWith(platform, false)) {
      this.pilot.slowing();
      this.pilot.slow(4);
      this.pilot.crash();
      this.deleteLife();
    }
  }

  addPlatform() {
    this.platforms.push(new Platform(this.ctx, 200, this.canvas.height - 320));
  }

  clearPlatforms() {
    this.platforms = this.platforms.filter((platform) => platform.isVisible());
  }
  // . BAD FLOORS
  checkBadFloor(badFloor) {
    if (this.pilot.colideWith(badFloor, true)) {
      this.pilot.slowing();
      this.pilot.slow(1);
      this.pilot.mud();
    }
  }

  addBadFloor(lane) {
    this.badFloors.push(new BadFloor(this.ctx, 0, this.canvas.height - lane));
  }

  clearBadFloors() {
    this.badFloors = this.badFloors.filter((badFloor) => badFloor.isVisible());
  }

  // . COINS
  checkCoin(coin) {
    if (this.pilot.colideWith(coin, false)) {
      this.points();
    }
  }

  addCoin() {
    this.coins.push(new Coin(this.ctx, 10, this.canvas.height - 380));
  }

  clearCoins() {
    this.coins = this.coins.filter((coin) => coin.isVisible());
  }

  // . LIFES
  deleteLife() {
    if (!this.lifesDeleted && this.lifes.length > 0) {
      this.lifes.pop();
      this.lifesDeleted = true;
      setTimeout(() => {
        this.lifesDeleted = false;
      }, 4000);
    } else if (this.lifes.length === 0) {
      this.gameOver();
    }
  }

  move() {
    this.backgoundStart.move();
    this.pilot.starRace();
    this.pilot.move();
    this.badFloors.forEach((badFloor) => badFloor.move());
    this.platforms.forEach((platform) => platform.move());
    this.coins.forEach((coin) => coin.move());
  }

  draw() {
    this.backgoundStart.draw();
    this.downConsole.draw();
    this.lifes.forEach((life, index) => life.draw(index));
    this.pointDraw.draw(this.point);
    this.timeDraw.draw();
    this.jumpStatus.draw(this.pilot.jumpStatus());
    this.badFloors.forEach((badFloor) => badFloor.draw());
    this.platforms.forEach((platform) => platform.draw());
    this.coins.forEach((coin) => coin.draw());
    this.pilot.draw();
  }

  points() {
    this.point += 1;
    this.coins = this.coins.filter((coin) => coin.isVisiblePoint());
    this.audioCoin.play();
    if (this.point > 5) {
      this.madeSpeedUp();
    }
  }

  gameOver() {
    this.audioGameOver.play();
    this.audio.pause();
    this.stop();
    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}
