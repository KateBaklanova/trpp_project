
class Sprite{
    // a constructor gets called when an object is created using the new keyword.
    constructor({position, imageSrc, scale = 1, frames=1, offset = {x: 0, y: 0}}){ //чтобы было удобней передаем в функцию объект с полями position, velocity, а не отдельные значения 
        this.position = position // при этом не нужно соблюдать порядок передачи объектов тк указывается position:..., velocity
        this.width = 50
        this.image=new Image()
        this.scale=scale
        this.frames=frames // указывает на количество кадров анимации, по умолчанию 1
        this.framesCurrent=0 // текущий кадр, по умолчанию равен 0, чтобы фон не улетел
        this.framesElapsed=0
        this.offset = offset
        this.framesHold=17
        // когда current достигнет frames цикл анимации обнуляется и повторяется см. update
        this.image.src=imageSrc
    }
    draw(){
        c.drawImage(
            this.image,
            // задаем фрагмент анимации
            this.framesCurrent*(this.image.width / this.frames), // от какого пикселя картинки начинаем вырезать кадры для анимации
            0,
            this.image.width/this.frames, // ширина кадра анимации
            this.image.height,
            // конец фйрагментации
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width/this.frames)*this.scale, // конкретный размер изображения (подгоняем под кадр)
            this.image.height*this.scale)
    }
    
    update(){ // an update for position
        this.draw()
        this.animateFrames()
    }
    animateFrames(){
        
        this.framesElapsed++

        if(this.framesElapsed%this.framesHold===0)
        {
        if(this.framesCurrent<this.frames-1){
            this.framesCurrent++
        }
        else{
            this.framesCurrent=0
        }
    }
}
switchSprite(sprite) {
    // оверрайдинг
    if (this.image === this.sprites.defeat.image) {
        if (this.framesCurrent === this.sprites.defeat.frames-1)
        {
            this.defeat = true
        }
        return
    }
    if (this.image === this.sprites.attack1.image && this.framesCurrent<this.sprites.attack1.frames-1) return
    if (this.image === this.sprites.takeHit.image && this.framesCurrent<this.sprites.takeHit.frames-1) return
    switch (sprite){
        case 'idle':
            if (this.image !== this.sprites.idle.image) {
                this.image = this.sprites.idle.image
                this.frames = this.sprites.idle.frames
                this.framesCurrent = 0
            }
            break
        case 'jump':
            if (this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.frames = this.sprites.jump.frames
                this.framesCurrent = 0
            }
            break
        case 'run':
            if (this.image !== this.sprites.run.image) {
                this.image = this.sprites.run.image
                this.frames = this.sprites.run.frames
                this.framesCurrent = 0
            }
            break
        case 'fall':
            if (this.image !== this.sprites.fall.image) {
                this.image = this.sprites.fall.image
                this.frames = this.sprites.fall.frames
                this.framesCurrent = 0 
            }
            break
        case 'takeHit':
            if (this.image !== this.sprites.takeHit.image) {
                this.image = this.sprites.takeHit.image
                this.frames = this.sprites.takeHit.frames
                this.framesCurrent = 0 
            }
            break
        case 'defeat':
            if (this.image !== this.sprites.defeat.image) {
                this.image = this.sprites.defeat.image
                this.frames = this.sprites.defeat.frames
                this.framesCurrent = 0 
            }
            break
        case 'attack1':
            if (this.image !== this.sprites.attack1.image) {
                this.image = this.sprites.attack1.image
                this.frames = this.sprites.attack1.frames
                this.framesCurrent = 0
            }
            break  
    }
}
}

class Fighter extends Sprite{
    // a constructor gets called when an object is created using the new keyword.
    constructor({height, position, velocity, color, offset = {x: 0, y: 0}, imageSrc, frames=1, sprites, scale=1, attackBox = {offset: {}, width: undefined, height: undefined}, health}){ //чтобы было удобней передаем в функцию объект с полями position, velocity, а не отдельные значения 
        super({position, imageSrc, scale, frames, offset}) // при этом не нужно соблюдать порядок передачи объектов тк указывается position:..., velocity
        this.velocity = velocity
        this.lastKey
        this.color=color
        this.attackBox = {
            position: {
                x: this.position.x, // позиция бокса не привязана к самому спрайту, так как один из них будет развернут
                y: this.position.y // это позиция по умолчанию
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.isAttacking = false
        this.sprites = sprites

        this.framesCurrent=0 // текущий кадр, по умолчанию равен 0, чтобы фон не улетел
        this.framesElapsed=0
        this.framesHold=6

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        this.health=100,
        this.height = height,
        this.defeat = false
        this.width = 50
    }
    
    update(){ // an update for position
        this.draw()
        if (!this.defeat) this.animateFrames()

        this.attackBox.position.y=this.position.y+this.attackBox.offset.y
        this.attackBox.position.x=this.position.x+this.attackBox.offset.x

        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y

        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        if (this.position.y + this.height +this.velocity.y >= canvas.height-142){
            // canvas пиксели считаются сверху вниз (вверху 0, внизу наибольшее число)
            // поэтому чтобы прямоугольник не уполз за нижнюю грань холста нужно проверить это условие
            this.velocity.y = 0 // если условие выполнено, то обнуляем скорость объекта по y, он останавливается
            
        } else this.velocity.y += gravity // если не выполнено, то гравитация обеспечивает движение, пока не выполнится
    }

    takeHit() {
        this.health -= 20

        if (this.health <= 0) {
            this.switchSprite('defeat')
        }
        else {  
        this.switchSprite('takeHit')
        }
    }

    attack(){
        this.switchSprite('attack1')
        this.isAttacking=true
        setTimeout(() => { // after 10 ms the attack stops
            this.isAttacking = false
        }, 1000)
    }
}