class Tank1 {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.rotation = 0
    this.gunRot = 0
    this.width = tankBody.width
    this.height = tankBody.height
    this.gunX
    this.gunY
    this.firing = 0

  }
  update() {
    this.gunRot = constrain(this.gunRot, -0.96, 0.36)
    this.pos.y = ground[floor((this.pos.x))]
    let a = ground[floor((this.pos.x)) - 10]
    let b = ground[floor((this.pos.x)) + 10]
    let c = radians(b - a) * 2.5
    this.rotation = c
    this.pos.x = constrain(this.pos.x, 20, 3+width / 4)
  }
  show() {
    //textSize(50)
    //text(this.gunRot,140,140)
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.rotation)

    push()
    translate(16, -33)
    rotate(this.gunRot)
    image(tankGun, 0, 0)
    var p1 = screenPosition(48, 2);
    this.gunX = p1.x
    this.gunY = p1.y
    if (this.firing > 0) {
      image(t1flash, 48, -3, 30, 10)
      this.firing--
    }

    pop()
    image(tankBody, -this.width / 2, -this.height)
    pop()
    // noFill()
    // stroke(255)
    // circle(this.pos.x,this.pos.y-20,70)

  }
}