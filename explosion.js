class Explosion {

  constructor(x, y) {
    this.pos = createVector(x, y)
    this.frame = 0
    bang.play()
   
  }

  show() {

    image(explosionFrames[this.frame], this.pos.x-60, this.pos.y-60, 120, 120)

    this.frame++
    
    if (this.frame == explosionFrames.length - 1) {
      explosions.splice(explosions.indexOf(this), 1)
      
    }
  }

  update() {
    this.delay -= 1
  }


}
