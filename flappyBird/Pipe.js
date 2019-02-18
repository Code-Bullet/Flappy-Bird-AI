class Pipe {
  constructor(isTop, height) {
    this.width = 100;
    this.height = height;
    this.x = canvas.width;
    this.isTop = isTop;
    this.randomMultiplier = random(5);
    if (isTop) {
      this.topY = 0;
      this.bottomY = this.height;
    } else {
      this.topY = canvas.height - this.height;
      this.bottomY = canvas.height;
    }
  }

  show() {
    // fill(0, 204, 0);
    // rect(this.x, this.topY, this.width, this.height);

    if (this.isTop) {
      image(topPipeSprite, this.x, this.topY + this.height - 800);
    } else {
      image(bottomPipeSprite, this.x, this.topY);
    }

  }

  update() {
    this.x -= panSpeed * this.randomMultiplier;
  }

  colided(p) {

    if (p.x + p.size / 2 >= this.x && p.x - p.size / 2 <= this.x + this.width) {
      if (!this.isTop && p.y + p.size / 2 >= this.topY) {
        return true;
      }
      if (this.isTop && p.y - p.size / 2 <= this.bottomY) {
        return true;
      }

    }
    return false;
  }

}
