terser custom-piano-keys.js -c -m --mangle-props reserved=[constructor,observedAttributes,disconnectedCallback,attributeChangedCallback,Pianokeys,connectedCallback] -o custom-piano-keys.min.js
terser custom-piano-keys-node.js -c -m --mangle-props reserved=[constructor,observedAttributes,disconnectedCallback,attributeChangedCallback,Pianokeys,connectedCallback] -o custom-piano-keys-node.min.js
