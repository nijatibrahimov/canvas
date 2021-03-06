window.addEventListener('load', function () {
	const canvases = document.querySelectorAll('canvas')

// all canvases
	canvases.forEach(canvas => {

		// variable
		const c = canvas.getContext('2d')
		const gravity = 0.5

		const keys = {
			a: {
				pressed: false
			},
			d: {
				pressed: false
			},
			w: {
				pressed: false
			},

			ArrowRight: {
				pressed: false
			},
			ArrowLeft: {
				pressed: false
			},
			ArrowUp: {
				pressed: false
			}

		}

		// canvas
		canvas.width = 420
		canvas.height = 270
		c.fillRect(0, 0, canvas.width, canvas.height)

		// sprite
		class Sprite {
			constructor ({position, velocity, color }) {
				this.position = position
				this.velocity = velocity
				this.width = 20
				this.height = 30
				this.lastKey
				this.attackBox = {
					position: this.position,
					width: 30,
					height: 5,
				}
				this.color = color
			}

		draw() {
			c.fillStyle = this.color
			c.fillRect(this.position.x, this.position.y, this.width, this.height)

			// attack box
			c.fillStyle = 'yellow'
			c.fillRect(
				this.attackBox.position.x,
				this.attackBox.position.y,
				this.attackBox.width,
				this.attackBox.height
			)

		}

		update() {
			this.draw()

			this.position.x += this.velocity.x
			this.position.y += this.velocity.y

			if (this.position.y + this.height + this.velocity.y >= canvas.height) {
				this.velocity.y = 0
			} else {
				this.velocity.y += gravity
			}
		}

	}

	const player = new Sprite({
		position: {
				x: 0,
				y: 0
			},
			velocity: {
				x: 0,
				y: 0
			},
			color: '#00f'
		})

		const enemy = new Sprite({
			position: {
				x: 400,
				y: 0
			},
			velocity: {
				x: 0,
				y: 0
			},
			color: '#f00'
		})

		function animate() {
			window.requestAnimationFrame(animate)
			c.fillStyle = 'black'
			c.fillRect(0, 0, canvas.width, canvas.height)
			player.update()
			enemy.update()

			// player movement
			player.velocity.x = 0

			if (keys.a.pressed && player.lastKey === 'a') {
				player.velocity.x = -3
			} else if (keys.d.pressed && player.lastKey === 'd') 	{
				player.velocity.x = 3
			}

			// enemy movement
			enemy.velocity.x = 0

			if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
				enemy.velocity.x = -3
			} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
				enemy.velocity.x = 3
			}

			// detect for collision
			if (
				player.attackBox.position.x + player.attackBox.width >= enemy.position.x
				&& player.attackBox.position.x <= enemy.position.x + enemy.width
				) {
				console.log('attack')
			}
		}

		animate()

		window.addEventListener('keydown', function(event) {
			switch (event.key) {
				case 'd':
					keys.d.pressed = true
					player.lastKey = 'd'
				break
				case 'a':
					keys.a.pressed = true
					player.lastKey = 'a'
				break
				case 'w':
					player.velocity.y = -10
					break

				case 'ArrowRight':
					keys.ArrowRight.pressed = true
					enemy.lastKey = 'ArrowRight'
					break
				case 'ArrowLeft':
					keys.ArrowLeft.pressed = true
					enemy.lastKey = 'ArrowLeft'
					break
				case 'ArrowUp':
					enemy.velocity.y = -10
			}
		})

		window.addEventListener('keyup', function(event) {
			switch (event.key) {
				// player keys
				case 'd':
					keys.d.pressed = false
					break
				case 'a':
					keys.a.pressed = false
					break

				// enemy keys
				case 'ArrowRight':
					keys.ArrowRight.pressed = false
					break
				case 'ArrowLeft':
					keys.ArrowLeft.pressed = false
					break
			}
		})

	})

})