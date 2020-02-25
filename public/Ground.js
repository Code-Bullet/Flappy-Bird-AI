class Ground {

  constructor() {
    this.height = 30;
    this.topPixelCoord = canvas.height - this.height;
    this.pixelOffset = 0;

  }

  show() {
    fill(0);
    rect(0, this.topPixelCoord, canvas.width, this.height);
    for (var i = this.pixelOffset; i < canvas.width; i += groundSprite.width) {
      image(groundSprite, i, this.topPixelCoord);
    }
  }



  update() {
    this.pixelOffset -= panSpeed;
    if (this.pixelOffset <= -groundSprite.width) {
      this.pixelOffset += groundSprite.width;
    }


  }

  collided(p) {
    return p.y + p.size / 2 >= this.topPixelCoord;
  }
}
