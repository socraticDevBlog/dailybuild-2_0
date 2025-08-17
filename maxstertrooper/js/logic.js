const WINNING_TRESHOLD = 75;

class Runner {
  constructor(canvas, context, width, height) {
    this.canvas = canvas;
    this.context = context;
    this.height = height;
    this.width = width;
    this.flyers = {};
    this.bullets = {};
    this.cannon = new Cannon(this.width, this.height);
    this.display = new PointsDisplay();
    this.points = 15;
    this.loopingInverval = null;
    this.gameIsOn = false;
    this.menuDisplay = new MenuDisplay();
  }

  start(self) {
    if (this.gameIsOn) {
      return;
    }

    this.loopingInterval = setInterval(function () {
      self.loop(self);
    }, 50);
    this.gameIsOn = true;
  }

  pause(self) {
    if (!this.gameIsOn) {
      this.start(self);
      return;
    }

    clearInterval(self.loopingInterval);
    this.gameIsOn = false;
  }

  callMenuDisplay(self) {
    if (!this.gameIsOn) {
      this.start(self);
      return;
    }

    this.menu(self);
  }

  menu(self) {
    clearScreen(this.canvas);
    clearInterval(self.loopingInterval);
    self.menuDisplay.print(self.context);
    this.gameIsOn = false;
  }

  loop(self) {
    const HIT_FLYER_REWARD = 10;

    // clears the whole canvas
    //
    clearScreen(self.canvas);

    // spawn a new flyer when none
    //
    if (dictCount(self.flyers) == 0) {
      var aFlyer = new Flyer();
      this.registerFlyer(aFlyer);
    }

    // updating flyers coordinates
    //
    for (var key in self.flyers) {
      var flyer = self.flyerById(key);

      this.moveFlyer(self, flyer);
    }

    // updating bullets coordinates
    //
    for (var key in self.bullets) {
      var bullet = self.bulletbyId(key);

      if (bullet.y > 0) {
        bullet.moveUp();
      } else {
        delete self.bullets[key];
      }

      // checking if bullet hit a flyer
      //
      for (var flyerId in self.flyers) {
        var flyer = self.flyerById(flyerId);

        if (this.isHit(bullet, flyer)) {
          this.points += HIT_FLYER_REWARD;
          delete self.flyers[flyer.id];
        }
      }
    }

    // drawing flyers
    //
    for (var key in self.flyers) {
      var flyer = self.flyerById(key);
      flyer.draw(self.context);
    }

    // drawing bullets
    //
    for (var key in self.bullets) {
      var bullet = self.bulletbyId(key);
      bullet.draw(self.context);
    }

    // drawing cannon
    //
    self.cannon.draw(self.context);

    // updating points
    //
    // counting bullets in play makes sure we don't remove the points or
    // display GameOver too early
    //
    if (this.points >= WINNING_TRESHOLD) {
      self.display.win(self.context);
      self.bullets = 0;
    } else if (this.points > 0 || dictCount(self.bullets) > 0) {
      self.display.refreshPoints(self.context, self.points);
    } else if (this.points < 1 && dictCount(self.bullets) === 0) {
      self.display.gameOver(self.context);
    } else {
      console.log("something is wrong with the points");
    }
  }

  moveCannonLeft(self, canvasWidth) {
    self.cannon.moveLeft(canvasWidth);
  }

  moveCannonRight(self, canvasWidth) {
    self.cannon.moveRight(canvasWidth);
  }

  registerFlyer(obj) {
    this.flyers[obj.id] = obj;
  }

  fire(self) {
    const BULLET_COST = 1;

    if (this.points <= 0) {
      return;
    }

    var bullet = new Bullet(self.cannon.xHead, self.cannon.yHead);
    self.registerBullet(bullet);
    self.points -= BULLET_COST;
  }

  registerBullet(obj) {
    this.bullets[obj.id] = obj;
  }

  flyerById(id) {
    return this.flyers[id];
  }

  bulletbyId(id) {
    return this.bullets[id];
  }

  isHit(bullet, flyer) {
    // target is hit if bullet x,y is within a tolerance of 2 points
    //
    var near = bullet.x >= flyer.x - 2 && bullet.x <= flyer.x + 2;

    if (near) {
      return near && bullet.y >= flyer.y - 2 && bullet.y <= flyer.y + 2;
    } else {
      return false;
    }
  }

  moveFlyer(self, flyer) {
    var isHeadingLeft = flyer.x < flyer.previousX;

    if (isHeadingLeft) {
      if (flyer.x > 0) {
        flyer.moveLeft();
      } else {
        flyer.reset();
        flyer.moveRight;

        if (self.points < WINNING_TRESHOLD) {
          self.points -= 5;
        }
      }
    } else {
      if (flyer.x < self.width) {
        flyer.moveRight();
      } else {
        flyer.moveLeft();

        if (self.points < WINNING_TRESHOLD) {
          self.points -= 3;
        }
      }
    }
  }
}
