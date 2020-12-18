"use strict"

const log = console.log;
let _modalIndex = 1;

const defaultCardWidth = "250px";
const defaultCardHeight = "320px";
const defaultCardTransitionLength = "1s";
const defaultBgColor = "lightgrey";

const defaultBookWidth = "250px";
const defaultBookHeight = "320px";
const defaultBookTransitionLength = "0.5s";

let hoverOptions;
let clickOptions;
let bookHoverOptions;

// === Shelf Container ===
function mainContainer() {
    const allContainer = document.querySelectorAll(".mainContainer");

    allContainer.forEach(container => {
        // Styling
        container.style.width = "100%";
        container.style.display = "flex";
        container.style.justifyContent= "space-around";
        container.style.alignItems= "center";
        container.style.flexWrap= "wrap";
        container.style.marginBottom= "40px";

        // Add Card or Not
        const classesInContainer = container.className.split(" ");
        const editCards = classesInContainer.findIndex(c => c === "allowEditCards");
        const createBook = classesInContainer.findIndex(c => c === "createBook");

        if (editCards > 0) {

            const index = _modalIndex;
            _modalIndex++;

            // Button
            let button = document.createElement("button");
            button.setAttribute("id","buttonModal-"+index);
            button.textContent = "Add or Remove Cards";

            button.style.display = "block";
            button.style.width = "85%";
            button.style.padding = "10px";
            button.style.marginTop = "10px";
            button.style.marginBottom = "25px";
            button.style.borderRadius = "10px";
            button.style.backgroundColor = "black";
            button.style.color = "white";
            button.style.cursor = "pointer";
            button.addEventListener("click", () => addCardModal(container));
            
            container.insertBefore(button, container.firstChild);
        }
        
    });
}

