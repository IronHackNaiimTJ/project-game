class BackgroundStart {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.vx = BACKGROUND_SPEED;

    this.sprite = new Image();
    this.sprite.src = "";
    this.sprite.onload = () => {
      this.sprite.isReady = true;
    };

    this.tickImage = 0;

    this.spriteStart = {
      firstImage: "/assets/img/blanks/blankStart1.png",
      secondtImage: "/assets/img/blanks/blankStart2.png",
      thirdImage: "/assets/img/blanks/blankStart3.png",
      normal: "/assets/img/blank.png",
    };
  }

  move() {
    setTimeout(() => {
      this.x += BACKGROUND_SPEED;
    }, TIME_START);
    if (this.x < -this.w) {
      this.x = 0;
    }
  }

  draw() {
    if (this.tickImage < 230) {
      this.tickImage++;
    }
    console.log(this.tickImage);
    switch (true) {
      case this.tickImage < 100:
        this.sprite.src = this.spriteStart.firstImage;
        break;
      case this.tickImage < 190:
        this.sprite.src = this.spriteStart.secondtImage;
        break;
      case this.tickImage < 220:
        this.sprite.src = this.spriteStart.thirdImage;
        break;
      default:
        this.sprite.src = this.spriteStart.normal;
        break;
    }

    if (this.sprite.isReady) {
      this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
      this.ctx.drawImage(this.sprite, this.x + this.w, this.y, this.w, this.h);
    }
  }
}
