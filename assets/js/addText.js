class addText {
    constructor(ctx, x, y, color, size, text) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.ctx.fillStyle = `${color}`;
        this.ctx.font = `${size} Verdana`;
        this.text = text
        this.size = size
      }
    
      add() {
       return this.ctx.fillText(`${this.text}`, this.x, this.y);
      }
}