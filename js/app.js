// Enemies our player must avoid
var Enemy = function(x,y,speed){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;

	// Since the canvas' width is 505px, as defined in engine.js, the enemy must reach the end of the canvas and go offscreen
	if (this.x > 505){
		this.x = -100;
		this.speed = 100 + Math.floor(Math.random() * 200);
	}

    // Check for collision, source: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 50 &&
        50 + player.y > this.y) {
        console.log("Enemy and player collided!");
        player.x = 200;
        player.y = 400;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(x,y){ //Speed is not defined since it depends on the speed of the player
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt){
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    if (key === 'left' && this.x > 0){ // this.x must be bigger than 0 cause we can't move offscreen
        this.x -= 102; // 102 because each tile is 102px wide
    }
    if (key === 'right' && this.x < 400){
        this.x += 102;
    }
    if (key === 'up' && this.y > 0){
        this.y -= 83; //83 because each tile is 83px in height
    }
    if (key === 'down' && this.y < 400){
        this.y += 83;
    }

    // If the user reaches the top of the canvas (the water) reset back to starting position
    if (this.y < 0){
        this.x = 200;
        this.y = 400;
    }
};

// Now instantiate your objects.
// Place each enemy on his starting position
const firstEnemy = new Enemy (100, 60, 100);
const secondEnemy = new Enemy (-100, 140, 50);
const thirdEnemy = new Enemy (210, 230, 90);
const fourthEnemy = new Enemy (-60, 130, 200);

// Place all enemy objects in an array called allEnemies
const allEnemies = [firstEnemy, secondEnemy, thirdEnemy, fourthEnemy];

// Place the player object in a variable called player
const player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

