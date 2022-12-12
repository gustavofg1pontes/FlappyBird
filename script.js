function $(element) {
    return document.querySelector(element);
}

let pontos = 0, perdeu = false,
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


document.addEventListener("keydown", function (e) {
    if (e.key == " ") {
        puloALtura = .6
        velocidadeCaindo = 0
        setTimeout(() => {
            velocidadeCaindo = 0
            puloALtura = 0
        }, 200);
    }
})
document.addEventListener("click", function (e) {
    puloALtura = .6
    velocidadeCaindo = 0
    setTimeout(() => {
        velocidadeCaindo = 0
        puloALtura = 0
    }, 200);
})

function init() {
    requestAnimationFrame(init)
    if (perdeu) {
        $(".derrota").style.display = "block";
        clearInterval(contagem)
        return
    }

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
        let bir = bird.getBoundingClientRect();
        if (pipeInfo.bottom > bir.top &&
            pipeInfo.top < bir.bottom &&
            pipeInfo.left < bir.right &&
            pipeInfo.right > bir.left) {
            perdeu = true
        }
    })
}

function randomPipes() {
    if (pipes[0].offsetLeft <= -pipes[0].getBoundingClientRect().width) {
        pipes[0].style.bottom = `${Math.random() * -70}vh`
        pipes[1].style.bottom = `${parseFloat(pipes[0].style.bottom) + 100}vh`
        pipes.forEach(pipe => {
            posCanos = 30
            pipe.style.left = `30vw`
        })
    }
}

function reset() {
    pontos = 0;
    perdeu = false
    bird.style.bottom = "38vh"
    pipes.forEach(pipe => {
        posCanos = 30
        pipe.style.left = `30vw`
    })
    $(".derrota").style.display = "none";
    $(".pontuacao").innerHTML = 0
    contagem = setInterval(() => {
        pontos++;
        $(".pontuacao").innerHTML = pontos
    }, 1000);
}

init()
