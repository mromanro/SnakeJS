var snakePositionX = snakePositionY = 10;
        var foodPositionX = foodPositionY = 15;
        var vectorX = 1;
        var vectorY = 0;
        var bound = 20;
		var radius = (bound - 2) / 2;
        
        var avaPos = [];
        
        var tail = [];
        var tailSize = 4;
        
        var gameRun = true;
        var looped = true;
    
		window.onload = function() {
            generateAvailablePositions();
			canvas = document.getElementById("web_canvas");
			context = canvas.getContext("2d");
			document.addEventListener("keydown", keyPush);
			setInterval(game, 100);
		}
		
		function keyPush(event) {
            
            if(looped){
				looped = false;
				switch(event.keyCode) {
					case 37: // arrow key left
						if(vectorX != 1) {
							vectorX = -1;
							vectorY = 0;
						}
						break;
					case 38: // arrow key up
						if(vectorY != 1) {
							vectorX = 0;
							vectorY = -1;
						}
						break;
					case 39: // arrow key right
						if(vectorX != -1) {
							vectorX = 1;
							vectorY = 0;
						}
						break;
					case 40: // arrow key down
						if(vectorY != -1) {
							vectorX = 0;
							vectorY = 1;
						}
						break;
					default:
						break;
				}
			}	
		}
    
        function generateAvailablePositions() {
            for(var i = 0; i < 20; i++){
                for(var j = 0; j < 20; j++){
                    avaPos.push({X: i , Y: j});
                }
            }
        }
		
		function game() {
            
            if(gameRun == true) {
                update();
                drawBackground(context, canvas, "white");
            }
            else {
                drawBackground(context, canvas, "red");
            }
            drawFood(context, "blue",foodPositionX, foodPositionY, radius, bound);
            drawSnake(context, "lime", snakePositionX, snakePositionY, bound, tail);
            looped = true;
		}
    
        function update() {
            
            //update snake position
            snakePositionX += vectorX;
            snakePositionY += vectorY;
            
            //check collision with food
            if(snakePositionX == foodPositionX
               && snakePositionY == foodPositionY) {
                //foodPositionX = Math.floor(Math.random() * bound);
                //foodPositionY = Math.floor(Math.random() * bound);
                var position = avaPos[Math.floor(Math.random() * avaPos.length)];
                foodPositionX = position.X;
                foodPositionY = position.Y;
                console.log("X: " + position.X + "Y: " + position.Y );
                
                tailSize++;
            }
            
            if(checkDeathCollision(context, canvas, snakePositionY, snakePositionX, tail)) {
                snakePositionX -= vectorX;
                snakePositionY -= vectorY;
            }
            else{
                var temp = {X:snakePositionX, Y:snakePositionY};
                tail.push(temp);
                var index = avaPos.indexOf(temp);
				
                if(index > -1) {
                    avaPos.splice(index, 1);
				}
                
                if(tail.length > tailSize) {
                    avaPos.push(tail.shift());
                }
            }
            
        }
    
        function checkDeathCollision(context, canvas, snakePositionY, snakePositionX, tail) {
            if(snakePositionX < 0 || snakePositionY < 0 ||
               (snakePositionX * bound) >= canvas.width || (snakePositionY * bound) >= canvas.height){
                gameRun = false;
                return true;
            }
            
            tail.forEach(function(element){
                if(snakePositionX == element.X && snakePositionY == element.Y){
                    gameRun = false;
                    return true;
                }
            });
            return false;
        }
    
        function drawBackground(context, canvas, color) {
            //fill background
            context.fillStyle = color;
            context.fillRect(0,0,canvas.width, canvas.height);
        }
    
        function drawFood(context, color, positionX, positionY, radius, bound) {
            //draw food as circle
            context.fillStyle = color;
            context.beginPath();
            context.arc(positionX * bound + radius, positionY * bound + radius, radius, 2 * Math.PI, false);
            context.fill();
        }
    
        function drawSnake(context, color, positionX, positionY, bound, tail) {
            //draw snake as square
            context.fillStyle = color;
            context.fillRect(snakePositionX * bound, snakePositionY * bound, bound - 2, bound - 2);
            
            //draw tail
            tail.forEach(function(element) {
                context.fillRect(element.X * bound, element.Y * bound, bound - 2, bound - 2);
            });
        }
    
        //TODO: end game before head goes out of bounds. add game over ands start screens.
		//TODO: make difficulties
		//TODO: classes??