function $(element) {
    return document.querySelector(element);
}

let pontos = 0, perdeu = false,
    pulando = false,
    posCanos = 30,
    altura,
    puloALtura = 0,
    velocidadeCaindo = 0,
    velocidadeCanos = -0.02,
    bird = $(".flap"),
    pipes = [$(".canoBaixo"), $(".canoCima")];

bird.style.bottom = "38vh"

let contagem = setInterval(() => {
    pontos++;
    $(".pontuacao").innerHTML = pontos
}, 1000);

const pulo = function () {
    puloALtura = .6
    velocidadeCaindo = 0
    bird.style.rotate = "-30deg"
    pulando = true
    setTimeout(() => {
        velocidadeCaindo = 0
        puloALtura = 0
        pulando = false
    }, 200);
}

document.addEventListener("keydown", function (e) {
    if (e.key == " ") {
        pulo()
    }
})
document.addEventListener("click", pulo)


function init() {
    requestAnimationFrame(init)
    if (perdeu) {
        $(".derrota").style.display = "block";
        clearInterval(contagem)
        return
    }

    if (!pulando) bird.style.rotate = (velocidadeCaindo * 100) + "deg"
    altura = parseFloat(bird.style.bottom)
    altura -= velocidadeCaindo
    velocidadeCaindo += 0.02
    posCanos += velocidadeCanos
    if (velocidadeCanos >= -.5) velocidadeCanos -= 0.0002
    pipes.forEach(pipe => {
        pipe.style.left = `${posCanos}vw`
    })
    bird.style.bottom = `${altura + puloALtura}vw`
    checkColision()
    randomPipes()
    if (parseInt(bird.style.bottom) < 0) perdeu = true
}

function checkColision() {
    pipes.forEach(pipe => {
        let pipeInfo = pipe.getBoundingClientRect();
        let birdInfo = bird.getBoundingClientRect();
        if (pipeInfo.bottom > birdInfo.top &&
            pipeInfo.top < birdInfo.bottom &&
            pipeInfo.left < birdInfo.right &&
            pipeInfo.right > birdInfo.left) {
            perdeu = true
        }
    })
}

function randomPipes() {
    if (pipes[0].offsetLeft <= -pipes[0].getBoundingClientRect().width) {
        pipes[0].style.bottom = `${Math.random() * -70}vh`
        pipes[1].style.bottom = `${parseFloat(pipes[0].style.bottom) + 100}vh`
        posCanos = 30
        pipes.forEach(pipe => {
            pipe.style.left = `30vw`
        })
    }
}

function reset() {
    pontos = 0;
    perdeu = false
    bird.style.bottom = "38vh"
    posCanos = 30
    pipes.forEach(pipe => {
        pipe.style.left = `30vw`
    })
    velocidadeCanos = -0.02
    $(".derrota").style.display = "none";
    $(".pontuacao").innerHTML = 0
    contagem = setInterval(() => {
        pontos++;
        $(".pontuacao").innerHTML = pontos
    }, 1000);
}

init()
