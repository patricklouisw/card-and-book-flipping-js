import { 
    mainContainer, 
    flipCardHover, 
    flipCardClick, 
    bookAnimation,
    bookFlip
} from './CardAndBookFlipping/Flipping.js';

mainContainer({});

flipCardHover({
    width: 250,
    height: 320,
    transitionLength: 1
});

flipCardClick({
    width: 250,
    height: 320,
    transitionLength: 1
});

bookFlip({
    width: 250,
    height: 320,
    transitionLength: 0.75
});

bookAnimation({
    width: 250,
    height: 320,
    transitionLength: 1
})
