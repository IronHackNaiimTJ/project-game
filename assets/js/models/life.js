class Life {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;
    this.w = 20;
    this.h = 20;

    this.sprite = new Image();
    this.sprite.src = "/assets/img/lifes.png";
    this.sprite.onload = () => {
      this.sprite.isReady = true;
    };
  }
  draw(numLife) {
    switch (numLife) {
      case 0:
        this.xLife = 50;
        break;
      case 1:
        this.xLife = 100;
        break;
      case 2:
        this.xLife = 150;
        break;
      default:
        break;
    }
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.x + this.xLife,
        this.y + 375,
        this.w,
        this.h
      );
    }
  }
}
