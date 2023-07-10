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
    this.ay = PILOT_AY;
    this.ax = PILOT_AX;

    this.pilotStar = true;

    this.sprite = new Image();
    this.sprite.src = "/assets/img/pilotStart.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizFrames = 3;
    this.sprite.horizFrameIndex = this.pilotStar ? 0 : 1;

    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(
        this.sprite.width / this.sprite.horizFrames
      );
      this.sprite.frameHeight = Math.floor(
        this.sprite.height / this.sprite.verticalFrames
      );
    };

    this.isCrash = false;
    this.spriteFloor = new Image();
    this.spriteFloor.src = "/assets/img/pilotFloor.png";
    this.spriteFloor.verticalFrames = 1;
    this.spriteFloor.verticalFrameIndex = 0;
    this.spriteFloor.horizFrames = 4;
    this.spriteFloor.horizFrameIndex = 0;

    this.spriteFloor.onload = () => {
      this.spriteFloor.isReady = true;
      this.spriteFloor.frameWidth = Math.floor(
        this.spriteFloor.width / this.spriteFloor.horizFrames
      );
      this.spriteFloor.frameHeight = Math.floor(
        this.spriteFloor.height / this.spriteFloor.verticalFrames
      );
    };

    this.isPilotMud = false;
    this.spriteMud = new Image();
    this.spriteMud.src = "/assets/img/pilotMud.png";
    this.spriteMud.verticalFrames = 1;
    this.spriteMud.verticalFrameIndex = 0;
    this.spriteMud.horizFrames = 1;
    this.spriteMud.horizFrameIndex = 0;

    this.spriteMud.onload = () => {
      this.spriteMud.isReady = true;
      this.spriteMud.frameWidth = Math.floor(
        this.spriteMud.width / this.spriteMud.horizFrames
      );
      this.spriteMud.frameHeight = Math.floor(
        this.spriteMud.height / this.spriteMud.verticalFrames
      );
    };

    this.isJump = false;
    this.isSlow = false;
    this.isJumpFreze = false;

    this.animationTick = 0;

    this.audioStart = new Audio("/assets/audio/star.mp3");
    this.audioStart.volume = 0.1;
  }
  onKeyDown(event) {
    if (!this.isJump) {
      switch (event.keyCode) {
        case KEY_UP:
          if (this.y0 > 125)
            this.y0 = !this.pilotStar ? this.y - PILOT_UPDOWN : this.y;
          break;
        case KEY_DOWN:
          if (this.y0 < 215)
            this.y0 = !this.pilotStar ? this.y + PILOT_UPDOWN : this.y;
          break;
        case KEY_LEFT:
          this.vx = -PILOT_SPEED;
          break;
        case KEY_RIGHT:
          this.vx = PILOT_SPEED;
          break;
        case KEY_SPACE:
          if (!this.isJumpFreze) {
            setTimeout(() => (this.isJumpFreze = false), 3000);
            this.isJumpFreze = true;
            this.jump();
          }

          break;
        default:
          break;
      }
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

  starRace() {
    if (this.pilotStar) {
      setTimeout(() => {
        this.audioStart.play();
      }, 800);
    }
    setTimeout(() => {
      this.pilotStar = false;
    }, TIME_START);
  }

  move() {
    // ! The pilot can move
    if (!this.pilotStar) {
      this.vy += this.ay;
      this.x += this.vx;
      this.y += this.vy;

      //FIJO EL SUELO
      if (this.y > this.y0) {
        this.vy = 0;
        this.y = this.y0;
        if (this.isJump) {
          this.vx = -1;
        }
        this.isJump = false;
      }

      if (this.y0 > 215) {
        this.y = this.y0 = 215;
      }
      if (this.y0 < 125) {
        this.y = this.y0 = 125;
      }
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x + this.w > this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width - this.w;
      }
      // - Limits
      // Limit right
      if (this.x >= this.ctx.canvas.width - LIMIT_RIGHT) {
        this.x = this.ctx.canvas.width - LIMIT_RIGHT;
      }
    } else {
      // ! The pilot can NOT move
      // - Limits
      // Up
      if (this.y > this.y0) {
        this.y = this.y0;
      }
      // Down
      if (this.y < 145) {
        this.y0 = this.y + PILOT_UPDOWN;
      }
    }
  }

  draw() {
    if (this.sprite.isReady && !this.isCrash && !this.isPilotMud) {
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
    } else if (this.isCrash) {
      this.ctx.drawImage(
        this.spriteFloor,
        this.spriteFloor.horizFrameIndex * this.spriteFloor.frameWidth,
        this.spriteFloor.verticalFrameIndex * this.spriteFloor.frameHeight,
        this.spriteFloor.frameWidth,
        this.spriteFloor.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );
      this.animate();
    } else if (this.isPilotMud) {
      this.ctx.drawImage(
        this.spriteMud,
        this.spriteMud.horizFrameIndex * this.spriteMud.frameWidth,
        this.spriteMud.verticalFrameIndex * this.spriteMud.frameHeight,
        this.spriteMud.frameWidth,
        this.spriteMud.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );
      this.animate();
    }
  }

  crash() {
    this.isCrash = true;
    setTimeout(() => {
      this.isCrash = false;
    }, 1000);
  }

  mud() {
    this.isPilotMud = true;
    setTimeout(() => {
      this.isPilotMud = false;
    }, 1000);
  }

  animate() {
    this.animationTick += 1;
    if (!this.pilotStar && this.animationTick > PILOT_RUN_ANIMATION) {
      this.animationTick = 0;
      this.sprite.horizFrameIndex += 1;
      if (this.sprite.horizFrameIndex > this.sprite.horizFrames - 1) {
        this.sprite.horizFrameIndex = this.pilotStar ? 0 : 1;
      }
    }
  }

  jump() {
    this.vy = -PILOT_JUMP;
    this.vx = 1;
    this.isJump = true;
    // this.jumpSound.play()
  }

  jumpStatus() {
    return this.isJumpFreze;
  }

  slow(num) {
    this.vx = -num;
    // this.badFloorSound.play()
  }

  slowing() {
    this.isSlow = true;
  }

  colideWith(element, smallElement) {
    if (smallElement) {
      if (
        this.x + this.w > element.x &&
        this.x < element.x + element.w &&
        this.y + this.h > element.y &&
        this.y < element.y + element.h
      ) {
        if (element.y0 < 240) {
          this.isPilotMud = this.y0 < 185;
          return this.y0 < 185;
        } else {
          this.isPilotMud = true;
          return true;
        }
      }
    } else if (!smallElement) {
      return (
        this.x + this.w > element.x &&
        this.x < element.x + element.w &&
        this.y + this.h > element.y &&
        this.y < element.y + element.h
      );
    }
  }
}
