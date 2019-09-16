# piano-keys
A Web component for creating piano keys depicting HTML elements.

Live demo available at http://51.38.51.120/pianokeysdemo/

![Screenshot](keys.png)

## Features
Piano-keys is a stand-alone Vanilla JS web component that does not use shadow DOM.

Following attributes are configurable:

- element height in pixels
- octave width
- number of octaves
- stroke width
- black key height and width
- marked keys
- mark color, shape, diameter and shift

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import custom element:

    ```html
    <script defer src='piano-keys.js'></script>
    ```

3. Start using it!

    ```html
    <piano-keys />
    ```

## License
Copyright (c) 2019 Jussi Utunen

Licensed under the MIT License
