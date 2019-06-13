//a connection between 2 nodes
class connectionGene {
  constructor(from, to, w, inno) {
    this.fromNode = from;
    this.toNode = to;
    this.weight = w;
    this.enabled = true;
    this.innovationNo = inno; //each connection is given a innovation number to compare genomes

  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //changes the this.weight
  mutateWeight() {
    var rand2 = random(1);
    if (rand2 < 0.1) { //10% of the time completely change the this.weight
      this.weight = random(-1, 1);
    } else { //otherwise slightly change it
      this.weight += (randomGaussian() / 50);
      //keep this.weight between bounds
      if (this.weight > 1) {
        this.weight = 1;
      }
      if (this.weight < -1) {
        this.weight = -1;

      }
    }
  }

  //----------------------------------------------------------------------------------------------------------
  //returns a copy of this connectionGene
  clone(from, to) {
    var clone = new connectionGene(from, to, this.weight, this.innovationNo);
    clone.enabled = this.enabled;

    return clone;
  }
}
