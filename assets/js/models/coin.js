class Coin {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = this.ctx.canvas.width;
    this.y = y;
    this.w = 60;
    this.h = 60;

    this.vx = BACKGROUND_SPEED;

    this.sprite = new Image();
    this.sprite.src = "/assets/img/coins.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizFrames = 7;
    this.sprite.horizFrameIndex = 0;

    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(
        this.sprite.width / this.sprite.horizFrames
      );
      this.sprite.frameHeight = Math.floor(
        this.sprite.height / this.sprite.verticalFrames
      );
    };
    this.tickImage = 0;
    this.animationTick = 0;
  }

  draw() {
    this.tickImage++;
    if (this.tickImage > FPS_STARTGAME && this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );
      this.animate();
    }
  }

  move() {
    if (this.tickImage > FPS_STARTGAME) {
      this.x += this.vx;
    }
  }

  animate() {
    this.animationTick += 1;

    if (this.animationTick > COIN_RUN_ANIMATION) {
      this.animationTick = 0;
      this.sprite.horizFrameIndex += 1;
      if (this.sprite.horizFrameIndex > this.sprite.horizFrames - 1) {
        this.sprite.horizFrameIndex = 0;
      }
    }
  }

  isVisible() {
    return this.x + this.w > 0;
  }

  isVisiblePoint() {
    return this.x === 600;
  }
}
