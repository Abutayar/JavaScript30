import { drumSounds } from "./config.js";
import { DrumKeyElement } from "./custom-elements/drum-key.element.js";

// Root Element
const ROOL_EL = document.getElementById("keys");

// Registry custom element
customElements.define("drum-key", DrumKeyElement);

class App {
  constructor() {
    drumSounds.forEach((item) => {
      const DRUM_KEY_EL = this.createDrumKeyElement(
        item.keyCode,
        item.key,
        item.text,
        item.audioSrc
      );
      ROOL_EL.append(DRUM_KEY_EL);
    });
  }

  createDrumKeyElement(keyCode, key, text, audioPath) {
    const DRUM_KEY_EL = document.createElement("drum-key");
    DRUM_KEY_EL.setAttribute("data-key-code", keyCode);
    DRUM_KEY_EL.setAttribute("data-key", key);
    DRUM_KEY_EL.setAttribute("data-text", text);
    DRUM_KEY_EL.setAttribute("data-src-path", audioPath);
    return DRUM_KEY_EL;
  }
}


function playSound(e) {
    const SELECTOR = `drum-key[data-key-code="${e.keyCode}"]`;
    const DRUM_KEY_EL = document.querySelector(SELECTOR);
    if (!DRUM_KEY_EL) return;
    DRUM_KEY_EL.play();
}

window.addEventListener("keydown", playSound);

// Invoking app
new App();
