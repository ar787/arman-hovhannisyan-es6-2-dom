class Gladiator {

    constructor(name, health, power, speed) {
        this.name = name
        this.health = health
        this.power = power
        this.speed = speed
        // this.interval = null
    }

    attackEnemyAt(index) {
        const otherGladiator = gladiators[index]
        setTimeout( () => {
            if (otherGladiator.health <= 0) { return }

            otherGladiator.health -= this.power
            otherGladiator.speed = this.speed * (otherGladiator.health / this.health)

            if (otherGladiator.health <= 0) {
               requireCeasersChoiceForGladiator(otherGladiator, index)
            } else if (otherGladiator.health <= 30) {
                otherGladiator.speed *= 3;
            }

            document.write(`gladiator ${this.name}  is attacking enemy with power  ${this.power} to  ${otherGladiator.name}`)
            document.write("<br>")
        }, 5/this.speed)
    }

    // free() {
    //     clearInterval(this.interval)
    // }

}

function genereteGladiators() {
    let arr = [];
    for (let i = 0; i < 5; ++i) {
        let name = faker.name.findName()
        let power = getRandomInt(1,6)
        let speed = getRandomInt(1,6)
        arr.push(new Gladiator(name, 100,  power , speed))
        document.write(name)
    }
    return arr;
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function randomGladiator() {
    return gladiators[getRandomInt(0, gladiators.length)]
}

function requireCeasersChoiceForGladiator(gladiator, index) {
    let ceasersChoice = confirm("👎" + "👍")
    
    if (ceasersChoice) {
        gladiator.health = 50
        document.write(`Caesar showed 👍 ${gladiator.name}`)
        document.write("<br>")
    } else {
        document.write(`Caesar showed 👎 ${gladiator.name}`)
        document.write("<br>")
        // gladiator.free()
        // gladiator = null
        gladiators.splice(index, 1)
    }
    return ceasersChoice;
}

function start() {
    let time = setInterval(() => {
        
    for (let idx = 0; idx < gladiators.length; ++idx) {
        
        if (gladiators.length < 2) {
            document.write(`${gladiators[0].name} won the battle with health x ${gladiators[0].health}`)
            document.write("<br>")
            clearInterval(time)
        }

        const gladiator = gladiators[idx]
        let randomIdx = idx

        while (randomIdx === idx && gladiators.length > 1) {
            randomIdx = getRandomInt(0, gladiators.length)
        }

        if (randomIdx === idx) { return }

        gladiator.attackEnemyAt(randomIdx)
    }
    },0)
}

let gladiators = genereteGladiators();
start();