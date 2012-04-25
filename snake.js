var snake = {

	table_arr: 		[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
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
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
					 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],


	snake_cells: 	[[6,8],
					 [7,8],
					 [8,8],
					 [9,8],
					 [10,8],
					 [11,8]
					 ],

	newApple: function()
	{
		console.log('newApple');
		// snake.figure.fid = Math.floor(Math.random() * (snake.figures.length));
		var randY = Math.floor(Math.random() * 15);
		var randX = Math.floor(Math.random() * 15);
		var snakeLen = snake.snake_cells.length - 1;
		var result = true;
		for (var iLen = 0; iLen <= snakeLen; iLen++)
		{
			var curY = snake.snake_cells[iLen][0];
			var curX = snake.snake_cells[iLen][1];
			if ((curY == randY) && (curX == randX))
			{
				console.log(curY, randY, curX, randX);
				result = false;
			}
		}
		if (!result)
		{
			snake.newApple();
		}
		else
		{
			snake.table_arr[randY][randX] = 1;
			// snake.render();
			$('#' + randY + '_' + randX).addClass('apple');
			var ll = 0;
			for (var xx = 0; xx <= 15; xx++)
			{
				for (var yy = 0; yy <= 15; yy++)
				{
					if (snake.table_arr[yy][xx] == 1)
					{
						ll++;
					}
				}
			}
			console.log(randY, randX, ll);
		}
	},

	grow: function(y, x)
	{
		// snake.snake_cells.push([y,x]);
		snake.snake_cells.unshift([y,x]);
		snake.printSnake();
		window.clearInterval(snake.interval);
		// snake.time -= 25;
		snake.interval = window.setInterval(snake.move, snake.time);
	},

	removeApple: function(y, x)
	{
		snake.table_arr[y][x] = 0;
		$('#' + y + '_' + x).removeClass('apple');
		// snake.render();	
	},

	opportunity: function(y, x)
	{
		// Проверяем не выходит ли фигура за границы экрана
		if ((y <= 15) && (x <=15) && (y >= 0) && (x >= 0))
		{
			var snakeLen = snake.snake_cells.length - 1;
			for (var i = 0; i <= snakeLen; i++)
			{
				var curY = snake.snake_cells[i][0];
				var curX = snake.snake_cells[i][1];
				if ((curY == y) && (curX == x))
				{
					return false;
				}
			}

			if (snake.table_arr[y][x] == 1) // наткнулись на яблоко
			{
				snake.removeApple(y,x);
				snake.newApple(); // добавляем яблоко
				snake.grow(y,x);
			}
			return true;
		}
		else
		{
			return false;
		}
	},

	interval: 0,
	time: 500,

	points: 0,
	direction: 'right',

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
		var snakeLen = snake.snake_cells.length;
		for (var len = 0; len < snakeLen; len++)
		{
			var y = snake.snake_cells[len][0];
			var x = snake.snake_cells[len][1];
			$('#' + y + '_' + x).addClass('selected');
		}
		var y = snake.snake_cells[snakeLen - 1][0];
		var x = snake.snake_cells[snakeLen - 1][1];
		$('#' + y + '_' + x).removeClass('selected');
	},

	moveUp: function(pos)
	{
		var y = snake.snake_cells[0][0];
		var x = snake.snake_cells[0][1];
		if (snake.opportunity(y - 1, x))
		{
			y--;
			snake.snake_cells.unshift([y,x]);
			snake.printSnake();
			snake.snake_cells.pop(); //извлекаем последний элемент
		}
	},

	moveRight: function(pos)
	{
		var y = snake.snake_cells[0][0];
		var x = snake.snake_cells[0][1];
		if (snake.opportunity(y, x + 1))
		{
			x++;
			snake.snake_cells.unshift([y,x]);
			snake.printSnake();
			snake.snake_cells.pop(); //извлекаем последний элемент
		}
	},

	moveLeft: function(pos)
	{
		var y = snake.snake_cells[0][0];
		var x = snake.snake_cells[0][1];
		if (snake.opportunity(y, x - 1))
		{
			x--;
			snake.snake_cells.unshift([y,x]);
			snake.printSnake();
			snake.snake_cells.pop(); //извлекаем последний элемент
		}
	},

	moveDown: function(pos)
	{
		var y = snake.snake_cells[0][0];
		var x = snake.snake_cells[0][1];

		if (snake.opportunity(y + 1, x))
		{
			y++;
			snake.snake_cells.unshift([y,x]);
			snake.printSnake();
			snake.snake_cells.pop(); //извлекаем последний элемент
		}
	},


	move: function()
	{
		var oldY = snake.snake_cells[0][0];
		var oldX = snake.snake_cells[0][1];
		if (snake.direction == 'up')
		{
			snake.direction = 'up';
			snake.moveUp();
		}
		else if (snake.direction == 'down')
		{
			snake.direction = 'down';
			snake.moveDown();
		}
		else if (snake.direction == 'left')
		{
			snake.direction = 'left';
			snake.moveLeft();
		}
		else if (snake.direction == 'right')
		{
			snake.direction = 'right';
			snake.moveRight();
		}
		var curY = snake.snake_cells[0][0];
		var curX = snake.snake_cells[0][1];

		if ((oldY == curY) && (oldX == curX))
		{
			window.alert('gameover!');
			window.clearInterval(snake.interval);
		}
		console.log(oldY, curY, oldX, curX);

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
			if ((e.which >= 37) && (e.which <= 40))
			{
				if ((e.which == 37) && (snake.direction != 'right')) // left arrow key
				{
					snake.direction = 'left' ;
				}
				else if ((e.which == 38) && (snake.direction != 'down')) // up arrow key
				{
					snake.direction = 'up';
				}
				else if ((e.which == 39) && (snake.direction != 'left'))// right arrow key
				{
					snake.direction = 'right';
				}
				else if ((e.which == 40) && (snake.direction != 'up')) // down arrow key
				{
					snake.direction = 'down';
				}
				snake.move();
			}
		});
	},

	init : function()
	{
		snake.initKey();
		snake.render();
		snake.newApple();
		// snake.printSnake();
		// snake.checkFullRow();
		snake.interval = window.setInterval(snake.move, snake.time);
	}
};


$(window).load(function() {
	snake.init();
});
