let tankBody, tankBody2
let tankGun, tankGun2
let tank1, tank2, t1flash, t2flash
let fire1, fire2, fire3, fire4
let ground = []
let noiseSeed = 0
let clouds, cloudsPos
let cloudsT, cloudsTPos
let powerBarLength = 0
let bullets = []
let explosions = []
let explosion, explosionFrames
let player1Turn
let f
let gameOver = false
let winMessage = ''
let tank, fire, bang, turret, chargeUp
let fires = []
let fireFrames1, fireFrames2, fireFrames3, fireFrames4
let p1score = 0
let p2score = 0
let d1x, d2x, d2y, d1y
let dino1, dino2
//let k = false

function preload() {
  dino1 = loadImage('images/dino1.png')
  dino2 = loadImage('images/dino2.png')
  tankBody = loadImage('images/tankBody.png')
  tankGun = loadImage('images/tankGun.png')
  tankBody2 = loadImage('images/tankBody2.png')
  tankGun2 = loadImage('images/tankGun2.png')
  t1flash = loadImage('images/t1flash.png')
  t2flash = loadImage('images/t2flash.png')
  clouds = loadImage('images/clouds.jpg')
  cloudsT = loadImage('images/cloudsT.png')
  explosion = loadImage('images/explosion.png')
  fire1 = loadImage('images/fire1.png')
  fire2 = loadImage('images/fire2.png')
  fire3 = loadImage('images/fire3.png')
  fire4 = loadImage('images/fire4.png')
  f = loadFont('fonts/f.ttf')
  tank = loadSound('sounds/tank.mp3')
  bang = loadSound('sounds/blast.mp3')
  fire = loadSound('sounds/fire.mp3')
  turret = loadSound('sounds/turret.mp3')
  chargeUp = loadSound('sounds/chargeUp.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  addScreenPositionFunction();
  init()
}
function drawDinos() {
  push()
  imageMode(CENTER)
  translate(d1x, d1y)
  rotate(d1r)
  image(dino1, 0, 0)

  pop()
  push()
  imageMode(CENTER)
  translate(d2x, d2y)
  rotate(d2r)
  image(dino2, 0, 0)
  pop()
}

function init() {
  ground = new Array()
  d1x = random((width / 3) * 2-100, (width / 3) * 2)
  d1y = random(height - 200, height - 100)
  d1r = random(1.5 * PI)
  
  d2x = random(width / 3, (width / 3) +100)
  d2y = random(height - 200, height - 100)
  d2r = random(1.5 * PI)
  noiseSeed = random(2)
  powerBarLength = 0
  gameOver = false
  bullets = []
  fires = []
  winMessage = ''
  explosions = []
  tank1 = new Tank1(50, 200)
  tank2 = new Tank2(width - 50, 200)
  explosionFrames = splitIntoArray(explosion, 9, 9, 81)
  fireFrames1 = splitIntoArray(fire1, 6, 10, 60)
  fireFrames2 = splitIntoArray(fire2, 6, 10, 60)
  fireFrames3 = splitIntoArray(fire3, 6, 10, 60)
  fireFrames4 = splitIntoArray(fire4, 6, 10, 60)
  for (let i = 0; i <= width; i += 1) {
    let d = 0
    if (i > width / 4 && i < width - width / 4) {
      d = sin(map(i, width / 4, width - width / 4, 0, PI)) * 400
      noiseSeed += 0.006
    } else {
      noiseSeed += 0.0008
    }
    ground.push(floor(floor(height / 2 + noise(noiseSeed) * height / 2) - d))

  }
  cloudsPos = 0
  cloudsTPos = 250
  textFont(f)
  textAlign(CENTER, CENTER)
  textSize(80)
  if (random(10) < 5) {
    player1Turn = true
  } else {
    player1Turn = false
  }
}
function draw() {
  if (gameOver) {
    //background('lightblue')
    textSize(100)

    image(clouds, cloudsPos, 0, width, height)
    image(clouds, cloudsPos - width, 0, width, height)
    cloudsPos = (cloudsPos + 0.3) % width
    image(cloudsT, cloudsTPos, 100, width, height)
    image(cloudsT, cloudsTPos - width, 100, width, height)
    cloudsTPos = (cloudsTPos + 0.6) % width
    noStroke()
    fill('#654321')
    strokeWeight(1)
    beginShape()
    for (let x = 0; x < width; x += 1) {
      vertex(x, ground[x])
    }
    vertex(width, height)
    vertex(0, height)
    vertex(0, ground[0])
    endShape(CLOSE)

    fill(0, 100, 0)
    textSize(50)
    //player1Turn ? text('PLAYER 1 TURN', width / 2, 100) : text('PLAYER 2 TURN', width / 2, 100)
    tank1.show()
    //tank1.update()
    tank2.show()
    //tank2.update()
    for (let f of fires) {
      f.show()
    }

    for (let e of explosions) {
      e.update()
      e.show()
    }
    drawDinos()



    fill('red')
    textSize(60)
    text(winMessage, width / 2, 300)
    if (keyIsDown(13)) {
      init()
    }
  } else {
    //background('lightblue')
    image(clouds, cloudsPos, 0, width, height)
    image(clouds, cloudsPos - width, 0, width, height)
    cloudsPos = (cloudsPos + 0.3) % width
    image(cloudsT, cloudsTPos, 100, width, height)
    image(cloudsT, cloudsTPos - width, 100, width, height)
    cloudsTPos = (cloudsTPos + 0.6) % width
    noStroke()
    fill('#654321')

    beginShape()
    for (let x = 0; x < width; x += 1) {
      vertex(x, ground[x])
      //line(x,ground[x],x,ground[x+1])
    }
    vertex(width, height)
    vertex(0, height)
    vertex(0, ground[0])
    endShape(CLOSE)

    // strokeWeight(5)
    // stroke('green')
    // for(let i = 0;i<width-1;i++){
    //   line(i,ground[i],i,ground[i+1])
    // }
    
    fill(0, 100, 0)
    textSize(50)
    player1Turn ? text('PLAYER 1 TURN', width / 2, 50) : text('PLAYER 2 TURN', width / 2, 50)
    tank1.show()
    tank1.update()
    tank2.show()
    tank2.update()
    if (keyIsDown(UP_ARROW)) {
      if (player1Turn) {
        tank1.gunRot -= 0.01
      } else {
        tank2.gunRot += 0.01
      }

    }
    if (keyIsDown(DOWN_ARROW)) {
      if (player1Turn) {
        tank1.gunRot += 0.01
      } else {
        tank2.gunRot -= 0.01
      }

    }

    if (keyIsDown(LEFT_ARROW)) {
      if (player1Turn) {
        tank1.pos.x -= 1
      } else {
        tank2.pos.x -= 1
      }

    }
    if (keyIsDown(RIGHT_ARROW)) {
      if (player1Turn) {
        tank1.pos.x += 1
      } else {
        tank2.pos.x += 1
      }

    }
    noFill()
    stroke(0)
    strokeWeight(1)
    rect(50, 50, 200, 30)
    rect(width - 250, 50, 200, 30)
    textSize(15)
    fill('red')
    text('PLAYER ONE SHOT POWER', 150, 40)
    text('PLAYER TWO SHOT POWER', width - 150, 40)
    if (keyIsDown(32)) {
      //console.log(32)
      powerBarLength += 0.5
      powerBarLength = constrain(powerBarLength, 0, 100)
      fill('red')
      noStroke()

      if (player1Turn) {

        rect(50, 50, powerBarLength * 2, 30)
        textSize(40)
        text(floor(powerBarLength), 140, 100)
      } else {
        rect(width - 250, 50, powerBarLength * 2, 30)
        textSize(40)
        text(floor(powerBarLength), width - 150, 100)
      }
    } else {
      powerBarLength = 0
    }
    // if (mouseIsPressed) {
    //   powerBarLength += 0.5
    //   powerBarLength = constrain(powerBarLength, 0, 100)
    //   fill('red')
    //   noStroke()
    //   textSize(20)
    //   if (player1Turn) {
    //     rect(50, 50, powerBarLength * 2, 30)
    //     text(floor(powerBarLength), 50, 100)
    //   } else {
    //     rect(width - 250, 50, powerBarLength * 2, 30)
    //     text(floor(powerBarLength), width - 250, 100)
    //   }


    // } else {
    //   powerBarLength = 0
    // }
    for (let b of bullets) {
      b.show()
      b.move()
    }
    for (let f of fires) {
      f.show()
    }

    for (let e of explosions) {
      e.update()
      e.show()
    }
    drawDinos()
    textSize(20)
    stroke(1)
    fill('red')
    text('SCORE ' + p1score, 150, 20)
    text('SCORE ' + p2score, width - 150, 20)
  }
}

// function mousePressed() {
//   chargeUp.play()
// }
// function mouseReleased() {
//   if (bullets.length == 0) {
//     bullets.push(new Bullet(powerBarLength))
//     fire.play()
//   }
//   chargeUp.stop()

// }


function keyPressed() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
    tank.play()
  }
  if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
    turret.play()
  }
  if (keyCode == 32) {
    chargeUp.play()
  }

}
function keyReleased() {
  if (keyCode == 32 && bullets.length == 0) {
    bullets.push(new Bullet(powerBarLength))
    fire.play()
  }
  tank.stop()
  turret.stop()
  chargeUp.stop()
}


function splitIntoArray(img, rows, cols, numberOfFrames) {
  var fwidth = img.width / cols
  var fheight = img.height / rows

  var frames = []
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      if (numberOfFrames > 0) {
        frames.push(img.get(c * fwidth, r * fheight, fwidth, fheight))
      }
      numberOfFrames--
    }
  }
  frames.frameWidth = fwidth
  frames.frameHeight = fheight

  return frames
}

