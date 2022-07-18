class Tank2 {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.rotation = 0
    this.gunRot = PI
    this.width = tankBody2.width
    this.height = tankBody2.height
    this.gunX
    this.gunY
    this.firing = 0

  }
  update() {
    this.gunRot = constrain(this.gunRot, 3, 4.1)
    this.pos.y = ground[floor((this.pos.x))]
    let a = ground[floor((this.pos.x)) - 10]
    let b = ground[floor((this.pos.x)) + 10]
    let c = radians(b - a) * 2.5
    this.rotation = c
    this.pos.x = constrain(this.pos.x, width - width / 4-3, width - 20)
  }
  show() {
    //textSize(50)

    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.rotation)

    push()
    translate(-25, -33)
    rotate(this.gunRot)
    image(tankGun2, 0, 0)
    var p1 = screenPosition(48, 2);
    this.gunX = p1.x
    this.gunY = p1.y
    if (this.firing > 0) {
      image(t1flash, 48, -3, 30, 10)
      this.firing--
    }
    pop()
    image(tankBody2, -this.width / 2, -this.height)
    pop()
    // noFill()
    //    stroke(255)
    //    circle(this.pos.x,this.pos.y-20,70)

  }
}