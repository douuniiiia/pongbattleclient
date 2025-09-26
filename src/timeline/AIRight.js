
import { gsap } from "gsap";

export class RightScreen {
    constructor(parameters) {
        console.log("Right")
        this.init();
    }

    init() {
        let tl = gsap.timeline({ paused: false });
        tl.to("#paragraphe", { duration: 5, x: 786 });
    }
}