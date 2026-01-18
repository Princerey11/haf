let score = 0;
let level = 1;
let gameInterval;
let starSpeed = 1200;

// Sound effects
const clickSound = new Audio("sound/click.mp3");
const levelUpSound = new Audio("sound/levelup.mp3");

function startGame() {
    score = 0;
    level = 1;
    starSpeed = 1200;

    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;

    clearInterval(gameInterval);
    gameInterval = setInterval(createStar, starSpeed);
}

function createStar() {
    const gameArea = document.getElementById("gameArea");
    const star = document.createElement("div");

    star.classList.add("star");
    star.innerHTML = "⭐";

    star.style.left = Math.random() * (gameArea.clientWidth - 30) + "px";

    star.onclick = () => {
        clickSound.play();
        score++;
        document.getElementById("score").innerText = score;

        checkLevelUp();
        star.remove();
    };

    gameArea.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 3000);
}

function checkLevelUp() {
    if (score % 10 === 0) {
        level++;
        levelUpSound.play();
        document.getElementById("level").innerText = level;

        // Speed up stars
        clearInterval(gameInterval);
        starSpeed -= 150;
        if (starSpeed < 400) starSpeed = 400;

        gameInterval = setInterval(createStar, starSpeed);
    }
}
