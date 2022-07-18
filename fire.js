class Fire {

  constructor(x, y) {
    this.pos = createVector(x, y)
    this.type = floor(random(0, 4))
    this.frame = 0
    this.size = random(60, 80)
    // console.log('y='+this.pos.y)
    // console.log('ground='+ground[floor(this.pos.x)])
  }

  show() {
    if (this.pos.y < ground[floor(this.pos.x)]) {
      this.pos.y = ground[floor(this.pos.x)]-this.size+10
    }
    if (this.type == 0) {
      image(fireFrames1[this.frame], this.pos.x - this.size / 2, this.pos.y, this.size, this.size)
    }
    if (this.type == 1) {
      image(fireFrames2[this.frame], this.pos.x - this.size / 2, this.pos.y , this.size, this.size)
    }
    if (this.type == 2) {
      image(fireFrames3[this.frame], this.pos.x - this.size / 2, this.pos.y , this.size, this.size)
    }
    if (this.type == 3) {
      image(fireFrames4[this.frame], this.pos.x - this.size / 2, this.pos.y , this.size, this.size)
    }
    this.frame = (this.frame + 1) % 60
  }



}