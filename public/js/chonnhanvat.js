const imgCharacter = [
    {
        character: "mario.png",
        avt: "Amario.jpg",
    },
    {
        character: "spiderman.png",
        avt: "Aspiderman.jpg",
    },
    {
        character: "songoku.png",
        avt: "Asongoku.jpg",
    },
    {
        character: "astronaut.png",
        avt: "Aastronaut.jpg",
    },

]

let kq =""
for(let i = 0; i < imgCharacter.length; i++){
    let html = `
    <img class="character ${i == 0? "pick" : ""}" src="../image/character/${imgCharacter[i].character}" alt="" onclick="dichuyen(this)">
    `
    kq += html
}
console.log(kq)
document.querySelector(".characters").innerHTML = kq


function dichuyen(x) {
    var characters = document.querySelectorAll(".character");
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].classList.contains('pick')) {
            characters[i].classList.remove('pick');
        }
    }

    const index = Array.from(characters).indexOf(x);
    console.log(index)
    x.classList.add('pick');
    document.querySelector(".showCharacter img").style.backgroundImage = `url(../image/background/${imgCharacter[index].avt})`
    var loadCharacter
    return loadCharacter = `${imgCharacter[index].character}`
}



