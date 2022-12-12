function $(element) {
    return document.querySelector(element);
}

let altura
let puloALtura = 0
let velocidadeCaindo = 0
let bird = $(".flap")
bird.style.bottom = "38vw"


document.addEventListener("keydown", function (e) {
    if (e.key == " ") {
        puloALtura = .7
        velocidadeCaindo = 0
        setTimeout(() => {
            velocidadeCaindo = 0
            puloALtura = 0
        }, 150);
    }
})

function init() {
    requestAnimationFrame(init)

    altura = parseFloat(bird.style.bottom)
    altura -= velocidadeCaindo
    velocidadeCaindo += 0.02
    bird.style.bottom = `${altura + puloALtura}vw`
    if (parseInt(bird.style.bottom) < 0) console.log("perdeu")
}

init()
