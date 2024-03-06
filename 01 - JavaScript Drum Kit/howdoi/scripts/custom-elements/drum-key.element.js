export class DrumKeyElement extends HTMLElement {
  #audio;
  constructor() {
    super();
  }

  connectedCallback() {

    // adding 'key' class to custom element
    this.classList.add("key");

    const keyCode = this.dataset.keyCode;
    const key = this.dataset.key;
    const text = this.dataset.text;
    const sourcePath = this.dataset.srcPath;

    // Checking for null or empty value
    if (!key || !keyCode || !text || !sourcePath)
      throw new Error("Missing one or many attribute");

    // creating kbd element
    const kbdEl = document.createElement("kbd");
    kbdEl.innerText = key;

    // creating span element
    const spanEL = document.createElement("span");
    spanEL.classList.add("sound");
    spanEL.innerText = text;

    // creating audio element and storing ref to this element
    this.#audio = document.createElement("audio");
    this.#audio.src = sourcePath;

    // append all the created element to this element
    this.append(kbdEl, spanEL, this.#audio);

    // added event listerner
    this.addEventListener("transitionend", this.removeTransition);
    this.addEventListener("touchstart", this.play);
    this.addEventListener("click", this.play);
  }

  play() {
    this.classList.add("playing");
    this.#audio.currentTime = 0;
    this.#audio.play();
  }

  removeTransition(e) {
    if (e.propertyName !== "transform") return;
    e.target.classList.remove("playing");
  }
}
