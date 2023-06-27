class Pilot {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.y0 = y;
    this.x0 = x;

    this.x = x;
    this.y = y;
    this.w = Math.floor(130 / 2);
    this.h = Math.floor(140 / 2);

    this.vx = 0;
    this.vy = 0;
    this.ax = PILOT_AX;

    this.sprite = new Image();
    this.sprite.src = "/assets/img/pilot.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizFrames = 2;
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
    this.animationTick = 0;
  }
  onKeyDown(event) {
    switch (event.keyCode) {
      case KEY_UP:
        this.y = this.y - PILOT_UPDOWN;
        break;
      case KEY_DOWN:
        this.y = this.y + PILOT_UPDOWN;
        break;
      case KEY_LEFT:
        this.vx = -PILOT_SPEED;
        break;
      case KEY_RIGHT:
        this.vx = PILOT_SPEED;
        break;

      default:
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case KEY_LEFT:
      case KEY_RIGHT:
        this.vx = 0;
        break;
    }
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w;
    }

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.h > this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height - this.h;
    }
    // - Limits
    // Limit right
    if (this.x >= this.ctx.canvas.width - LIMIT_RIGHT) {
      this.x = this.ctx.canvas.width - LIMIT_RIGHT;
    }
    // Up
    if (this.y > this.y0) {
      this.y = this.y0;
    }
    // Down
    if (this.y < 145) {
      this.y = this.y + PILOT_UPDOWN;
    }
    // Sky Limit
    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    }
  }

  draw() {
    if (this.sprite.isReady) {
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

  animate() {
    this.animationTick += 1;
    if (this.animationTick > PILOT_RUN_ANIMATION) {
      this.animationTick = 0;
      this.sprite.horizFrameIndex += 1;
      if (this.sprite.horizFrameIndex > this.sprite.horizFrames - 1) {
        this.sprite.horizFrameIndex = 0;
      }
    }
  }
}
