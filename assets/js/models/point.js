class Point {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = 'black';
        this.size = "26px";
      }
    
      draw(points) {
        new addText(this.ctx, this.x, this.y, this.color, this.size, points).add()
      }
}