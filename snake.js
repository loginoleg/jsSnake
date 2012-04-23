var snake = {

	table_arr: 		[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],


	snake_cells: 	[[6,8],
					 [7,8],
					 [8,8]],

// checkFullRow: function()
// 	{
// 		for (y = 0; y <= 11; y++)
// 		{
// 			isfull = true;
// 			for(x = 0; x <= 7; x++)
// 			{
// 				if (snake.table_arr[y][x] == 0)
// 				{
// 					isfull = false
// 				}
// 			}
// 			if (isfull)
// 			{
// 				for (var ly = y; ly > 0; ly--)
// 				{
// 					for (var lx = 0; lx <= 7; lx ++)
// 					{
// 						snake.table_arr[ly][lx] = 0;
// 						snake.table_arr[ly][lx] = snake.table_arr[ly-1][lx];
// 					}
// 				}
// 				snake.points += 8;
// 				snake.interval -= 8;
// 				$('#points').text(snake.points);
// 			}
// 		}
// 		snake.render();
// 	},

	opportunity: function(y, x)
	{
		// Проверяем не выходит ли фигура за границы экрана
		if ((y <= 15) && (x <=15))
		{
			// // Проверяем не задевает ли фигура сущестующую "постройку"
			// for (i = y; i < y + snake.figures[figure.fid][figure.position].length; i++)
			// {
			// 	for (j = x; j < x + snake.figures[figure.fid][figure.position][0].length; j++)
			// 	{
			// 		if (snake.table_arr[i][j] == 1 && snake.figures[figure.fid][figure.position][i-y][j-x] == 1)
			// 		// if(0)
			// 		{
			// 			return false;
			// 		}
			// 	}
			// }
			// return true;
		}
		else
		{
			return false;
		}
	},

	interval: 0,
	time: 1000,
	curY: 0,
	curX: 0,
	oldY: 0,
	points: 0,
	direction: 'down',
	// figure: {
	// 	fid:1,
	// 	position:0
	// },

	// newFigure: function()
	// {
	// 	isGO = false;
	// 	snake.figure.fid = Math.floor(Math.random() * (snake.figures.length));

	// 	for (var i = 0; i < 3; i++)
	// 	{
	// 		for (var j = 0; j < 3; j++)
	// 		{
	// 			if(snake.table_arr[i][j] == 1)
	// 			{
	// 				isGO = true;
	// 			}
	// 		}	
	// 	}

	// 	if (isGO) 
	// 	{
	// 		window.clearInterval(snake.interval);
	// 		alert('Game Over');
	// 	}
	// 	else
	// 	{
	// 		snake.curY = 0;
	// 		snake.curX = 0;
	// 		snake.printFigure(snake.curY, snake.curX, snake.figure);
	// 		snake.interval = window.setInterval(snake.moveDown, snake.time);
	// 	}
	// },

	changePosition: function(initY, initX, figure)
	{
		old_position = figure.position;
		(figure.position != 3) ? figure.position++ : figure.position = 0;
		if (snake.opportunity(snake.curY, snake.curX, figure))
		{
			figure.position = old_position;
			snake.removeFigure(initY, initX, figure);
			(figure.position != 3) ? figure.position++ : figure.position = 0;
			snake.printFigure(initY, initX, figure);
		}
		else
		{
			figure.position = old_position;
		}
	},

	printSnake: function()
	{
		console.log('printSnake');
		for (var len = 0; len < snake.snake_cells.length; len++)
		{
			console.log(snake.snake_cells[len][0]);
			var y = snake.snake_cells[len][0];
			var x = snake.snake_cells[len][1];
			$('#' + y + '_' + x).addClass('selected');
		}
	},


	// printFigure: function(initY, initX, figure)
	// {
	// 	for (y = initY; y <= initY - 1 + snake.figures[figure.fid][figure.position].length; y++)
	// 	{
	// 		for (x = initX; x <= initX - 1 + snake.figures[figure.fid][figure.position][0].length; x++)
	// 		{
	// 			if (snake.figures[figure.fid][figure.position][y - initY][x - initX])
	// 			{
	// 				$('#' + y + '_' + x).addClass('selected');
	// 			}
	// 		}
	// 	}
	// },

	// removeFigure: function(initY, initX, figure)
	// {
	// 	for (y = initY; y <= initY - 1 + snake.figures[figure.fid][figure.position].length; y++)
	// 	{
	// 		for (x = initX; x <= initX - 1 + snake.figures[figure.fid][figure.position][0].length; x++)
	// 		{
	// 			if (snake.figures[figure.fid][figure.position][y - initY][x - initX])
	// 			{
	// 				$('#' + y + '_' + x).removeClass('selected');
	// 			}
	// 		}
	// 	}
	// },

	moveLeft: function(pos)
	{
		if (snake.opportunity(snake.curY, snake.curX - 1, snake.figure))
		{
			snake.removeFigure(snake.curY, snake.curX, snake.figure);
			snake.printFigure(snake.curY, --snake.curX, snake.figure);
		}
	},

	moveRight: function(pos)
	{
		// if (snake.opportunity(snake.curY, snake.curX + 1, snake.figure))
		if(1)
		{
			console.log('right');
			console.log(snake.snake_cells);
			// snake.removeFigure(snake.curY, snake.curX, snake.figure);
			// snake.printFigure(snake.curY, ++snake.curX, snake.figure);
		}
	},

	moveDown: function(pos)
	{
		snake.oldY = snake.curY;
		if (snake.opportunity(snake.curY + 1, snake.curX, snake.figure))
		{
			snake.removeFigure(snake.curY, snake.curX, snake.figure);
			snake.printFigure(++snake.curY, snake.curX, snake.figure);
		}
		if (snake.oldY == snake.curY)
		{
			for (y = snake.curY; y <= snake.curY - 1 + snake.figures[snake.figure.fid][snake.figure.position].length; y++)
			{
				for (x = snake.curX; x <= snake.curX - 1 + snake.figures[snake.figure.fid][snake.figure.position][0].length; x++)
				{
					if (snake.figures[snake.figure.fid][snake.figure.position][y - snake.curY][x - snake.curX])
					{
						$('#' + y + '_' + x).removeClass('selected');
						snake.table_arr[y][x] = 1;
						window.clearInterval(snake.interval);
					}
				}
			}
			snake.checkFullRow();
			snake.render();
			for (i = 0; i <= 11; i++)
			{
					console.log (snake.table_arr[i][0],
						snake.table_arr[i][1],
						snake.table_arr[i][2],
						snake.table_arr[i][3],
						snake.table_arr[i][4],
						snake.table_arr[i][5],
						snake.table_arr[i][6],
						snake.table_arr[i][7]
						);
			}
			snake.newFigure();
		}
	},

	moveUp: function(pos)
	{
		// if (snake.opportunity(snake.curY, snake.curX + 1, snake.figure))
		if(1)
		{
			console.log('UUUP');
			
			// snake.removeFigure(snake.curY, snake.curX, snake.figure);
			// snake.printFigure(snake.curY, ++snake.curX, snake.figure);
		}
	},

	move: function(direction)
	{
		if (direction == 'up')
		{
			snake.direction = 'up';
			snake.moveUp();
		}
		else if (direction == 'down')
		{
			snake.direction = 'down';
		}
		else if (direction == 'left')
		{
			snake.direction = 'left';
		}
		else if (direction == 'right')
		{
			snake.direction = 'right';
			snake.moveRight();
		}


	},

	render: function()
	// Проходит по всему полю и отображает на экран его содержимое:
	// при 1 в массиве подсвечивает "пиксель", при 0 -- выключает.
	{
		for (i = 0; i <= 15; i++)
		{
			for(j = 0; j <= 15; j++)
			{
				if (snake.table_arr[i][j] == 1)
				{
					$('#' + i + '_' + j).addClass('selected');
				}
				else
				{
					$('#' + i + '_' + j).removeClass('selected');	
				}
			}
		}
	},

	initKey: function()
	{
		$('html').keydown(function(e)
		{
			if (e.which == 37) // left arrow key
			{
				snake.move("left");
			}
			else if (e.which == 38) // up arrow key
			{
				snake.move("up");
			}
			else if (e.which == 39) // right arrow key
			{
				snake.move("right");
			}
			else if (e.which == 40) // down arrow key
			{
				snake.move("down");
			}
		});
	},

	init : function()
	{
		snake.initKey();
		snake.render();
		snake.printSnake(snake.curY, snake.curX, snake.figure);
		// snake.checkFullRow();
		// snake.interval = window.setInterval(snake.move, snake.time);
	}
};


$(window).load(function() {
	snake.init();
});