// === HELPER: MODAL ===
function addCardModal(mainContainer){

    let line = document.createElement("hr");
    line.style.marginTop = 0;

    let line2 = document.createElement("hr");
    line2.style.marginTop = 0;

    let allCardsInContainer = mainContainer.querySelectorAll(".card");

    // MODAL HEADER
    let modalHeader = document.createElement("div");
    modalHeader.className = "modalHeader";

    let closeModal = document.createElement("span");
    closeModal.className = "closeModal";
    closeModal.innerHTML = "&times";
    let title = document.createElement("h4");
    title.innerText = "Add or Remove Cards";
    title.style.display = "inline-block";
    title.style.marginTop = "10px";

    modalHeader.appendChild(title);
    modalHeader.appendChild(closeModal);

    // STYLE: MODAL HEADER
    modalHeader.style.padding = "10px 16px";
    modalHeader.style.backgroundColor = "black";
    modalHeader.style.color = "white";
    modalHeader.style.display = "flex";
    modalHeader.style.justifyContent = "space-between";

    closeModal.style.color = "white";
    closeModal.style.float = "right";
    closeModal.style.fontSize = "30px";
    closeModal.style.fontWeight = "bold";

    closeModal.onmouseover = () =>{
        closeModal.style.color = "red";
        closeModal.style.textDecoration = "none";
        closeModal.style.cursor = "pointer";
    }

    closeModal.onmouseleave = () =>{
        closeModal.style.color = "white";
        closeModal.style.float = "right";
        closeModal.style.fontSize = "30px";
        closeModal.style.fontWeight = "bold";
    }

    // MODAL BODY
    let modalBody = document.createElement("div");
    modalBody.className = "modalBody";

    // CREATE TITLE
    let createHeader = document.createElement("h5");
    createHeader.innerText = "Create New Card";
    modalBody.appendChild(createHeader);
    modalBody.appendChild(line);

    // CREATE BODY
    // let form = document.createElement("form");

    let frontCard = document.createElement("textarea");
    frontCard.placeholder="FRONT CARD: Add your HTML";
    frontCard.style.width="100%";
    frontCard.style.padding="5px";
    frontCard.setAttribute("id", "newModalFront");

    let backCard = document.createElement("textarea");
    backCard.placeholder="BACK CARD: Add your HTML";
    backCard.style.width="100%";
    backCard.style.padding="5px";
    backCard.setAttribute("id", "newModalBack");

    let clickRadio = document.createElement("input");
    log("clickRadio: ", clickRadio);
    clickRadio.type = "radio";
    clickRadio.id = "onClick";
    clickRadio.name = "flipOption";
    clickRadio.value = "clickCard";
    clickRadio.checked = true;
    let clickLabel = document.createElement("label");
    clickLabel.setAttribute("for", "onClick");
    clickLabel.innerText = "Click";

    let hoverRadio = document.createElement("input");
    hoverRadio.type = "radio";
    hoverRadio.id = "onHover";
    hoverRadio.name = "flipOption";
    hoverRadio.value = "hoverCard";
    let hoverLabel = document.createElement("label");
    // log(hoverLabel);
    hoverLabel.setAttribute("for", "onClick");
    hoverLabel.innerText = "Hover";

    let submit = document.createElement("button");
    submit.innerText = "Create Card";

    submit.addEventListener("click", () => {
        const flipOption = document.querySelector('input[name="flipOption"]:checked').value;
        const frontHTML = document.querySelector('#newModalFront').value;
        const backHTML = document.querySelector('#newModalBack').value;
        
        let newCard = document.createElement("div");
        log("newCard: ", newCard);
        newCard.classList.add("card");
        newCard.classList.add(flipOption);

        let frontCard = document.createElement("div");
        frontCard.innerHTML = frontHTML;
        frontCard.classList.add("frontCard");
        frontCard.classList.add("front")

        let backCard = document.createElement("div");
        backCard.innerHTML = backHTML;
        backCard.classList.add("backCard");
        backCard.classList.add("back");

        newCard.appendChild(frontCard);
        newCard.appendChild(backCard);
        mainContainer.appendChild(newCard);

        let chosenOption;
        if(flipOption === "clickCard"){
            chosenOption = {}
            if(clickOptions){
                chosenOption = clickOptions;
            }
            flipCardClick(chosenOption);
        } else{
            chosenOption = {}
            if(hoverOptions){
                chosenOption = hoverOptions;
            }
            flipCardHover(chosenOption);
        }

        modal.remove();
        return ;
    });

    submit.style.display = "block";
    submit.style.padding = "8px";
    submit.style.marginBottom = "10px";
    submit.style.borderRadius = "10px";
    submit.style.backgroundColor = "darkblue";
    submit.style.color = "white";
    submit.style.cursor = "pointer";
    submit.style.fontSize = "15px";
    
    let cardType = document.createElement("h6");
    cardType.innerText = "Flip Type";

    modalBody.appendChild(frontCard);
    modalBody.appendChild(backCard);
    modalBody.appendChild(cardType);
    modalBody.appendChild(clickRadio);
    modalBody.appendChild(clickLabel);
    modalBody.appendChild(document.createElement("br"));
    modalBody.appendChild(hoverRadio);
    modalBody.appendChild(hoverLabel);
    modalBody.appendChild(document.createElement("br"));
    modalBody.appendChild(submit);

    // modalBody.appendChild(form);

    // STYLE: MODAL BODY
    modalBody.style.padding = "2px 16px";

    // REMOVE TITLE
    let removeHeader = document.createElement("h5");
    removeHeader.innerText = "Remove Card";
    modalBody.appendChild(removeHeader);
    modalBody.appendChild(line2);
    let removeInstruction = "Toggle button to decide which card you want to delete";
    let removeInstruction2 = "Once decided, click on 'Remove Cards' to remove it";
    modalBody.append(removeInstruction);
    modalBody.appendChild(document.createElement("br"));
    modalBody.append(removeInstruction2);

    // REMOVE BODY
    let removeBody = document.createElement("div");
    
    let cards = [];

    let deletedCard = [];

    for(let i = 0; i < allCardsInContainer.length; i++){
        let card = document.createElement("button");
        card.innerText = "Card "+ i;
        card.style.margin = "10px";
        card.style.padding = "10px";
        card.style.borderWidth = "1px";
        card.style.borderColor = "black";
        card.style.borderRadius = "5px";
        card.style.backgroundColor = "white";
        
        cards.push(card);

        cards[i].onclick = () => {
            log(cards[i].style.backgroundColor);
            cards[i].style.margin = "10px";
            if(cards[i].style.backgroundColor !== "salmon"){
                cards[i].style.backgroundColor = "salmon";
                cards[i].style.color = "white";
                cards[i].style.borderColor = "white";
                deletedCard.push(cards[i]);
            } else{
                cards[i].style.backgroundColor = "white";
                cards[i].style.color = "black";
                cards[i].style.borderColor = "black";
                deletedCard.splice(deletedCard.indexOf(cards[i]), 1);
            }
        }

        removeBody.appendChild(cards[i]);
    }
    modalBody.appendChild(removeBody);

    // STYLE: REMOVE BODY
    removeBody.style.width = "90%";
    removeBody.style.display = "flex";
    removeBody.style.justifyContent= "flex-start";
    removeBody.style.alignItems= "center";
    removeBody.style.flexWrap= "wrap";
    removeBody.style.marginBottom= "10px";

    // Remove button
    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove Card";
    removeButton.style.backgroundColor = "salmon";
    removeButton.style.color = "white";
    removeButton.style.padding = "8px";
    removeButton.style.borderRadius = "10px";
    removeButton.style.marginBottom = "10px";
    removeButton.style.cursor = "pointer";
    removeButton.style.fontSize = "15px";

    removeButton.onclick = () => {
        deletedCard.forEach((card)=>{
            const cardIndex = cards.indexOf(card);
            const deleteCardIndex = deletedCard.indexOf(card);
            
            if(cardIndex !== -1){
                cards[cardIndex].remove();
                allCardsInContainer[cardIndex].remove();

            }
            if(deleteCardIndex !== -1){
                deletedCard[deleteCardIndex].remove();
            }
        })
        modal.style.display = "none";
    }
    modalBody.appendChild(removeButton);
    
    // MODAL CONTAINER
    let modalContainer = document.createElement("div");
    modalContainer.className = "modalContainer";
    modalContainer.appendChild(modalHeader);
    modalContainer.appendChild(modalBody);

    // STYLE: MODAL CONTAINER
    modalContainer.style.position = "relative";
    modalContainer.style.backgroundColor = "white";
    modalContainer.style.margin = "auto";
    modalContainer.style.padding = 0;
    modalContainer.style.borderWidth = "1px";
    modalContainer.style.borderColor = "black";
    modalContainer.style.width = "80%";
    modalContainer.style.boxShadow = "10px 10px 20px rgba(0, 0, 0, 0.2)";

    // MODAL
    let modal = document.createElement("div");
    modal.appendChild(modalContainer);

    // STYLE: MODAL
    modal.style.position = "fixed";
    modal.style.zIndex = 1;
    modal.style.paddingTop = "50px";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";

    // log(modal);
    // log(mainContainer);

    // Javascript
    closeModal.onclick = () =>{
        modal.remove();
    }

    window.onclick = (e) =>{
        if(e.target === modal){
            modal.remove();
        }
    }

    // ADD TO MAIN CONTAINER
    mainContainer.insertBefore(modal, mainContainer.firstChild);

}


