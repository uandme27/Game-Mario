const canvas = document.getElementById('canvas');
canvas.width = 1980
canvas.height = 1080
canvas.style.display = "none"
const map = ["map2.jpg", "map3.jpg", "map4.jpg", "map5.jpg", "map6.jpg", "map7.jpg", "map8.jpg", "map9.jpg", "map10.jpg"]
const randomIndex = Math.floor(Math.random() * map.length);
const ctx = canvas.getContext('2d');
canvas.style.backgroundImage = `url(./img/background/${map[randomIndex]})`

const player = new Image();
const key = new Image();
const brickImage = new Image();
const correctSound = new Audio('./sound/correct.m4a');



// vao game//////////////////////
document.querySelector(".playButton").addEventListener('click', () => {
    let count = 0;
    let textMenu = ``
    let gameOver = false

    key.src = './img/character/princes1.png';
    brickImage.src = './img/brick1.png';



    var quiz
    let dem = 0;


    class Character {
        constructor() {
            this.x = canvas.width / 2 - 40;
            this.y = canvas.height;
            this.width = 80;
            this.height = 80;
            this.dx = 0;
            this.jumping = false;
            this.jumpPower = 22;
        }
        updatePosition() {
            if (this.jumping) {
                this.y -= this.jumpPower;
                this.jumpPower -= 1;
            }
            if (this.y + this.height >= canvas.height) {
                this.y = canvas.height - this.height;
                this.jumping = false;
                this.jumpPower = 22;
            }
            this.x += this.dx;
            if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width;
            }
            else if (this.x < 0) {
                this.x = 0;
            }
        }
    }
    const character = new Character

    class Bricks {
        constructor() {
            this.bricks = [];
            this.brickSpacing = 150; // Khoảng cách giữa các viên gạch
        }

        drawBricks() {
            this.bricks.forEach((brick) => {
                ctx.drawImage(brickImage, brick.x, brick.y, brick.width, brick.height);
                const x = brick.x + brick.width / 2;
                const y = brick.y + brick.height - 35;
                ctx.fillStyle = 'black';
                ctx.font = '40px "Trebuchet MS"';
                ctx.textAlign = 'center';
                ctx.fillText(brick.value, x, y);
            });
        }

        createBrick() {
            if (mon == 'quizM') {
                console.log(quizs)
                quiz = quizs.shift();
                for (let i = 0; i < 4; i++) {
                    this.bricks.push({
                        x: i * (canvas.width / 4) + 180,
                        y: 650,
                        width: 140,
                        height: 100,
                        value: quiz.totalAnswers[i],
                    });
                }
            } else {
                quiz = quizs.sort(() => Math.random() - 0.5)[dem++];
                ochua = quiz.container;
                const totalBricks = quiz.correctAnswer.length;
                const totalBrickWidth = totalBricks * 140 + (totalBricks - 1) * this.brickSpacing;
                const startX = (canvas.width - totalBrickWidth) / 2; // Tính tọa độ x bắt đầu để nằm giữa màn hình
                for (let i = 0; i < totalBricks; i++) {
                    this.bricks.push({
                        x: startX + i * (140 + this.brickSpacing),
                        y: 650,
                        width: 140,
                        height: 100,
                        value: quiz.answers[i],
                    });
                }
            }
        }

        clearBricks() {
            this.bricks.length = 0;
        }
        clearBrick(brickToRemove) {
            const index = bricks.bricks.indexOf(brickToRemove);
            if (index !== -1) {
                bricks.bricks.splice(index, 1); // Xóa viên gạch khỏi mảng
            }
        }
    }

    const bricks = new Bricks();
    console.log(bricks)

    let ochua = ""



    function drawCharacter() {

        ctx.drawImage(player, character.x, character.y, character.width, character.height);


    }





    bricks.createBrick();

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bricks.drawBricks();
        drawCharacter();
        character.updatePosition();
        requestAnimationFrame(gameLoop);
        if (mon == "quizM") {
            document.getElementById("quiz").innerHTML = quiz.question
        } else {

            document.getElementById("quiz").innerHTML = quiz.question
            document.getElementById("ochua").innerHTML = ochua
        }
    }

    document.addEventListener('keydown', event => {
        if (!gameOver) {
            event.key === 'ArrowLeft' ? character.dx = -5 :
                event.key === 'ArrowRight' ? character.dx = 5 :
                    event.key === ' ' && !character.jumping && (character.jumping = true)

        }
    });


    document.addEventListener('keyup', event => {
        character.dx = event.key === 'ArrowLeft' || event.key === 'ArrowRight' ? 0 : character.dx;
    })

    document.addEventListener('keydown', event => {
        switch (mon) {
            case 'quizM':
                bricks.bricks.forEach(brick => {
                    if (character.x + character.width >= brick.x && character.x <= brick.x + brick.width && character.jumping) {
                        if (brick.value == quiz.correctAnswer) {
                            count += 1
                            document.getElementById("score").innerHTML = `Điểm: ${count}`
                            correctSound.play();
                            showtext("Trả lời đúng");
                            bricks.clearBricks();
                            setTimeout(() => bricks.createBrick(), 500)
                            if (count == 10) {
                                textMenu = `
                                <p class="aa">Chúc mừng bạn đã chiến thắng</p>
                                <div>
                                    <p id="againButton">Thử lại</p>
                                    <p id="backButton">Quay về</p>
                                </div>`

                                setTimeout(() => menu.style.display = 'flex'

                                    , 100)
                                document.getElementById("menu").innerHTML = textMenu
                                gameOver = true
                                back()
                                restartGame()
                            }
                        } else {
                            textMenu = `
                            <p class="aa">Bạn đã thua rồi có muốn thử lại không?</p>
                            <div>
                            <p id="againButton">Thử lại</p>
                                <p id="backButton">Quay về</p>
                            </div>
                            `
                            showtext("Trả lời sai");
                            setTimeout(() => { menu.style.display = 'flex' }, 100)
                            document.getElementById("menu").innerHTML = textMenu
                            gameOver = true
                            back()
                            restartGame()
                        }

                    }
                });
                break;
            case 'quizE':

                bricks.bricks.forEach(brick => {

                    if (character.x + character.width >= brick.x && character.x <= brick.x + brick.width && character.jumping) {
                        // if (brick.value == quiz.correctAnswer) {
                        bricks.clearBrick(brick)
                        console.log(quiz.container)

                        ochua = ochua.replace("_", `${brick.value}`)
                        if (!ochua.includes('_') && ochua != quiz.correctAnswer) {
                            textMenu = `
                            <p class="aa">Bạn đã thua rồi có muốn thử lại không?</p>
                            <div>
                            <p id="againButton">Thử lại</p>
                                <p id="backButton">Quay về</p>
                            </div>
                            `
                            showtext("Trả lời sai");
                            setTimeout(() => { menu.style.display = 'flex' }, 100)
                            document.getElementById("menu").innerHTML = textMenu
                            gameOver = true
                            back()
                            restartGame()
                        } else if (ochua == quiz.correctAnswer) {
                            console.log("win")
                            count += 1
                            document.getElementById("score").innerHTML = `Điểm: ${count}`
                            correctSound.play();
                            showtext("Trả lời đúng");

                            setTimeout(() => bricks.createBrick(), 500)
                            if (count == 10) {

                                console.log('win')
                                textMenu = `
                                <p class="aa">Chúc mừng bạn đã chiến thắng</p>
                                <div>
                                    <p id="againButton">Thử lại</p>
                                    <p id="backButton">Quay về</p>
                                </div>`

                                setTimeout(() => menu.style.display = 'flex'

                                    , 100)
                                document.getElementById("menu").innerHTML = textMenu
                                gameOver = true
                                back()
                                restartGame()
                            }
                        }
                    }
                });
                break;
        }



    })



    // menu-----

    function restartGame() {

        const againButton = document.getElementById('againButton');
        againButton.addEventListener('click', () => {
            gameOver = false
            count = 0;
            dem = 0;
            document.getElementById("score").innerHTML = `Điểm: ${count}`
            textMenu = '';

            character.x = canvas.width / 2 - 40;
            character.y = canvas.height;
            character.dx = 0;
            character.jumping = false;
            character.jumpPower = 22;
            bricks.clearBricks();
            bricks.createBrick();

            menu.style.display = 'none';
        })

    }

    function back() {
        const backButton = document.getElementById('backButton');
        backButton.addEventListener('click', () => {
            location.reload()
            const menu = document.getElementById('menu');
            menu.style.display = 'none';
            const pickCharacter = document.getElementById('pickCharacter');
            canvas.style.display = 'none';
            pickCharacter.style.display = 'flex';
        });
    }

    function showtext(text) {
        document.getElementById("bool").innerHTML = text
        setTimeout(() => document.getElementById("bool").innerHTML = "", 800)
    }




    player.src = document.querySelector(".pick").src
    gameLoop()
    canvas.style.display = "block"
    document.getElementById("pickCharacter").style.display = "none"
    document.getElementById("display").style.display = "block"
    document.getElementById("guide").style.display = "block"
    document.getElementById("opacity").style.display = "none"
    document.getElementById("subject").style.display = "none"
})

document.querySelector(".chonmonhoc").addEventListener("click", event => {
    document.getElementById("opacity").style.display = "flex"
    document.getElementById("subject").style.display = "flex"
})

document.getElementById("guide").addEventListener("click", event => {
    document.getElementById("guidee").style.display = "flex"

})

document.getElementById("close").addEventListener("click", event => {
    document.getElementById("guidee").style.display = "none"

})

