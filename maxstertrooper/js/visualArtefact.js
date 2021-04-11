class VisualArtefact {
    constructor() {
        this.id = uuidv4();
        this.x = 0;
        this.y = 0;
        
        // monochrome : green
        //
        this.innercolor = "#0E7A0D";
        this.font = "9px Tahoma";
    }
}

class MenuDisplay extends VisualArtefact {
    constructor() {
        super();
        this.title = "Shoot the chopper down";
        this.levelOne = "Score " + WINNING_TRESHOLD + " points to win";
        this.keyLeft = "Arrow left [ <- ] to move cannon to the left";
        this.keyRight = "Arrow right [ -> ]  to move cannon to the right";
        this.keyUp = "Arrow up [ ^ ] to fire";
        this.keyP = "Press key P to pause the game";
        this.keyS = "Press key S to start the game";
        this.restart = "Press key R to play another game.";
    }

    print(context) {
        textToCanvas(context, this.title, 40, 10, this.innercolor, this.font);
        textToCanvas(context, this.levelOne, 40, 20, this.innercolor, this.font);
        textToCanvas(context, this.keyLeft, 40, 40, this.innercolor, this.font);
        textToCanvas(context, this.keyRight, 40, 50, this.innercolor, this.font);
        textToCanvas(context, this.keyUp, 40, 60, this.innercolor, this.font);
        textToCanvas(context, this.keyP, 40, 80, this.innercolor, this.font);
        textToCanvas(context, this.keyS, 40, 100, this.innercolor, this.font);
        textToCanvas(context, this.restart, 40, 120, this.innercolor, this.font);
    }
}

class PointsDisplay extends VisualArtefact {
    constructor() {
        super();
        this.x = 1;
        this.y = 9;
        this.title = "credit : ";
    }

    refreshPoints(context, points) {
       textToCanvas(context, this.title + points.toString(), this.x, this.y, this.innercolor, this.font);
    }

    gameOver(context) {
        textToCanvas(context, "Game over : refresh browser (F5) to play again !", this.x, this.y, this.innercolor, this.font);
    }

    win(context) {
        textToCanvas(context, "YOU WIN !  AWESOME !!!", this.x, this.y, this.innercolor, this.font);
    }
}

class Flyer extends VisualArtefact {
    constructor() {
        super();
        this.y = 30;
        this.radius = 5;
        this.speed = 20;
        this.previousX = 0;
    }

    moveRight() {
        this.previousX = this.x;
        this.x += 4;
    }

    moveLeft() {
        this.previousX = this.x
        this.x -= 4;
    }

    reset() {
        this.previousX = -1;
        this.x = 0;
    }

    draw(c) {
        const PROPELLER_LENGTH = 10;
        const DIST_PROPELLER_TO_CABIN = 9;
        const TAIL_LENGTH = 15;
        const LINE_THICKNESS = 0.9;
        const BACK_ROTOR_SIZE = 2;
        const FEET_RAIL_LENGTH = 12;
        const CABIN_TO_RAIL_LENGTH = 3;
        const DISTANCE_CABIN_TO_RAIL = 10;

        c.lineWidth = LINE_THICKNESS;

        // propellers
        //
        c.beginPath();
        c.strokeStyle = this.innercolor;
        c.moveTo(this.x - PROPELLER_LENGTH, this.y - DIST_PROPELLER_TO_CABIN);
        c.lineTo(this.x + PROPELLER_LENGTH, this.y - DIST_PROPELLER_TO_CABIN);
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y - DIST_PROPELLER_TO_CABIN);
        c.stroke(); 

        // helicopter body
        //
        drawCircle(c, this.x, this.y, this.radius, this.innercolor);

        // drawing tail
        //
        c.beginPath();
        c.moveTo(this.x, this.y);

        var xBackRotorAxis = 0;
        var yBackRotorAxis = 0;

        // draw the tail in the opposite direction where
        // flyer is heading to 
        //
        if (this.previousX > this.x) {
            xBackRotorAxis = this.x + TAIL_LENGTH;
            yBackRotorAxis = this.y;
            c.lineTo(xBackRotorAxis, yBackRotorAxis);
        }else {
            xBackRotorAxis = this.x - TAIL_LENGTH;
            yBackRotorAxis = this.y;
            c.lineTo(xBackRotorAxis, yBackRotorAxis);
        }

        c.strokeStyle = this.innercolor;
        c.stroke();

        // small circle at tail's end
        //
        drawCircle(self.context, xBackRotorAxis, yBackRotorAxis, BACK_ROTOR_SIZE, this.innercolor);

        // foot rail apparatus
        //
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.strokeStyle = this.innercolor;
        c.lineTo(this.x - CABIN_TO_RAIL_LENGTH, this.y + DISTANCE_CABIN_TO_RAIL);
        c.stroke();
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.strokeStyle = this.innercolor;
        c.lineTo(this.x + CABIN_TO_RAIL_LENGTH, this.y + DISTANCE_CABIN_TO_RAIL);
        c.stroke();
        c.beginPath();
        c.lineWidth = LINE_THICKNESS * 2;
        c.moveTo(this.x - FEET_RAIL_LENGTH / 2, this.y + DISTANCE_CABIN_TO_RAIL);
        c.strokeStyle = this.innercolor;
        c.lineTo(this.x + FEET_RAIL_LENGTH / 2, this.y + DISTANCE_CABIN_TO_RAIL);
        c.stroke();
    }
}

class Cannon extends VisualArtefact {
    constructor(canvasWidth, canvasHeight) {
        super();
        this.x = canvasWidth / 2;
        this.y = canvasHeight - 10;
        this.xHead = canvasWidth / 2 + 10;
        this.yHead = canvasHeight - 20;
        this.headWidth = 5;
        this.headHeight = 15;
        this.baseWidth = 25;
        this.baseheight = 25;
        this.stepLenght = 17;
    }

    moveLeft(canvasWidth) {
        this.x -= this.stepLenght;
        this.xHead -= this.stepLenght;

        // reappears at the right side of the canvas
        //
        if (this.x < 0) {
            this.x = canvasWidth - 10;
            this.xHead = canvasWidth;
        }
    }

    moveRight(canvasWidth) {
        this.x += this.stepLenght;
        this.xHead += this.stepLenght;

        // reappears at the left side of the canvas
        //
        if (this.x > canvasWidth) {
            this.x = 10;
            this.xHead = 20;
        }
    }

    draw(context) {
        
        // drawing cannon's base
        //
        drawRectangle(context, this.x, this.y, this.baseWidth, this.baseheight, this.innercolor);

        // drawing cannon's head
        //
        drawRectangle(context, this.xHead, this.yHead, this.headWidth, this.headHeight, this.innercolor);
    }
}

class Bullet extends VisualArtefact {
    constructor(xCannonHead, yCannonHead) {
        super();
        this.x = xCannonHead + 3;
        this.y = yCannonHead;
        this.radius = 1;
    }

    moveUp() {
        this.y -= 10;
    }

    draw(context) {
        drawCircle(context, this.x, this.y, this.radius, this.innercolor);
    }
}
