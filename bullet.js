class Bullet {
  constructor(strength) {

    if (player1Turn) {
      tank1.firing = 10
      this.pos = createVector(tank1.gunX, tank1.gunY)
      this.vel = p5.Vector.fromAngle(tank1.gunRot + tank1.rotation, map(strength, 0, 100, 2, 20))
    } else {
      tank2.firing = 10
      this.pos = createVector(tank2.gunX, tank2.gunY)
      this.vel = p5.Vector.fromAngle(tank2.gunRot + tank2.rotation, map(strength, 0, 100, 2, 20))
    }


    this.grav = createVector(0, 0.1)
  }
  show() {
    fill('red')
    circle(this.pos.x, this.pos.y, 5)
    //circle(this.pos.x,ground[floor(this.pos.x/5)],20)
    //rect(this.pos.x,0,5,height-ground[floor(this.pos.x/5)])
  }

  move() {
    this.pos.add(this.vel)
    this.vel.add(this.grav)
    if (this.pos.y > ground[floor(this.pos.x)]) {
      explosions.push(new Explosion(this.pos.x, ground[floor(this.pos.x)]))
      fires.push(new Fire(this.pos.x, ground[floor(this.pos.x)]))
      for (let i = -30; i < 30; i++) {
        let z = map(i, -30, 30, 0, PI)
        //ground[floor((this.pos.x+i) )]+=(sin(z)*55)
        ground[floor((this.pos.x + i))] += ((noise(z) * 5) + (sin(z) * 35))
      }


      bullets.splice(bullets.indexOf(this), 1)
      player1Turn = !player1Turn
    }
    if (this.pos.x < 0 || this.pos.x > width) {
      bullets.splice(bullets.indexOf(this), 1)
      player1Turn = !player1Turn
    }
    if (collideCircleCircle(tank1.pos.x, tank1.pos.y - 20, 70, this.pos.x, this.pos.y, 5)) {
      gameOver = true
      p2score++
      winMessage = 'PLAYER 2 WINS \n PRESS RETURN TO PLAY NEXT ROUND'
      explosions.push(new Explosion(this.pos.x, ground[floor(this.pos.x)]))
      explosions.push(new Explosion(this.pos.x, ground[floor(this.pos.x)]))
      for (let a = 0; a < 10; a++) {
        let r = floor(random(-45, 45))
        fires.push(new Fire(this.pos.x + r, ground[floor(this.pos.x + r)] - 45))
      }
    }
    if (collideCircleCircle(tank2.pos.x, tank2.pos.y - 20, 70, this.pos.x, this.pos.y, 5)) {
      gameOver = true
      p1score++
      winMessage = 'PLAYER 1 WINS \n PRESS RETURN TO PLAY NEXT ROUND'
      explosions.push(new Explosion(this.pos.x, ground[floor(this.pos.x)]))
      explosions.push(new Explosion(this.pos.x, ground[floor(this.pos.x)]))
      for (let a = 0; a < 10; a++) {
        let r = floor(random(-45, 45))
        fires.push(new Fire(this.pos.x + r, ground[floor(this.pos.x + r)] - 45))
      }
    }

  }
}