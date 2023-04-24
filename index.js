const canvas = document.querySelector('canvas') // кладем элемент canvas из html файла
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Метод fillRect() рисует "залитый" прямоугольник. Цвет заливки, по умолчанию, черный.
// context.fillRect(x, y, width, height)

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.7
 // чтобы было что-то типа ускорения

const background = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: "img/Background.png"
})

const shop = new Sprite({
    position:{
        x: 100,
        y: 270
    },
    imageSrc: "img/Drone11.png",
    scale: 1.2,
    frames: 6
})
const player = new Fighter( // creates object of the class Sprite
{
    position: {
        x: 100, // this is position passed to the function as an object
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    framesHold: 6,
    sprites: {
        idle: {
            imageSrc: "img/Martial Hero 2/Sprites/Idle.png",
            frames: 4
        },
        run: {
            imageSrc: "img/Martial Hero 2/Sprites/Run.png",
            frames: 8
        },
        fall: {
            imageSrc: "img/Martial Hero 2/Sprites/Fall.png",
            frames: 2
        },
        jump: {
            imageSrc: "img/Martial Hero 2/Sprites/Jump.png",
            frames: 2
        },
        takeHit: {
            imageSrc: "img/Martial Hero 2/Sprites/Take hit.png",
            frames: 3
        },
        defeat: {
            imageSrc: "img/Martial Hero 2/Sprites/Death.png",
            frames: 7
        },
        attack1: {
            imageSrc: "img/Martial Hero 2/Sprites/Attack1.png",
            frames: 4
        }
    },
    scale: 1.7,
    color:'green',
    offset:{
        x:150,
        y:81
    },
    attackBox: {
        offset: {
            x: 45,
            y: 45
        },
        width: 113,
        height: 92
    },
    imageSrc: "img/Martial Hero 2/Sprites/Idle.png",
    height: 150,
    frames: 4
}
)


console.log(player) // чтобы отобразить информацию в консоли

const enemy = new Fighter({
    position:
    {
        x:400,
        y:100
    },
    velocity: {
        x: 0,
        y: 0
    },
    sprites: {
        idle: {
            imageSrc: "img/3 Dude_Monster/Dude_Monster_Idle_4.png",
            frames: 4
        },
        run: {
            imageSrc: "C:/Users/bakla/игруля/img/3 Dude_Monster/Dude_Monster_Run_6.png",
            frames: 6
        },
        jump: {
            imageSrc: "img/3 Dude_Monster/Dude_Monster_Jump_8.png",
            frames: 8
        },
        takeHit: {
            imageSrc: "img/3 Dude_Monster/Dude_Monster_Hurt_4.png",
            frames: 4
        },
        defeat: {
            imageSrc: "img/3 Dude_Monster/Dude_Monster_Death_8.png",
            frames: 8
        },
        attack1: {
            imageSrc: "C:/Users/bakla/игруля/img/3 Dude_Monster/Dude_Monster_Attack2_6.png",
            frames: 6
        }
    },
    scale: 1.7,
    color:'blue',
    offset:{ //нужно для атаки
        x:0,
        y:10
    },
    attackBox: {
        offset: {
            x: -5,
            y: 10
        },
        width: 20,
        height: 30
    },
    imageSrc: "img/3 Dude_Monster/Dude_Monster_Idle_4.png",
    height: 50,
    frames: 4
}
)


console.log(enemy)


decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate) // infinite animation
    c.fillStyle='black' // иначе зальет все красным, тк это был последний fillStyle назначенный нами
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()

    // для играка движение по горизонтали
    player.velocity.x=0

    if(keys.d.pressed && player.lastKey === 'd'){ // см. eventListener 'd'
        player.velocity.x=5
        player.switchSprite('run')
    }
    else if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x=-5
        player.switchSprite('run')
    }
    else {
        player.switchSprite('idle')
    }


    if (player.velocity.y<0){
        player.switchSprite('jump')
    } else if (player.velocity.y>0) {
        player.switchSprite('fall') 
    }

    // для врага движение по горизонтали
    enemy.velocity.x=0
    if(keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight') {
        enemy.velocity.x=10
        enemy.switchSprite('run')
    }
    else if(keys.ArrowLeft.pressed && enemy.lastKey==="ArrowLeft") {
        enemy.velocity.x=-10
        enemy.switchSprite('run')
    }
    else {
        enemy.switchSprite('idle')
    }

    if (enemy.velocity.y<0){
        enemy.switchSprite('jump')
    }

    if(rectangularCollision(player, enemy) && player.isAttacking && player.framesCurrent === 2){ // зачем тут он ставил скобочки фигурные
            enemy.takeHit()
            player.isAttacking=false // чтобы удар был произведен 1 раз
            // изначальное значение = 100, потом понижается до 80, 60... переводим это в проценты +'%' и назначаем для шкалы
            document.querySelector('#enemyHealth').style.width=enemy.health+'%' 
            console.log('go')
        }
    if(rectangularCollision(enemy, player) && enemy.isAttacking && enemy.framesCurrent === 2){ // зачем тут он ставил скобочки фигурные
            player.takeHit()
            enemy.isAttacking=false // чтобы удар был произведен 1 раз
            document.querySelector('#playerHealth').style.width=player.health+'%'
            console.log(player.health)
            console.log('go enemy')
        }
    if(enemy.health===0 || player.health===0)  
    {
        determineWinner(timerId)
    }  
}

const keys = { // тут равно
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}

animate()
window.addEventListener('keydown', (event)=>{ // нажатие кнопки 
    if (!player.defeat)
    {
    switch (event.key){
        // keys for player
        case 'd':
            keys.d.pressed=true // двигаем по коррдинате x
            player.lastKey='d'
            console.log("fvkjfnfnj")
            break
        case 'a':
            keys.a.pressed=true
            player.lastKey='a'
            break
        case 'w':
            player.velocity.y=-10
            break
        // spacebar for attack
        case ' ':
            player.attack()
            break
    }
}
    if (!enemy.defeat)
    {
        switch(event.key) {
        // keys for enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed=true
            enemy.lastKey='ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
            enemy.lastKey='ArrowLeft'
            break
        case 'ArrowDown':
            enemy.attack()
            break
        case 'ArrowUp':
            enemy.velocity.y=-10
            break
        }
    }
    // console.log(event.key) // все это стрелочная функция, выводит в консоль нажатую клавишу
})
// может произойти такая ситуация что зажаты обе кнопки см. const keys!!!!!!!!!
window.addEventListener('keyup', (event)=>{ // когда отпутили кнопку персонаж останавливается
    switch(event.key){
        // player keys
        case 'd':
            keys.d.pressed=false
            break
        case 'a':
            keys.a.pressed=false
            break
        case 'w':
            keys.w.pressed=false
            break
        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed=false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed=false
            break
    }
})
