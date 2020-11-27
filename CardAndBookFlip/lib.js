"use strict"

const defaultCardWidth = "280px";
const defaultCardHeight = "350px";
const defaultCardTransitionLength = "1s";
const defaultBgColor = "lightgrey";

const defaultBookWidth = "250px";
const defaultBookHeight = "340px";
const defaultBookTransitionLength = "0.5s";

// === Shelf Container ===
function mainContainer(){
    const allContainer = document.querySelectorAll(".mainContainer");

    allContainer.forEach(container =>{
        container.style.width = "100%";
        container.style.display = "flex";
        container.style.justifyContent= "space-around";
        container.style.alignItems= "center";
        container.style.flexWrap= "wrap";
        container.style.marginBottom= "40px";
    })
    // container.style.min-height: 80vh;

}

// === CARDS ===
function flipCardHover(options)
{
    const allCards = document.querySelectorAll(".hoverCard");

    cards(allCards, options);

    allCards.forEach(card => {
        onHover(card);
    });
}

function flipCardClick(options)
{
    const allCards = document.querySelectorAll(".clickCard");

    cards(allCards, options);

    let cardWidth = defaultCardWidth;
    let cardHeight = defaultCardHeight;

    if (options.width > 0){
        console.log("setWidth");
        cardWidth = options.width.toString() +"px"
    }
    if (options.height > 0){
        console.log("setHeight");
        cardHeight = options.height.toString() +"px"
    }

    allCards.forEach(card => {

        let checkBox = document.createElement("INPUT");
        checkBox.setAttribute("type", "checkbox");
        checkBox.style.opacity = 0;
        checkBox.style.width = cardWidth;
        checkBox.style.height = cardHeight;
        card.style.position = "relative";
        checkBox.style.position = "absolute";
        checkBox.style.top = "0px";
        checkBox.style.left = "0px";

        console.log(checkBox);

        card.appendChild(checkBox);

        console.log(card);


        card.addEventListener("change", () => {
            onClickFlip(card)
        });
    });
}

// === BOOKS ===
function bookAnimation(options)
{
    const allBookContainer = document.querySelectorAll(".bookContainer");
    const allBooks = document.querySelectorAll(".book");
    // console.log(allBooks);
    books(allBookContainer, allBooks, options);
}


// === HELPER FUNCTIONS ===
function books(bookContainer, books, options){
    const allBookContainer = bookContainer;
    const allBooks = books;
    // const allCover = document.querySelectorAll(".cover");;
    

    let bookWidth = defaultBookWidth;
    let bookHeight = defaultBookHeight;
    let bookTransitionLength = defaultBookTransitionLength;
    
    if (options.width > 0){
        console.log("setWidth");
        bookWidth = options.width.toString() +"px"
    }
    if (options.height > 0){
        console.log("setHeight");
        bookHeight = options.height.toString() +"px"
    }
    if (options.transitionLength > 0){
        console.log("setHeight");
        bookTransitionLength = options.transitionLength.toString() +"s"
    }

    allBookContainer.forEach(container =>{
        container.style.transformStyle = "preserve-3d";
        container.style.perspective = "1000px";
        // container.style.width = bookWidth;
        // container.style.height = bookHeight;
        // container.style.display = "inline-block";
    });

    allBooks.forEach(book =>{
        book.style.position = "relative";
        book.style.width = bookWidth;
        book.style.height = bookHeight;
        book.style.boxShadow = "20px 20px 20px rgba(0, 0, 0, 0.2)";
        book.style.transformStyle = "preserve-3d"
        book.style.transition = bookTransitionLength;

        const img = book.childNodes[1];

        img.style.position = "absolute";
        img.style.top = "0";
        img.style.left = "0";
        img.style.width = "100%";
        img.style.height = "100%";

        let sideBookLeft = document.createElement("div");
        sideBookLeft.style.position = "absolute";
        sideBookLeft.style.width = "60px";
        sideBookLeft.style.height = "100%";
        sideBookLeft.style.transformOrigin = "left";
        sideBookLeft.style.backgroundColor = "black";
        sideBookLeft.style.transform = "rotateY(90deg)";

        book.insertBefore(sideBookLeft, book.firstChild);

        book.addEventListener("mouseover", ()=> {
            book.style.transform = "rotateY(30deg)";
            book.style.boxShadow = "0px 20px 20px rgba(0, 0, 0, 0.2)";
        });
        book.addEventListener("mouseout", ()=> {
            book.style.transform = "rotateY(0deg)";
            book.style.boxShadow = "20px 20px 20px rgba(0, 0, 0, 0.2)";
        });
    })
}

function cards(cards, options)
{
    const allCards = cards;
    const allFrontCards = document.querySelectorAll(".frontCard");
    const allBackCards = document.querySelectorAll(".backCard");

    let cardWidth = defaultCardWidth;
    let cardHeight = defaultCardHeight;
    let cardTransitionLength = defaultCardTransitionLength;

    if (options.width > 0){
        console.log("setWidth");
        cardWidth = options.width.toString() +"px"
    }
    if (options.height > 0){
        console.log("setHeight");
        cardHeight = options.height.toString() +"px"
    }
    if (options.transitionLength > 0){
        console.log("setHeight");
        cardTransitionLength = options.transitionLength.toString() +"s"
    }

    allCards.forEach(card => {
        card.style.width = cardWidth;
        card.style.height = cardHeight;
        card.style.transformStyle = "preserve-3d";
        card.style.transition = "all "+ cardTransitionLength +" ease";
        card.style.boxShadow = "20px 20px 20px rgba(0, 0, 0, 0.2)";
        card.style.borderRadius = "20px";

    });

    allFrontCards.forEach(frontCard => {
        frontCard.style.position = "absolute";
        frontCard.style.width = "100%";
        frontCard.style.height = "100%";
        frontCard.style.backfaceVisibility = "hidden";
        frontCard.style.borderRadius = "20px";
        frontCard.style.backgroundColor = defaultBgColor;
    });

    allBackCards.forEach(backCard => {
        backCard.style.transformStyle = "absolute";
        backCard.style.width = "100%";
        backCard.style.height = "100%";
        backCard.style.backfaceVisibility = "hidden";
        backCard.style.transform = "rotateY(180deg)";
        backCard.style.borderRadius = "20px";
        backCard.style.backgroundColor = defaultBgColor;

    });
}

function onHover(card)
{   
    card.addEventListener("mouseover", () => {
        card.style.transform = "rotateY(180deg)";
    });
    card.addEventListener("mouseout", () => {
        card.style.transform = "rotateY(0deg)";
    });
}

function onClickFlip(card){

    const checkbox = card.lastChild;
    console.log(checkbox);

    if(checkbox.checked == true){
        card.style.transform = "rotateY(180deg)";
        card.style.boxShadow = "-20px 20px 20px rgba(0, 0, 0, 0.2)";
    } else {
        card.style.transform = "rotateY(0deg)";
        card.style.boxShadow = "20px 20px 20px rgba(0, 0, 0, 0.2)";
    }
}

export {mainContainer, flipCardHover, flipCardClick, bookAnimation };