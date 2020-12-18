# FlippingJS (js-library-louispat)

To view my sample application, https://immense-fjord-27450.herokuapp.com/

## Explanation of Library

All the code for the library is in lib.js

We focus on 5 functionality for this release:

1. Card Flip: onClick
2. Card Flip: onHover
3. Adding and Removing Flipping Cards
4. Book Animation: 3D Animation
5. Book Flip: Flip a page

# Documentation

## Getting Started

## Javascript

After downloading the module into your project, you can import the library into your script.

            import {
                mainContainer, flipCardHover, flipCardClick, bookAnimation, bookFlip
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
            });

## Methods

### mainContainer({})

- Description: function to set up the container for cards or books

#### flipCardHover(options)

- Description: function to configure hover card flipping

#### flipCardClick(options)

- Description: function to configure click card flipping

#### bookFlip(options)

- Description: function to configure hover book flipping

#### bookAnimation(options)

- Description: function to configure hover for book animation

## Options

1.  Width: integer

    Default: 250px

    Description: Width of the Card or Book

2.  Height: integer

    Default: 320px

    Description: Width of the Card or Book

3.  Transition: integer

    Default: 1s

    Description: Width of the Card or Book

## HTML Usage

Main Container

```
<div class="mainContainer">
    [Insert Card/Book code]
</div>
```

Card Flip: onClick

```
<div class="card clickCard">
    <div class="frontCard">
    ...
    </div>
    <div class="backCard">
    ...
    </div>
</div>
```

Card Flip: onHover

```
<div class="card hoverCard">
    <div class="frontCard">
    ...
    </div>
    <div class="backCard">
    ...
    </div>
</div>
```

Adding and Removing Flipping Cards

```
<div class="mainContainer allowEditCards"></div>
```

Book Flip: Flip a page

```
<div class="bookFlip">
    <div class="flip">
        <div class="frontCover">
        ...
        </div>
        <div class="backCover">
            ...
        </div>
    </div>

    <div class="contentCover">
        ...
    </div>
</div>
```
