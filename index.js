const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');  

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }



const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 620,
        y: 128
    },
    scale: 2.75,
    framesMax: 6,
    imageSrc: './img/shop.png'
})


const player = new Fighter({
    position: {
    x: 0,
    y: 0 
},
    velocity: {
    x: 0,
    y: 10
},
    offset: {
        x: 0, 
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5, 
    offset:{
        x: 215, 
        y: 157
    }
})


const enemy = new Fighter({
    position: {
    x: 400, 
    y: 100
},
    velocity: {
    x: 0,
    y: 0    
},
    color: 'blue',
    offset: {
        x: -50, 
        y: 0
    } 
})

console.log(player);

const keys = {

// Keys for Player 
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },

    w: {
        pressed: false
    },

// Keys for Enemy 
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


decreaseTimer()


function animate(){


    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    //enemy.update()
    
    player.velocity.x = 0
    enemy.velocity.x = 0
    

    // Player Movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } 
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
    }


    // Enemy Movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } 
    else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
    }

    // detect for collicion

    if( 
        RectangleCollision({
            rectangle1: player,
            rectangle2: enemy
        })
        && 
        player.isAttacking){
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        } 


        if( 
            RectangleCollision({
                rectangle1: enemy,
                rectangle2: player
            })
            && 
            enemy.isAttacking){
            enemy.isAttacking = false
            player.health -= 20
            document.querySelector('#playerHealth').style.width = player.health + '%'
            }
        
            // end game based on health

            if(enemy.health <= 0 || player.health <= 0){
                determineWinner({player,enemy, timerID})
            }

        }
    


animate()

window.addEventListener('keydown', (event) =>{

    console.log(event.key)

    switch (event.key){

//Keys pressed for player
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
        break

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
        break

        case 'w':
            player.velocity.y = -20 
        break

        case ' ':
            player.attack()
            document.getElementById('punch').play();
        break 

//Keys pressed for Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
        break

        case 'ArrowUp':
            enemy.velocity.y = -20
        break

        case 'ArrowDown':
            enemy.attack()
            document.getElementById('punch').play();
        break
    }
    console.log(event.key); 
})




window.addEventListener('keyup', (event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed = false
        break

        case 'a':
            keys.a.pressed = false
        break

        case 'w':
            keys.w.pressed = false
        break
    }

    switch (event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break

        case 'ArrowUp':
            keys.ArrowUp.pressed = false
        break
    }

    
    console.log(event.key); 


})