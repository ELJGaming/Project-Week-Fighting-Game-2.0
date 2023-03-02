class Sprite {
  constructor(obj) {
    console.log(obj)
    let {
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
    } = obj
    /*position independent of one another. wrapping in an object makes u pass through one argument instead of two cat pass through velocity first*/
    //define the properties associated with the sprite
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }
  drawSprite() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }
  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) this.framesCurrent++;
      else this.framesCurrent = 0;
    }
  }

  update() {
    this.drawSprite();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "blue",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({ position, imageSrc, scale, framesMax, offset });

    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;
    this.dead = false;

    for (let sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }
  moveSprite() {
    this.drawSprite();
    if (!this.dead) this.animateFrames();
    // attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    // draw attack box
    ctx.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y; //over time our position has velocity is added to it but dont forget to call this function in the animation function
    if (
      this.position.y + this.height + this.velocity.y >=
      canvasElement.height
    ) {
      this.velocity.y = 0;
      this.position.y = 426;
      //this.height === to the bottom of the rec if the stops from dropping off pagee
    } else this.velocity.y += gravity;
  }

  attack() {
    console.log(1);
    this.switchSprite("attack1");
    this.isAttacking = true;
    // setTimeout(() => {
    //     this.isAttacking = false;
    // }, 100);
  }
  attack2() {
    console.log(2);
    this.switchSprite("attack2");
    this.isAttacking = true;
    // setTimeout(() => {
    //     this.isAttacking = false;
    // }, 100);
  }
  //attack3() {
      //this.switchSprite('attack3');
      //this.isAttacking = true;
  //     // setTimeout(() => {
  //     //     this.isAttacking = false;
  //     // }, 100);
   //}

  takeHit() {
    this.health -= 10;
    if (this.health <= 0) this.switchSprite("death");
    else this.switchSprite("takeHit");
  }

  switchSprite(sprite) {
    // override all other animations with the death animation
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true;
      return;
    }

    if (
      this.image === this.sprites.attack2.image &&
      this.framesCurrent < this.sprites.attack2.framesMax - 1
    )
      return;
    // override all other animations with the attacking animation
    else if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return;
    // override all other animations with the take hit animation
    // else if (
    //     this.image === this.sprites.attack3.image &&
    //     this.framesCurrent < this.sprites.attack3.framesMax - 1
    // )
      
    //   return;
    // override all other animations with the take hit animation
    else if (this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack2":
        if (this.image !== this.sprites.attack2.image) {
          this.image = this.sprites.attack2.image;
          this.framesMax = this.sprites.attack2.framesMax;
          this.framesCurrent = 0;
        }
        break;
    //   case "attack3":
    //     if (this.image !== this.sprites.attack3.image) {
    //       this.image = this.sprites.attack3.image;
    //       this.framesMax = this.sprites.attack3.framesMax;
    //       this.framesCurrent = 0;
    //     }
    //     break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        //leave this when merging
        document.querySelector("#Ooof").play();
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        // leave this when merge
        document.querySelector("#deathAudio").play();
        break;
    }
  }
}
