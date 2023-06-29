class DownConsole {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height - 330;

    this.sprite = new Image();
    this.sprite.src = "/assets/img/consoleDown.png";
    this.sprite.onload = () => {
      this.sprite.isReady = true;
    };

  }
  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(this.sprite, this.x, this.y + 330, this.w, this.h);
    }
  }
}
