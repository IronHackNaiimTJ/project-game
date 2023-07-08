class JumpStatus {
    constructor(ctx, x, y ) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = "18px";
        this.text = "Jump"
      }
    
      draw(status) {
        new addText(this.ctx, this.x, this.y, !status ? "white" : "red", this.size, this.text).add()
      }
}