// === CARDS ===
function flipCardHover(options)
{
    hoverOptions = options;

    const allCards = document.querySelectorAll(".hoverCard");

    cards(allCards, options);

    allCards.forEach(card => {
        onHover(card);
    });
}

function flipCardClick(options)
{

    clickOptions = options;

    const allCards = document.querySelectorAll(".clickCard");

    cards(allCards, options);

    let cardWidth = defaultCardWidth;
    let cardHeight = defaultCardHeight;

    if (options.width > 0){
        // log("setWidth");
        cardWidth = options.width.toString() +"px"
    }
    if (options.height > 0){
        // log("setHeight");
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

        // log(checkBox);

        card.appendChild(checkBox);

        // log(card);


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
    // log(allBooks);
    books(allBookContainer, allBooks, options);
}

function bookFlip(options)
{
    bookHoverOptions = options;

    const allBookFlip = document.querySelectorAll(".bookFlip");
    log(allBookFlip)

    let bookWidth = defaultBookWidth;
    let bookHeight = defaultBookHeight;
    let bookTransitionLength = defaultBookTransitionLength;

    if (options.width > 0){
        bookWidth = options.width.toString() +"px"
    }
    if (options.height > 0){
        bookHeight = options.height.toString() +"px"
    }
    if (options.transitionLength > 0){
        bookTransitionLength = options.transitionLength.toString() +"s"
    }

    allBookFlip.forEach(book => {

        book.style.width = bookWidth;
        book.style.height = bookHeight;
        book.style.position = "relative";

        const flipCover = book.querySelector(".flip");
        const front = flipCover.querySelector(".frontCover");
        const back = flipCover.querySelector(".backCover");
        const contentCover = book.querySelector(".contentCover");

        flipCover.style.width = bookWidth;
        flipCover.style.height = bookHeight;
        flipCover.style.transformStyle = "preserve-3d";
        flipCover.style.transformOrigin = "left";
        flipCover.style.transform = "rotateY(0deg)";
        flipCover.style.perspective = "1500px";
        flipCover.style.transition = "all "+ bookTransitionLength +" ease";
        flipCover.style.marginBottom = "30px";
        flipCover.style.zIndex = 0;

        front.style.position = "absolute";
        front.style.width = "100%";
        front.style.height = "100%";
        front.style.backfaceVisibility = "hidden";
        front.style.backgroundColor = defaultBgColor;

        back.style.transformStyle = "absolute";
        back.style.width = "100%";
        back.style.height = "100%";
        back.style.backfaceVisibility = "hidden";
        back.style.transform = "rotateY(180deg)";
        back.style.backgroundColor = "white";
        back.style.padding = "15px";
        back.style.border = "2px solid black";

        contentCover.style.position = "absolute";
        contentCover.style.top = 0;
        contentCover.style.left = 0;
        contentCover.style.width = "100%";
        contentCover.style.height = "100%";
        contentCover.style.backgroundColor = "white";
        contentCover.style.zIndex = -1;
        contentCover.style.padding = "15px";
        contentCover.style.border = "2px solid black";

        

        book.addEventListener("mouseover", () => {
            flipCover.style.transform = "rotateY(160deg)";
            });
        book.addEventListener("mouseout", () => {
            flipCover.style.transform = "rotateY(0deg)";
            });

    });

}

// === HELPER FUNCTIONS ===
function books(bookContainer, books, options){
    const allBookContainer = bookContainer;
    const allBooks = books;

    let bookWidth = defaultBookWidth;
    let bookHeight = defaultBookHeight;
    let bookTransitionLength = defaultBookTransitionLength;
    
    if (options.width > 0){
        bookWidth = options.width.toString() +"px"
    }
    if (options.height > 0){
        bookHeight = options.height.toString() +"px"
    }
    if (options.transitionLength > 0){
        bookTransitionLength = options.transitionLength.toString() +"s"
    }

    allBookContainer.forEach(container =>{
        container.style.transformStyle = "preserve-3d";
        container.style.perspective = "1000px";
        container.style.marginBottom = "30px";
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
        // log("setWidth");
        cardWidth = options.width.toString() +"px"
    }
    if (options.height > 0){
        // log("setHeight");
        cardHeight = options.height.toString() +"px"
    }
    if (options.transitionLength > 0){
        // log("setHeight");
        cardTransitionLength = options.transitionLength.toString() +"s"
    }

    allCards.forEach(card => {
        card.style.width = cardWidth;
        card.style.height = cardHeight;
        card.style.transformStyle = "preserve-3d";
        card.style.transition = "all "+ cardTransitionLength +" ease";
        card.style.boxShadow = "20px 20px 20px rgba(0, 0, 0, 0.2)";
        card.style.borderRadius = "20px";
        card.style.marginBottom = "30px"
    });

    allFrontCards.forEach(frontCard => {
        frontCard.style.position = "absolute";
        frontCard.style.width = "100%";
        frontCard.style.height = "100%";
        frontCard.style.backfaceVisibility = "hidden";
        frontCard.style.borderRadius = "20px";
        frontCard.style.backgroundColor = defaultBgColor;
        frontCard.style.padding = "15px";
    });

    allBackCards.forEach(backCard => {
        backCard.style.transformStyle = "absolute";
        backCard.style.width = "100%";
        backCard.style.height = "100%";
        backCard.style.backfaceVisibility = "hidden";
        backCard.style.transform = "rotateY(180deg)";
        backCard.style.borderRadius = "20px";
        backCard.style.backgroundColor = defaultBgColor;
        backCard.style.padding = "15px";

    });
}

function onHover(card)
{   
    card.addEventListener("mouseover", () => {
        card.style.transform = "rotateY(180deg)";
        card.style.boxShadow = "-20px 20px 20px rgba(0, 0, 0, 0.2)";
    });
    card.addEventListener("mouseout", () => {
        card.style.transform = "rotateY(0deg)";
        card.style.boxShadow = "20px 20px 20px rgba(0, 0, 0, 0.2)";
    });
}

function onClickFlip(card){

    const checkbox = card.lastChild;
    // log(checkbox);

    if(checkbox.checked == true){
        card.style.transform = "rotateY(180deg)";
        card.style.boxShadow = "-20px 20px 20px rgba(0, 0, 0, 0.2)";
    } else {
        card.style.transform = "rotateY(0deg)";
        card.style.boxShadow = "20px 20px 20px rgba(0, 0, 0, 0.2)";
    }
}

export {mainContainer, flipCardHover, flipCardClick, bookAnimation, bookFlip };