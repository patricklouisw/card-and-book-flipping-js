import { 
    mainContainer, 
    flipCardHover, 
    flipCardClick, 
    bookAnimation,
    bookFlip
} from './CardAndBookFlipping/Flipping.js';

mainContainer({});

flipCardHover({
    width: 350,
    height: 200,
    transitionLength: 1
});

flipCardClick({
    width: 350,
    height: 200,
    transitionLength: 1
});

bookFlip({
    width: 200,
    height: 275,
    transitionLength: 0.75
});

bookAnimation({
    width: 200,
    height: 275,
    transitionLength: 1
})
