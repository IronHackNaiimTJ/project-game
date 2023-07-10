class TimeGame {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = "white";
    this.size = "26px";
    this.time = 0;
  }
  draw() {
    this.time++;
    const tiempoTranscurrido = getTimeDiffString(0, this.time * 1000);
    function getTimeDiffString(startDate, endDate) {
      const diffInMilliseconds = Math.abs(endDate - startDate);
      const seconds = Math.floor(diffInMilliseconds / 1000) % 60;
      const minutes = Math.floor(diffInMilliseconds / 1000 / 60) % 60;
      let timeDiffString = "";
      if (minutes > 0) {
        timeDiffString += minutes === 0 ? 0 : minutes + ":";
      }
      if (seconds > 0) {
        timeDiffString += seconds;
      }

      return timeDiffString;
    }
    new addText(
      this.ctx,
      this.x,
      this.y,
      this.color,
      this.size,
      tiempoTranscurrido
    ).add();
  }
}
