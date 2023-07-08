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
      draw() {
        if (this.sprite.isReady) {
          this.ctx.drawImage(this.sprite, this.x + 50, this.y + 375, this.w, this.h);
        }
      }
  }
  